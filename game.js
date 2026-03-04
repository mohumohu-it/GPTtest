const STORAGE_KEY = 'mini_spire_save_v2';

const cardDefs = {
  strike: { name: 'ストライク', cost: 1, text: '敵に6ダメージ', type: 'attack', dmg: 6, upgradeTo: 'strike_p' },
  strike_p: { name: 'ストライク+', cost: 1, text: '敵に9ダメージ', type: 'attack', dmg: 9 },
  defend: { name: 'ディフェンド', cost: 1, text: '自分に5ブロック', type: 'skill', block: 5, upgradeTo: 'defend_p' },
  defend_p: { name: 'ディフェンド+', cost: 1, text: '自分に8ブロック', type: 'skill', block: 8 },
  bash: { name: 'バッシュ', cost: 2, text: '8ダメージ + 脆弱2', type: 'attack', dmg: 8, vuln: 2, upgradeTo: 'bash_p' },
  bash_p: { name: 'バッシュ+', cost: 2, text: '10ダメージ + 脆弱3', type: 'attack', dmg: 10, vuln: 3 },
  quick: { name: 'クイックジャブ', cost: 0, text: '敵に4ダメージ', type: 'attack', dmg: 4, upgradeTo: 'quick_p' },
  quick_p: { name: 'クイックジャブ+', cost: 0, text: '敵に6ダメージ', type: 'attack', dmg: 6 },
  ironwall: { name: '鉄壁', cost: 1, text: '自分に8ブロック', type: 'skill', block: 8, upgradeTo: 'ironwall_p' },
  ironwall_p: { name: '鉄壁+', cost: 1, text: '自分に11ブロック', type: 'skill', block: 11 },
  rage: { name: '激昂', cost: 1, text: '5ダメージ + 3ブロック', type: 'hybrid', dmg: 5, block: 3, upgradeTo: 'rage_p' },
  rage_p: { name: '激昂+', cost: 1, text: '7ダメージ + 5ブロック', type: 'hybrid', dmg: 7, block: 5 },
};

const enemyPool = [
  { name: 'シラミ', hp: 30, intents: [{ type: 'attack', value: 6 }, { type: 'attack', value: 8 }] },
  { name: 'カルト教団員', hp: 38, intents: [{ type: 'attack', value: 9 }, { type: 'buff', value: 2 }] },
  { name: 'ジョーウォーム', hp: 45, intents: [{ type: 'attack', value: 10 }, { type: 'attackBlock', value: 8, block: 6 }] },
  { name: '番兵', hp: 48, intents: [{ type: 'attack', value: 11 }, { type: 'block', block: 10 }] },
];

const relicPool = [
  { id: 'lantern', name: 'ランタン', text: '各戦闘の1ターン目エナジー+1', applyStartTurn: (g) => { if (g.turn === 1) g.player.energy += 1; } },
  { id: 'whetstone', name: '砥石', text: '攻撃カードのダメージ+1（永続）', onDealDamageBonus: 1 },
  { id: 'horn', name: '角笛', text: '各ターン開始時に2ブロック', applyStartTurn: (g) => gainBlock(g.player, 2) },
  { id: 'heart', name: '赤いハート', text: '最大HP+10、即時10回復', onGain: (g) => { g.player.maxHp += 10; g.player.hp = Math.min(g.player.maxHp, g.player.hp + 10); } },
];

const rewardCards = ['quick', 'ironwall', 'rage', 'bash', 'strike', 'defend'];

const defaultState = () => ({
  floor: 1,
  maxFloor: 10,
  gold: 120,
  mode: 'map',
  turn: 0,
  nextEncounter: null,
  rewardChoices: [],
  shopChoices: [],
  relicChoices: [],
  campChoices: [],
  postCombatOptions: [],
  player: {
    maxHp: 70,
    hp: 70,
    block: 0,
    energy: 3,
    strength: 0,
    deck: ['strike', 'strike', 'strike', 'strike', 'strike', 'defend', 'defend', 'defend', 'defend', 'bash'],
    draw: [],
    hand: [],
    discard: [],
    relics: [],
  },
  enemy: null,
  log: [],
});

let state = defaultState();

const el = {
  hud: document.getElementById('hud'),
  state: document.getElementById('state'),
  actions: document.getElementById('actions'),
  log: document.getElementById('log'),
};

function addLog(text) {
  state.log.unshift(text);
  state.log = state.log.slice(0, 80);
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

function relicDamageBonus() {
  return state.player.relics.reduce((sum, r) => sum + (r.onDealDamageBonus || 0), 0);
}

function calcPlayerDamage(base) {
  return Math.max(0, base + state.player.strength + relicDamageBonus());
}

function calcEnemyAttack(base) {
  if (!state.enemy) return base;
  return Math.max(0, base + state.enemy.strength);
}

function playCard(index) {
  const cardId = state.player.hand[index];
  const card = cardDefs[cardId];
  if (!card || card.cost > state.player.energy || !state.enemy) return;

  state.player.energy -= card.cost;
  state.player.hand.splice(index, 1);
  state.player.discard.push(cardId);

  if (card.dmg) {
    const dmgAmount = calcPlayerDamage(card.dmg);
    const dealt = damage(state.enemy, dmgAmount);
    addLog(`あなたの${card.name}！ ${state.enemy.name}に${dealt}ダメージ。`);
  }
  if (card.block) gainBlock(state.player, card.block);
  if (card.vuln) {
    state.enemy.vuln += card.vuln;
    addLog(`${state.enemy.name}に脆弱${card.vuln}を付与。`);
  }

  if (state.enemy.hp <= 0) {
    victory();
    return;
  }
  render();
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

function chooseEnemyIntent(enemy) {
  enemy.intent = { ...enemy.intents[Math.floor(Math.random() * enemy.intents.length)] };
}

function intentText(intent) {
  if (!intent) return '-';
  if (intent.type === 'attack') return `攻撃 ${calcEnemyAttack(intent.value)}`;
  if (intent.type === 'block') return `防御 ${intent.block}`;
  if (intent.type === 'buff') return `強化 筋力+${intent.value}`;
  if (intent.type === 'attackBlock') return `攻撃 ${calcEnemyAttack(intent.value)} + 防御 ${intent.block}`;
  return '???';
}

function applyRelicStartTurn() {
  state.player.relics.forEach((r) => {
    if (r.applyStartTurn) r.applyStartTurn(state);
  });
}

function startCombat() {
  const seed = state.nextEncounter || enemyPool[Math.floor(Math.random() * enemyPool.length)];
  state.enemy = { ...seed, maxHp: seed.hp, block: 0, vuln: 0, strength: 0, intent: null };
  state.nextEncounter = null;
  state.mode = 'combat';
  state.turn = 1;
  state.player.block = 0;
  state.player.energy = 3;
  state.player.draw = shuffle(state.player.deck);
  state.player.hand = [];
  state.player.discard = [];
  draw(5);
  chooseEnemyIntent(state.enemy);
  applyRelicStartTurn();
  addLog(`--- 戦闘開始: ${state.enemy.name} ---`);
  render();
}

function doEnemyTurn() {
  const intent = state.enemy.intent;
  if (!intent) return;

  if (intent.type === 'attack' || intent.type === 'attackBlock') {
    const dealt = damage(state.player, calcEnemyAttack(intent.value));
    addLog(`${state.enemy.name}の攻撃！ あなたは${dealt}ダメージ。`);
  }
  if (intent.type === 'block' || intent.type === 'attackBlock') {
    gainBlock(state.enemy, intent.block);
  }
  if (intent.type === 'buff') {
    state.enemy.strength += intent.value;
    addLog(`${state.enemy.name}の筋力が${intent.value}上がった。`);
  }
}

function startPlayerTurn() {
  state.turn += 1;
  state.player.block = 0;
  state.enemy.vuln = Math.max(0, state.enemy.vuln - 1);
  state.player.energy = 3;
  draw(5);
  chooseEnemyIntent(state.enemy);
  applyRelicStartTurn();
}

function endTurn() {
  state.player.hand.forEach((c) => state.player.discard.push(c));
  state.player.hand = [];

  doEnemyTurn();
  if (state.player.hp <= 0) {
    state.mode = 'dead';
    addLog('力尽きた…。');
    render();
    return;
  }

  state.enemy.block = 0;
  startPlayerTurn();
  render();
}

function rollPostCombatEvents() {
  const events = [];
  if (Math.random() < 0.65) events.push('camp');
  if (Math.random() < 0.55) events.push('shop');
  if (events.length === 0) events.push('continue');
  return events;
}

function victory() {
  const gainGold = 18 + Math.floor(Math.random() * 18);
  state.gold += gainGold;
  state.mode = 'reward';
  state.rewardChoices = shuffle(rewardCards).slice(0, 3);
  state.relicChoices = shuffle(relicPool).slice(0, 1);
  state.postCombatOptions = rollPostCombatEvents();
  addLog(`${state.enemy.name}を倒した！ ${gainGold}ゴールド獲得。`);
  render();
}

function takeReward(cardId) {
  state.player.deck.push(cardId);
  addLog(`${cardDefs[cardId].name}をデッキに追加。`);
  state.mode = 'postCombat';
  render();
}

function skipReward() {
  addLog('カード報酬をスキップ。');
  state.mode = 'postCombat';
  render();
}

function chooseRelic(relicId) {
  const relic = relicPool.find((r) => r.id === relicId);
  if (!relic) return;
  if (!state.player.relics.some((r) => r.id === relic.id)) {
    state.player.relics.push(relic);
    if (relic.onGain) relic.onGain(state);
    addLog(`レリック獲得: ${relic.name} (${relic.text})`);
  }
  state.relicChoices = [];
  render();
}

function enterShop() {
  state.mode = 'shop';
  state.shopChoices = shuffle(rewardCards).slice(0, 5).map((id) => {
    const card = cardDefs[id];
    const price = 40 + card.cost * 15 + (id.includes('bash') ? 15 : 0);
    return { id, price };
  });
  render();
}

function buyCard(id, price) {
  if (state.gold < price) {
    addLog('ゴールドが足りない。');
    render();
    return;
  }
  state.gold -= price;
  state.player.deck.push(id);
  addLog(`ショップで${cardDefs[id].name}を購入（${price}G）。`);
  state.shopChoices = state.shopChoices.filter((c) => c.id !== id);
  render();
}

function enterCamp() {
  state.mode = 'camp';
  state.campChoices = [...new Set(state.player.deck)].slice(0, 8);
  render();
}

function campHeal() {
  const heal = 14;
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + heal);
  addLog(`休憩してHPを${heal}回復。`);
  state.mode = 'postCombat';
  render();
}

function campRemove(cardId) {
  const idx = state.player.deck.indexOf(cardId);
  if (idx >= 0) {
    state.player.deck.splice(idx, 1);
    addLog(`${cardDefs[cardId].name}をデッキから削除。`);
  }
  state.mode = 'postCombat';
  render();
}

function campUpgrade(cardId) {
  const up = cardDefs[cardId].upgradeTo;
  if (!up) {
    addLog('そのカードはこれ以上強化できない。');
    return;
  }
  const idx = state.player.deck.indexOf(cardId);
  if (idx >= 0) {
    state.player.deck[idx] = up;
    addLog(`${cardDefs[cardId].name}を${cardDefs[up].name}に強化。`);
  }
  state.mode = 'postCombat';
  render();
}

function nextFloor() {
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

function saveGame() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  addLog('セーブしました。');
  render();
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    addLog('セーブデータがありません。');
    render();
    return;
  }
  const loaded = JSON.parse(raw);
  loaded.player.relics = (loaded.player.relics || [])
    .map((r) => relicPool.find((x) => x.id === r.id))
    .filter(Boolean);
  state = loaded;
  addLog('ロードしました。');
  render();
}

function restart() {
  state = defaultState();
  addLog('新しい冒険を開始。');
  render();
}

function hpBar(current, max) {
  const ratio = Math.max(0, Math.min(100, Math.round((current / max) * 100)));
  return `<div class="hp-bar"><span style="width:${ratio}%"></span></div>`;
}

function renderHUD() {
  el.hud.innerHTML = `
    <div class="grid">
      <div class="stat">階層: ${state.floor} / ${state.maxFloor}</div>
      <div class="stat">所持金: ${state.gold}G</div>
      <div class="stat">デッキ: ${state.player.deck.length}枚</div>
      <div class="stat">レリック数: ${state.player.relics.length}</div>
    </div>
    <details class="relic-box" style="margin-top:0.5rem;">
      <summary>所持レリック一覧</summary>
      ${state.player.relics.length ? state.player.relics.map((r) => `<div class="small">・${r.name}: ${r.text}</div>`).join('') : '<div class="small">なし</div>'}
    </details>
    <div class="row" style="margin-top:0.5rem;">
      <button id="saveBtn">セーブ</button>
      <button id="loadBtn">ロード</button>
      <button id="restartBtn">ニューゲーム</button>
    </div>
  `;
  document.getElementById('saveBtn').addEventListener('click', saveGame);
  document.getElementById('loadBtn').addEventListener('click', loadGame);
  document.getElementById('restartBtn').addEventListener('click', restart);
}

function renderState() {
  if (state.mode === 'combat') {
    el.state.innerHTML = `
      <div class="status-grid">
        <div class="panel player-panel">
          <h3>あなた</h3>
          <p>HP ${state.player.hp} / ${state.player.maxHp}</p>
          ${hpBar(state.player.hp, state.player.maxHp)}
          <p>エナジー: ${state.player.energy} / ブロック: <span class="block">${state.player.block}</span> / 筋力: ${state.player.strength}</p>
        </div>
        <div class="panel enemy-panel">
          <h3>敵: ${state.enemy.name}</h3>
          <p>HP ${state.enemy.hp} / ${state.enemy.maxHp}</p>
          ${hpBar(state.enemy.hp, state.enemy.maxHp)}
          <p>ブロック: <span class="block">${state.enemy.block}</span> / 脆弱: ${state.enemy.vuln} / 筋力: ${state.enemy.strength}</p>
          <p>次の行動予告: <strong>${intentText(state.enemy.intent)}</strong></p>
        </div>
      </div>
    `;
    return;
  }

  if (state.mode === 'map') {
    el.state.innerHTML = '<h2>次の戦闘へ進む</h2><p>戦闘後に休憩・ショップが確率で出現します。</p>';
    return;
  }
  if (state.mode === 'reward') {
    const relicPick = state.relicChoices[0];
    el.state.innerHTML = `<h2>戦利品</h2><p>カードを1枚選択。${relicPick ? ` レリック候補: ${relicPick.name}` : ''}</p>`;
    return;
  }
  if (state.mode === 'postCombat') {
    el.state.innerHTML = '<h2>戦闘後イベント</h2><p>出現した施設を任意で利用してから次へ進めます。</p>';
    return;
  }
  if (state.mode === 'shop') {
    el.state.innerHTML = '<h2>ショップ</h2><p>5つの候補から好きなカードを購入できます。</p>';
    return;
  }
  if (state.mode === 'camp') {
    el.state.innerHTML = '<h2>焚き火</h2><p>回復 / 削除 / 強化 から1つ選択。</p>';
    return;
  }
  if (state.mode === 'win') {
    el.state.innerHTML = '<h2>踏破成功！</h2><p>おめでとう、塔を登り切りました。</p>';
    return;
  }
  if (state.mode === 'dead') {
    el.state.innerHTML = '<h2>ゲームオーバー</h2><p>もう一度挑戦しましょう。</p>';
  }
}

function renderActions() {
  if (state.mode === 'combat') {
    const handButtons = state.player.hand.map((id, i) => {
      const c = cardDefs[id];
      const disabled = c.cost > state.player.energy;
      const damagePreview = c.dmg ? ` / 与ダメ:${calcPlayerDamage(c.dmg)}` : '';
      return `<button class="card-button${disabled ? ' is-disabled' : ''}" ${disabled ? 'disabled' : ''} data-play="${i}">${c.name} [${c.cost}]<br><span class="small">${c.text}${damagePreview}</span></button>`;
    }).join('');
    el.actions.innerHTML = `<div class="row">${handButtons}</div><div class="row" style="margin-top:0.6rem;"><button id="endTurn">ターン終了</button></div>`;
    el.actions.querySelectorAll('[data-play]').forEach((btn) => btn.addEventListener('click', () => playCard(Number(btn.dataset.play))));
    document.getElementById('endTurn').addEventListener('click', endTurn);
    return;
  }

  if (state.mode === 'map') {
    el.actions.innerHTML = '<button id="startFight">戦闘開始</button>';
    document.getElementById('startFight').addEventListener('click', startCombat);
    return;
  }

  if (state.mode === 'reward') {
    const picks = state.rewardChoices.map((id) => `<button data-reward="${id}">${cardDefs[id].name}<br><span class="small">${cardDefs[id].text}</span></button>`).join('');
    const relicPick = state.relicChoices[0];
    const relicButton = relicPick ? `<button id="takeRelic">レリック獲得: ${relicPick.name}<br><span class="small">${relicPick.text}</span></button>` : '';
    el.actions.innerHTML = `<div class="row">${picks}</div><div class="row" style="margin-top:0.5rem;"><button id="skipReward">カードをスキップ</button>${relicButton}</div>`;
    el.actions.querySelectorAll('[data-reward]').forEach((btn) => btn.addEventListener('click', () => takeReward(btn.dataset.reward)));
    document.getElementById('skipReward').addEventListener('click', skipReward);
    if (relicPick) document.getElementById('takeRelic').addEventListener('click', () => chooseRelic(relicPick.id));
    return;
  }

  if (state.mode === 'postCombat') {
    const opts = state.postCombatOptions || [];
    const buttons = [
      opts.includes('camp') ? '<button id="toCamp">焚き火へ</button>' : '',
      opts.includes('shop') ? '<button id="toShop">ショップへ</button>' : '',
      '<button id="nextFloor">次の階へ</button>',
    ].join('');
    el.actions.innerHTML = `<div class="row">${buttons}</div>`;
    if (opts.includes('camp')) document.getElementById('toCamp').addEventListener('click', enterCamp);
    if (opts.includes('shop')) document.getElementById('toShop').addEventListener('click', enterShop);
    document.getElementById('nextFloor').addEventListener('click', nextFloor);
    return;
  }

  if (state.mode === 'shop') {
    const list = state.shopChoices.map((c) => `<button data-buy="${c.id}" data-price="${c.price}">${cardDefs[c.id].name}<br><span class="small">${cardDefs[c.id].text} / ${c.price}G</span></button>`).join('');
    el.actions.innerHTML = `<div class="row">${list}</div><div class="row" style="margin-top:0.6rem;"><button id="leaveShop">ショップを出る</button></div>`;
    el.actions.querySelectorAll('[data-buy]').forEach((btn) => btn.addEventListener('click', () => buyCard(btn.dataset.buy, Number(btn.dataset.price))));
    document.getElementById('leaveShop').addEventListener('click', () => { state.mode = 'postCombat'; render(); });
    return;
  }

  if (state.mode === 'camp') {
    const removable = state.campChoices.map((id) => `<button data-remove="${id}">削除: ${cardDefs[id].name}</button>`).join('');
    const upgradable = state.campChoices
      .filter((id) => cardDefs[id].upgradeTo)
      .map((id) => `<button data-up="${id}">強化: ${cardDefs[id].name} → ${cardDefs[cardDefs[id].upgradeTo].name}</button>`)
      .join('');
    el.actions.innerHTML = `
      <div class="row"><button id="campHeal">休憩（14回復）</button><button id="leaveCamp">戻る</button></div>
      <p class="small">カード削除（1枚）</p><div class="row">${removable || '<span class="small">対象なし</span>'}</div>
      <p class="small">カード強化（1枚）</p><div class="row">${upgradable || '<span class="small">対象なし</span>'}</div>
    `;
    document.getElementById('campHeal').addEventListener('click', campHeal);
    document.getElementById('leaveCamp').addEventListener('click', () => { state.mode = 'postCombat'; render(); });
    el.actions.querySelectorAll('[data-remove]').forEach((btn) => btn.addEventListener('click', () => campRemove(btn.dataset.remove)));
    el.actions.querySelectorAll('[data-up]').forEach((btn) => btn.addEventListener('click', () => campUpgrade(btn.dataset.up)));

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

addLog('ゲーム開始。戦闘を始めましょう。');

render();
