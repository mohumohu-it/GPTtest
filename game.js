const cards = {
  strike: { id: 'strike', name: 'Strike', cost: 1, text: '敵に6ダメージ', play: (g) => hitEnemy(g, 6) },
  defend: { id: 'defend', name: 'Defend', cost: 1, text: '自分に5ブロック', play: (g) => gainBlock(g.player, 5) },
  bash: { id: 'bash', name: 'Bash', cost: 2, text: '8ダメージ + 弱体(次ターン被ダメ+2)', play: (g) => hitEnemy(g, 8, 2) },
  quick: { id: 'quick', name: 'Quick Jab', cost: 0, text: '4ダメージ', play: (g) => hitEnemy(g, 4) },
  ironwall: { id: 'ironwall', name: 'Iron Wall', cost: 1, text: '8ブロック', play: (g) => gainBlock(g.player, 8) },
  rage: { id: 'rage', name: 'Rage', cost: 1, text: '5ダメージ + 3ブロック', play: (g) => { hitEnemy(g, 5); gainBlock(g.player, 3); } },
};

const enemyPool = [
  { name: 'Louse', hp: 28, attack: [6, 7] },
  { name: 'Cultist', hp: 38, attack: [8, 10] },
  { name: 'Jaw Worm', hp: 42, attack: [9, 11] },
  { name: 'Sentry', hp: 45, attack: [10, 12] },
];

const rewards = ['quick', 'ironwall', 'rage', 'bash'];

const state = {
  floor: 1,
  maxFloor: 10,
  gold: 99,
  mode: 'map',
  message: '塔に挑む。',
  player: {
    maxHp: 70,
    hp: 70,
    block: 0,
    weakVuln: 0,
    energy: 3,
    deck: ['strike', 'strike', 'strike', 'strike', 'strike', 'defend', 'defend', 'defend', 'defend', 'bash'],
    draw: [],
    hand: [],
    discard: [],
  },
  enemy: null,
  log: [],
};

const el = {
  hud: document.getElementById('hud'),
  state: document.getElementById('state'),
  actions: document.getElementById('actions'),
  log: document.getElementById('log'),
};

function addLog(text) {
  state.log.unshift(text);
  state.log = state.log.slice(0, 40);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function gainBlock(unit, value) {
  unit.block += value;
  addLog(`${unit === state.player ? 'あなた' : '敵'}は${value}ブロックを得た。`);
}

function damage(unit, amount) {
  const reduced = Math.max(0, amount - unit.block);
  unit.block = Math.max(0, unit.block - amount);
  unit.hp -= reduced;
  return reduced;
}

function hitEnemy(g, amount, vuln = 0) {
  if (!g.enemy) return;
  const bonus = g.enemy.vuln || 0;
  const dealt = damage(g.enemy, amount + bonus);
  if (vuln > 0) {
    g.enemy.vuln = (g.enemy.vuln || 0) + vuln;
  }
  addLog(`あなたの攻撃！ ${g.enemy.name}に${dealt}ダメージ。`);
}

function draw(n = 1) {
  for (let i = 0; i < n; i += 1) {
    if (state.player.draw.length === 0) {
      state.player.draw = shuffle(state.player.discard);
      state.player.discard = [];
    }
    const c = state.player.draw.shift();
    if (c) state.player.hand.push(c);
  }
}

function startCombat() {
  const seed = enemyPool[Math.floor(Math.random() * enemyPool.length)];
  state.enemy = { ...seed, block: 0, vuln: 0 };
  state.mode = 'combat';
  state.player.block = 0;
  state.player.energy = 3;
  state.player.draw = shuffle(state.player.deck);
  state.player.hand = [];
  state.player.discard = [];
  draw(5);
  addLog(`--- 戦闘開始: ${state.enemy.name} ---`);
  render();
}

function endTurn() {
  state.player.hand.forEach((c) => state.player.discard.push(c));
  state.player.hand = [];
  state.player.block = 0;

  const enemyDmg = state.enemy.attack[Math.floor(Math.random() * state.enemy.attack.length)];
  const dealt = damage(state.player, enemyDmg);
  addLog(`${state.enemy.name}の攻撃！ あなたは${dealt}ダメージを受けた。`);

  if (state.player.hp <= 0) {
    state.mode = 'dead';
    render();
    return;
  }

  state.enemy.block = 0;
  state.enemy.vuln = Math.max(0, (state.enemy.vuln || 0) - 1);
  state.player.energy = 3;
  draw(5);
  render();
}

function playCard(index) {
  const cardId = state.player.hand[index];
  const card = cards[cardId];
  if (!card || card.cost > state.player.energy) return;

  state.player.energy -= card.cost;
  state.player.hand.splice(index, 1);
  state.player.discard.push(cardId);
  card.play(state);

  if (state.enemy.hp <= 0) {
    const gainGold = 15 + Math.floor(Math.random() * 16);
    state.gold += gainGold;
    state.mode = 'reward';
    state.rewardChoices = shuffle(rewards).slice(0, 3);
    addLog(`${state.enemy.name}を倒した！ ${gainGold}ゴールド獲得。`);
  }

  render();
}

function chooseMap(type) {
  if (type === 'fight') {
    startCombat();
  }
  if (type === 'rest') {
    const heal = 12;
    state.player.hp = Math.min(state.player.maxHp, state.player.hp + heal);
    addLog(`焚き火で休憩。HPを${heal}回復。`);
    advanceFloor();
  }
  if (type === 'shop') {
    if (state.gold >= 60) {
      const c = rewards[Math.floor(Math.random() * rewards.length)];
      state.player.deck.push(c);
      state.gold -= 60;
      addLog(`ショップで${cards[c].name}を購入！`);
    } else {
      addLog('ゴールド不足で何も買えなかった。');
    }
    advanceFloor();
  }
}

function takeReward(cardId) {
  state.player.deck.push(cardId);
  addLog(`${cards[cardId].name}をデッキに追加。`);
  advanceFloor();
}

function skipReward() {
  addLog('カード報酬をスキップした。');
  advanceFloor();
}

function advanceFloor() {
  state.floor += 1;
  if (state.floor > state.maxFloor) {
    state.mode = 'win';
    render();
    return;
  }
  state.mode = 'map';
  state.enemy = null;
  render();
}

function restart() {
  window.location.reload();
}

function renderHUD() {
  el.hud.innerHTML = `
    <div class="grid">
      <div class="stat">階層: ${state.floor} / ${state.maxFloor}</div>
      <div class="stat">HP: <span class="hp">${state.player.hp}/${state.player.maxHp}</span></div>
      <div class="stat">Gold: ${state.gold}</div>
      <div class="stat">Deck: ${state.player.deck.length}枚</div>
    </div>
  `;
}

function renderState() {
  if (state.mode === 'combat') {
    el.state.innerHTML = `
      <h2>戦闘中: ${state.enemy.name}</h2>
      <p>敵HP: <span class="hp">${state.enemy.hp}</span> / ブロック: <span class="block">${state.enemy.block}</span> / 脆弱: ${state.enemy.vuln || 0}</p>
      <p>あなたのエナジー: ${state.player.energy} / ブロック: <span class="block">${state.player.block}</span></p>
      <p class="small">手札からカードを使うか、ターン終了。</p>
    `;
    return;
  }

  if (state.mode === 'map') {
    el.state.innerHTML = `<h2>マップイベント</h2><p>次の行動を選んでください。</p>`;
    return;
  }

  if (state.mode === 'reward') {
    el.state.innerHTML = '<h2>戦利品</h2><p>カードを1枚選ぶかスキップ。</p>';
    return;
  }

  if (state.mode === 'win') {
    el.state.innerHTML = '<h2>踏破成功！</h2><p>あなたは塔を登り切った。</p>';
    return;
  }

  if (state.mode === 'dead') {
    el.state.innerHTML = '<h2>ゲームオーバー</h2><p>再挑戦しよう。</p>';
  }
}

function renderActions() {
  if (state.mode === 'combat') {
    const handButtons = state.player.hand
      .map((id, i) => {
        const c = cards[id];
        const disabled = c.cost > state.player.energy ? 'disabled' : '';
        return `<button class="card-button" ${disabled} data-play="${i}">${c.name} [${c.cost}]<br><span class="small">${c.text}</span></button>`;
      })
      .join('');

    el.actions.innerHTML = `<div class="row">${handButtons}</div><div class="row" style="margin-top:0.6rem;"><button id="endTurn">ターン終了</button></div>`;

    el.actions.querySelectorAll('[data-play]').forEach((btn) => {
      btn.addEventListener('click', () => playCard(Number(btn.dataset.play)));
    });
    document.getElementById('endTurn').addEventListener('click', endTurn);
    return;
  }

  if (state.mode === 'map') {
    el.actions.innerHTML = `
      <div class="row">
        <button id="fight">戦闘</button>
        <button id="rest">休憩</button>
        <button id="shop">ショップ</button>
      </div>
      <p class="small">ショップ: 60ゴールドでカード1枚購入。</p>
    `;
    document.getElementById('fight').addEventListener('click', () => chooseMap('fight'));
    document.getElementById('rest').addEventListener('click', () => chooseMap('rest'));
    document.getElementById('shop').addEventListener('click', () => chooseMap('shop'));
    return;
  }

  if (state.mode === 'reward') {
    const picks = state.rewardChoices.map((id) => `<button data-reward="${id}">${cards[id].name}<br><span class="small">${cards[id].text}</span></button>`).join('');
    el.actions.innerHTML = `<div class="row">${picks}</div><div class="row" style="margin-top:0.5rem;"><button id="skip">スキップ</button></div>`;
    el.actions.querySelectorAll('[data-reward]').forEach((btn) => btn.addEventListener('click', () => takeReward(btn.dataset.reward)));
    document.getElementById('skip').addEventListener('click', skipReward);
    return;
  }

  el.actions.innerHTML = '<button id="restart">最初からプレイ</button>';
  document.getElementById('restart').addEventListener('click', restart);
}

function renderLog() {
  el.log.innerHTML = state.log.map((item) => `<div class="log-entry">${item}</div>`).join('');
}

function render() {
  renderHUD();
  renderState();
  renderActions();
  renderLog();
}

addLog('ゲーム開始。まずはマップで行動を選ぼう。');
render();
