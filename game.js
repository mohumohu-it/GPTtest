const STORAGE_KEY = 'mini_spire_save_v4';

const cardDefs = {
  strike: { name: 'ストライク', cost: 1, rarity: 'common', dmg: 6, upgradeTo: 'strike_p' },
  strike_p: { name: 'ストライク+', cost: 1, rarity: 'common', dmg: 9, upgraded: true },
  defend: { name: 'ディフェンド', cost: 1, rarity: 'common', block: 5, upgradeTo: 'defend_p' },
  defend_p: { name: 'ディフェンド+', cost: 1, rarity: 'common', block: 8, upgraded: true },
  bash: { name: 'バッシュ', cost: 2, rarity: 'common', dmg: 8, weak: 1, upgradeTo: 'bash_p' },
  bash_p: { name: 'バッシュ+', cost: 2, rarity: 'common', dmg: 10, weak: 2, upgraded: true },

  quick: { name: 'クイックジャブ', cost: 0, rarity: 'uncommon', dmg: 4, upgradeTo: 'quick_p' },
  quick_p: { name: 'クイックジャブ+', cost: 0, rarity: 'uncommon', dmg: 6, upgraded: true },
  ironwall: { name: '鉄壁', cost: 1, rarity: 'uncommon', block: 8, upgradeTo: 'ironwall_p' },
  ironwall_p: { name: '鉄壁+', cost: 1, rarity: 'uncommon', block: 11, upgraded: true },
  rage: { name: '激昂', cost: 1, rarity: 'uncommon', dmg: 5, block: 3, upgradeTo: 'rage_p' },
  rage_p: { name: '激昂+', cost: 1, rarity: 'uncommon', dmg: 7, block: 5, upgraded: true },
  uppercut: { name: 'アッパーカット', cost: 2, rarity: 'rare', dmg: 11, weak: 2, upgradeTo: 'uppercut_p' },
  uppercut_p: { name: 'アッパーカット+', cost: 2, rarity: 'rare', dmg: 14, weak: 2, upgraded: true },
  execute: { name: '処刑', cost: 2, rarity: 'rare', dmg: 16, upgradeTo: 'execute_p' },
  execute_p: { name: '処刑+', cost: 2, rarity: 'rare', dmg: 21, upgraded: true },
  meteor: { name: 'メテオブレイク', cost: 2, rarity: 'legendary', dmg: 24, exhaust: true },
  bloodRitual: { name: '血の儀式', cost: 1, rarity: 'legendary', dmg: 18, weak: 2, exhaust: true },
};

const normalEnemyPool = [
  { name: 'シラミ', hp: 16, intents: [{ type: 'attack', value: 4 }, { type: 'attack', value: 5 }] },
  { name: 'カルト教団員', hp: 20, intents: [{ type: 'attack', value: 5 }, { type: 'buff', value: 1 }] },
  { name: 'ジョーウォーム', hp: 24, intents: [{ type: 'attack', value: 6 }, { type: 'attackBlock', value: 4, block: 4 }] },
  { name: '番兵', hp: 26, intents: [{ type: 'attack', value: 5 }, { type: 'block', block: 6 }, { type: 'weaken', weak: 1 }] },
];

const elitePool = [
  { name: 'エリート・ラガヴーリン', hp: 72, isElite: true, intents: [{ type: 'attack', value: 14 }, { type: 'attackBlock', value: 10, block: 10 }, { type: 'buff', value: 2 }] },
  { name: 'エリート・グレムリンノブ', hp: 80, isElite: true, intents: [{ type: 'attack', value: 15 }, { type: 'weakenAttack', weak: 2, value: 11 }, { type: 'buff', value: 2 }] },
];

const bossPool = [
  { name: 'ボス・覚醒者', hp: 150, isBoss: true, intents: [{ type: 'attack', value: 18 }, { type: 'attackBlock', value: 12, block: 14 }, { type: 'buff', value: 3 }, { type: 'weakenAttack', weak: 2, value: 14 }] },
];

const relicPool = [
  { id: 'whetstone', name: '砥石', text: '攻撃カードのダメージ+1（永続）', onDealDamageBonus: 1 },
  { id: 'horn', name: '角笛', text: '各ターン開始時に2ブロック', applyStartTurn: () => gainBlock(state.player, 2) },
  { id: 'heart', name: '赤いハート', text: '最大HP+10、即時10回復', onGain: () => { state.player.maxHp += 10; state.player.hp = Math.min(state.player.maxHp, state.player.hp + 10); } },
  { id: 'ruby', name: '紅蓮のルビー', text: '与ダメージ+2', onDealDamageBonus: 2 },
  { id: 'mirror', name: '鏡面の欠片', text: '筋力+1（永続）', onGain: () => { state.player.strengthBase += 1; } },
];

const rewardCards = ['quick', 'ironwall', 'rage', 'uppercut', 'execute', 'meteor', 'bloodRitual', 'strike', 'defend', 'bash'];
const shopCards = ['quick', 'ironwall', 'rage', 'uppercut', 'execute', 'meteor', 'bloodRitual'];

const defaultState = () => ({
  floor: 1,
  maxFloor: 10,
  gold: 120,
  mode: 'map',
  turn: 0,
  rewardTaken: false,
  relicTaken: false,
  rewardChoices: [],
  shopChoices: [],
  relicChoices: [],
  campChoices: [],
  postCombatOptions: [],
  postCombatLocked: false,
  mapText: '塔の入口に立っている。',
  eliteOffer: null,
  showDeck: false,
  showRelics: false,
  selectedTarget: 0,
  player: {
    maxHp: 70,
    hp: 70,
    block: 0,
    energy: 3,
    strengthBase: 0,
    strengthCombat: 0,
    weak: 0,
    vuln: 0,
    deck: ['strike', 'strike', 'strike', 'strike', 'defend', 'defend', 'defend', 'bash', 'quick', 'ironwall'],
    draw: [],
    hand: [],
    discard: [],
    relics: [],
  },
  enemies: [],
  log: [],
});

let state = defaultState();

const el = {
  topControls: document.getElementById('topControls'),
  hud: document.getElementById('hud'),
  state: document.getElementById('state'),
  actions: document.getElementById('actions'),
  log: document.getElementById('log'),
};

function addLog(text) { state.log.unshift(text); state.log = state.log.slice(0, 80); }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function aliveEnemies() { return state.enemies.filter((e) => e.hp > 0); }
function currentTarget() { return state.enemies[state.selectedTarget] && state.enemies[state.selectedTarget].hp > 0 ? state.enemies[state.selectedTarget] : aliveEnemies()[0]; }

function applyVulnOnBlock(unit, value) { return unit.vuln > 0 ? Math.max(0, Math.floor(value * 0.75)) : value; }
function gainBlock(unit, value) {
  const actual = applyVulnOnBlock(unit, value);
  unit.block += actual;
  addLog(`${unit === state.player ? 'あなた' : unit.name}は${actual}ブロックを得た。`);
}
function damage(unit, amount) {
  const amplified = unit.weak > 0 ? Math.ceil(amount * 1.5) : amount;
  const reduced = Math.max(0, amplified - unit.block);
  unit.block = Math.max(0, unit.block - amplified);
  unit.hp -= reduced;
  return reduced;
}

function playerStrength() { return state.player.strengthBase + state.player.strengthCombat; }
function relicDamageBonus() { return state.player.relics.reduce((sum, r) => sum + (r.onDealDamageBonus || 0), 0); }
function calcPlayerDamage(base) { return Math.max(0, base + playerStrength() + relicDamageBonus()); }
function calcEnemyAttack(enemy, base) { return Math.max(0, base + (enemy.strength || 0)); }

function getCardRarityClass(id) { return `rarity-${cardDefs[id].rarity || 'common'}`; }
function getCardDisplayName(id) { const c = cardDefs[id]; return `<span class="${c.upgraded ? 'upgraded' : ''}">${c.name}</span>`; }
function cardText(id) {
  const c = cardDefs[id];
  const parts = [`コスト:${c.cost}`];
  if (c.dmg) parts.push(`敵に${calcPlayerDamage(c.dmg)}ダメージ`);
  if (c.block) parts.push(`自分に${c.block}ブロック`);
  if (c.weak) parts.push(`弱体${c.weak}`);
  if (c.strengthGain) parts.push(`筋力+${c.strengthGain}`);
  if (c.exhaust) parts.push('廃棄');
  return parts.join(' / ');
}

function chooseEnemyIntent(enemy) { enemy.intent = { ...enemy.intents[Math.floor(Math.random() * enemy.intents.length)] }; }
function intentText(enemy) {
  const i = enemy.intent;
  if (!i) return '-';
  if (i.type === 'attack') return `攻撃 ${calcEnemyAttack(enemy, i.value)}`;
  if (i.type === 'block') return `防御 ${i.block}`;
  if (i.type === 'buff') return `強化 筋力+${i.value}`;
  if (i.type === 'attackBlock') return `攻撃 ${calcEnemyAttack(enemy, i.value)} + 防御 ${i.block}`;
  if (i.type === 'weaken') return `弱体付与 ${i.weak}`;
  if (i.type === 'weakenAttack') return `攻撃 ${calcEnemyAttack(enemy, i.value)} + 弱体${i.weak}`;
  return '???';
}

function applyRelicStartTurn() { state.player.relics.forEach((r) => { if (r.applyStartTurn) r.applyStartTurn(); }); }

function spawnNormalGroup() {
  const count = 1 + Math.floor(Math.random() * 6);
  return Array.from({ length: count }, () => {
    const seed = normalEnemyPool[Math.floor(Math.random() * normalEnemyPool.length)];
    return { ...seed, maxHp: seed.hp, hp: seed.hp, block: 0, weak: 0, vuln: 0, strength: 0, intent: null };
  });
}

function startCombat(encounter = null) {
  let group = [];
  if (encounter?.isBoss) group = [{ ...encounter, maxHp: encounter.hp, block: 0, weak: 0, vuln: 0, strength: 0, intent: null }];
  else if (encounter?.isElite) group = [{ ...encounter, maxHp: encounter.hp, block: 0, weak: 0, vuln: 0, strength: 0, intent: null }];
  else group = spawnNormalGroup();

  state.enemies = group;
  state.selectedTarget = 0;
  state.mode = 'combat';
  state.turn = 1;

  state.player.block = 0;
  state.player.energy = 3;
  state.player.strengthCombat = 0;
  state.player.weak = 0;
  state.player.vuln = 0;
  state.player.draw = shuffle(state.player.deck);
  state.player.hand = [];
  state.player.discard = [];

  draw(5);
  state.enemies.forEach(chooseEnemyIntent);
  applyRelicStartTurn();
  addLog(`--- 戦闘開始: ${state.enemies.map((e) => e.name).join(' / ')} ---`);
  render();
}

function playCard(index) {
  const cardId = state.player.hand[index];
  const card = cardDefs[cardId];
  if (!card || card.cost > state.player.energy) return;

  const target = currentTarget();
  const needsTarget = !!(card.dmg || card.weak);
  if (needsTarget && !target) return;

  state.player.energy -= card.cost;
  state.player.hand.splice(index, 1);
  if (!card.exhaust) state.player.discard.push(cardId);

  if (card.dmg && target) {
    const dealt = damage(target, calcPlayerDamage(card.dmg));
    addLog(`あなたの${card.name}！ ${target.name}に${dealt}ダメージ。`);
  }
  if (card.block) gainBlock(state.player, card.block);
  if (card.weak && target) { target.weak += card.weak; addLog(`${target.name}に弱体${card.weak}を付与。`); }
  if (card.strengthGain) { state.player.strengthCombat += card.strengthGain; addLog(`あなたの筋力が${card.strengthGain}上がった。`); }

  if (aliveEnemies().length === 0) {
    victory();
    return;
  }
  render();
}

function doEnemyTurn() {
  state.enemies.forEach((enemy) => {
    if (enemy.hp <= 0) return;
    const i = enemy.intent;
    enemy.block = 0;
    if (i.type === 'attack' || i.type === 'attackBlock' || i.type === 'weakenAttack') {
      const dealt = damage(state.player, calcEnemyAttack(enemy, i.value));
      addLog(`${enemy.name}の攻撃！ あなたは${dealt}ダメージ。`);
    }
    if (i.type === 'block' || i.type === 'attackBlock') gainBlock(enemy, i.block);
    if (i.type === 'buff') { enemy.strength += i.value; addLog(`${enemy.name}の筋力が${i.value}上がった。`); }
    if (i.type === 'weaken' || i.type === 'weakenAttack') { state.player.weak += i.weak; addLog(`あなたは弱体${i.weak}を受けた。`); }
  });
}

function tickDebuffs(unit) { unit.weak = Math.max(0, unit.weak - 1); unit.vuln = Math.max(0, unit.vuln - 1); }

function startPlayerTurn() {
  state.turn += 1;
  state.player.block = 0;
  state.player.energy = 3;
  draw(5);
  state.enemies.forEach((e) => { if (e.hp > 0) chooseEnemyIntent(e); });
  applyRelicStartTurn();
}

function endTurn() {
  state.player.hand.forEach((c) => state.player.discard.push(c));
  state.player.hand = [];
  tickDebuffs(state.player);
  state.enemies.forEach((e) => tickDebuffs(e));
  doEnemyTurn();
  if (state.player.hp <= 0) { state.mode = 'dead'; render(); return; }
  startPlayerTurn();
  render();
}

function availableRelics() {
  const owned = new Set(state.player.relics.map((r) => r.id));
  return relicPool.filter((r) => !owned.has(r.id));
}

function victory() {
  if (state.enemies.some((e) => e.isBoss)) { state.mode = 'win'; addLog('ボスを撃破！塔を踏破した。'); render(); return; }
  const elite = state.enemies.some((e) => e.isElite);
  state.gold += elite ? 55 : 20 + Math.floor(Math.random() * 10);
  state.mode = 'reward';
  state.rewardTaken = false;
  state.relicTaken = false;
  state.rewardChoices = shuffle(rewardCards).slice(0, 3);
  state.relicChoices = elite ? shuffle(availableRelics()).slice(0, 1) : [];
  state.postCombatOptions = ['camp', 'shop'];
  state.postCombatLocked = false;
  render();
}

function takeReward(id) {
  if (state.rewardTaken) return;
  state.player.deck.push(id);
  state.rewardTaken = true;
  if (!state.relicChoices.length || state.relicTaken) state.mode = 'postCombat';
  render();
}
function skipReward() { state.rewardTaken = true; if (!state.relicChoices.length || state.relicTaken) state.mode = 'postCombat'; render(); }
function chooseRelic(id) {
  const r = relicPool.find((x) => x.id === id);
  if (!r) return;
  state.player.relics.push(r);
  if (r.onGain) r.onGain();
  state.relicTaken = true;
  state.relicChoices = [];
  if (state.rewardTaken) state.mode = 'postCombat';
  render();
}

function enterShop() {
  state.mode = 'shop';
  state.shopChoices = shuffle(shopCards).slice(0, 5).map((id) => ({ id, price: 45 + cardDefs[id].cost * 15 + ({ uncommon: 20, rare: 55, legendary: 100 }[cardDefs[id].rarity] || 0) }));
  render();
}
function buyCard(id, price) { if (state.gold < price) return; state.gold -= price; state.player.deck.push(id); state.shopChoices = state.shopChoices.filter((c) => c.id !== id); render(); }
function leaveShop() { state.postCombatLocked = true; state.postCombatOptions = ['continue']; state.mode = 'postCombat'; render(); }

function enterCamp() { state.mode = 'camp'; state.campChoices = [...new Set(state.player.deck)].slice(0, 12); render(); }
function resolveCamp() { state.postCombatLocked = true; state.postCombatOptions = ['continue']; state.mode = 'postCombat'; render(); }
function campHeal() { state.player.hp = Math.min(state.player.maxHp, state.player.hp + 14); resolveCamp(); }
function campRemove(id) { const i = state.player.deck.indexOf(id); if (i >= 0) state.player.deck.splice(i, 1); resolveCamp(); }
function campUpgrade(id) { const up = cardDefs[id].upgradeTo; if (!up) return; const i = state.player.deck.indexOf(id); if (i >= 0) state.player.deck[i] = up; resolveCamp(); }

function prepareMap() { state.eliteOffer = state.floor === state.maxFloor ? null : (Math.random() < 0.2 ? elitePool[Math.floor(Math.random() * elitePool.length)] : null); }
function nextFloor() { state.floor += 1; if (state.floor > state.maxFloor) { state.mode = 'win'; render(); return; } state.mode = 'map'; state.enemies = []; state.postCombatLocked = false; prepareMap(); render(); }

function saveGame() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return;
  const loaded = JSON.parse(raw);
  loaded.player.relics = (loaded.player.relics || []).map((r) => relicPool.find((x) => x.id === r.id)).filter(Boolean);
  state = { ...defaultState(), ...loaded, player: { ...defaultState().player, ...loaded.player } };
  render();
}
function restart() { state = defaultState(); prepareMap(); render(); }

function toggleDeck() { state.showDeck = !state.showDeck; render(); }
function toggleRelics() { state.showRelics = !state.showRelics; render(); }
function setTarget(idx) { state.selectedTarget = idx; render(); }

function renderDeckList() {
  if (!state.showDeck) return '';
  const counts = {};
  state.player.deck.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
  return `<div class="deck-view">${Object.entries(counts).map(([id, count]) => `<div class="small ${getCardRarityClass(id)}">・${getCardDisplayName(id)} x${count} - ${cardText(id)}</div>`).join('')}</div>`;
}

function renderRelicList() {
  if (!state.showRelics) return '';
  return `<div class="deck-view">${state.player.relics.map((r) => `<div class="small">・${r.name}: ${r.text}</div>`).join('') || '<div class="small">なし</div>'}</div>`;
}

function renderTopControls() {
  el.topControls.innerHTML = '<button id="saveBtn">セーブ</button><button id="loadBtn">ロード</button><button id="restartBtn">ニューゲーム</button>';
  document.getElementById('saveBtn').addEventListener('click', saveGame);
  document.getElementById('loadBtn').addEventListener('click', loadGame);
  document.getElementById('restartBtn').addEventListener('click', restart);
}

function hpBar(cur, max) { return `<div class="hp-bar"><span style="width:${Math.round((cur / max) * 100)}%"></span></div>`; }

function statusLine(unit) {
  const bits = [];
  if ((unit.strength || 0) > 0) bits.push(`筋力:${unit.strength}`);
  if ((unit.weak || 0) > 0) bits.push(`弱体:${unit.weak}`);
  if ((unit.vuln || 0) > 0) bits.push(`脆弱:${unit.vuln}`);
  return bits.length ? `<p>${bits.join(' / ')}</p>` : '';
}

function renderHUD() {
  el.hud.innerHTML = `
    <div class="grid hud-grid-5">
      <div class="stat">HP: ${state.player.hp} / ${state.player.maxHp}</div>
      <div class="stat">階層: ${state.floor} / ${state.maxFloor}</div>
      <div class="stat">所持金: ${state.gold}G</div>
      <button class="stat deck-btn" id="deckBtn">デッキ: ${state.player.deck.length}枚</button>
      <button class="stat deck-btn" id="relicBtn">所持レリック一覧</button>
    </div>
    ${renderDeckList()}
    ${renderRelicList()}
  `;
  document.getElementById('deckBtn').addEventListener('click', toggleDeck);
  document.getElementById('relicBtn').addEventListener('click', toggleRelics);
}

function renderState() {
  if (state.mode === 'combat') {
    const enemiesHtml = state.enemies.map((enemy, i) => {
      const selected = currentTarget() === enemy ? 'selected-target' : '';
      return `<button class="panel enemy-panel enemy-card ${selected} ${enemy.hp <= 0 ? 'is-disabled' : ''}" data-target="${i}" ${enemy.hp <= 0 ? 'disabled' : ''}>
        <h3>${enemy.name}${enemy.isElite ? '【エリート】' : enemy.isBoss ? '【ボス】' : ''}</h3>
        <p>HP ${Math.max(0, enemy.hp)} / ${enemy.maxHp}</p>
        ${hpBar(Math.max(0, enemy.hp), enemy.maxHp)}
        <p>ブロック: <span class="block">${enemy.block}</span></p>
        ${statusLine(enemy)}
        <p>行動予告: <strong>${enemy.hp > 0 ? intentText(enemy) : '撃破済み'}</strong></p>
      </button>`;
    }).join('');

    el.state.innerHTML = `
      <div class="status-grid">
        <div class="panel player-panel">
          <h3>あなた</h3>
          <p>HP ${state.player.hp} / ${state.player.maxHp}</p>
          ${hpBar(state.player.hp, state.player.maxHp)}
          <p>エナジー: ${state.player.energy} / ブロック: <span class="block">${state.player.block}</span></p>
          ${statusLine({ strength: playerStrength(), weak: state.player.weak, vuln: state.player.vuln })}
        </div>
      </div>
      <div class="enemy-grid">${enemiesHtml}</div>
    `;
    document.querySelectorAll('[data-target]').forEach((btn) => btn.addEventListener('click', () => setTarget(Number(btn.dataset.target))));
    return;
  }

  if (state.mode === 'map') {
    if (state.floor === state.maxFloor) { el.state.innerHTML = '<h2>最終階層</h2><p>重い殺気が漂う。ボスが待っている…。</p>'; return; }
    el.state.innerHTML = `<h2>次の階層へ進む</h2><p>${state.eliteOffer ? '強い気配を感じる。' : '次の敵を探して進む。'}</p>`;
    return;
  }
  if (state.mode === 'reward') { el.state.innerHTML = '<h2>戦利品</h2><p>カードとレリックを受け取って進もう。</p>'; return; }
  if (state.mode === 'postCombat') { el.state.innerHTML = `<h2>戦闘後イベント</h2><p>${state.postCombatLocked ? '準備は整った。次の階層へ進もう。' : '焚火かショップを1つ選べる。'}</p>`; return; }
  if (state.mode === 'shop') { el.state.innerHTML = '<h2>ショップ</h2><p>カード購入。</p>'; return; }
  if (state.mode === 'camp') { el.state.innerHTML = '<h2>焚き火</h2><p>回復 / 削除 / 強化。</p>'; return; }
  if (state.mode === 'win') { el.state.innerHTML = '<h2>踏破成功！</h2>'; return; }
  if (state.mode === 'dead') { el.state.innerHTML = '<h2>ゲームオーバー</h2>'; }
}

function renderActions() {
  if (state.mode === 'combat') {
    el.actions.innerHTML = `<div class="row">${state.player.hand.map((id, i) => {
      const c = cardDefs[id];
      const disabled = c.cost > state.player.energy;
      return `<button class="card-button ${getCardRarityClass(id)}${disabled ? ' is-disabled' : ''}" ${disabled ? 'disabled' : ''} data-play="${i}">${getCardDisplayName(id)} [${c.cost}]<br><span class="small">${cardText(id)}</span></button>`;
    }).join('')}</div><div class="row" style="margin-top:0.6rem;"><button id="endTurn">ターン終了</button></div>`;
    el.actions.querySelectorAll('[data-play]').forEach((btn) => btn.addEventListener('click', () => playCard(Number(btn.dataset.play))));
    document.getElementById('endTurn').addEventListener('click', endTurn);
    return;
  }

  if (state.mode === 'map') {
    if (state.floor === state.maxFloor) {
      el.actions.innerHTML = '<button id="startBoss">ボス戦に挑む</button>';
      document.getElementById('startBoss').addEventListener('click', () => startCombat(bossPool[0]));
      return;
    }
    if (state.eliteOffer) {
      el.actions.innerHTML = '<div class="row"><button id="startElite">エリート戦に挑む</button><button id="startNormal">通常戦闘にする</button></div>';
      document.getElementById('startElite').addEventListener('click', () => startCombat(state.eliteOffer));
      document.getElementById('startNormal').addEventListener('click', () => startCombat());
      return;
    }
    el.actions.innerHTML = '<button id="startFight">戦闘開始</button>';
    document.getElementById('startFight').addEventListener('click', () => startCombat());
    return;
  }

  if (state.mode === 'reward') {
    const relicPick = state.relicChoices[0];
    const canProceed = state.rewardTaken && (!relicPick || state.relicTaken);
    el.actions.innerHTML = `
      <div class="row">${state.rewardChoices.map((id) => `<button data-reward="${id}" class="${getCardRarityClass(id)} ${state.rewardTaken ? 'is-disabled' : ''}" ${state.rewardTaken ? 'disabled' : ''}>${getCardDisplayName(id)}<br><span class="small">${cardText(id)}</span></button>`).join('')}</div>
      <div class="row" style="margin-top:0.5rem;"><button id="skipReward" ${state.rewardTaken ? 'disabled class="is-disabled"' : ''}>カードをスキップ</button>${relicPick ? `<button id="takeRelic" ${state.relicTaken ? 'disabled class="is-disabled"' : ''}>レリック獲得: ${relicPick.name}</button>` : ''}</div>
      <div class="row" style="margin-top:0.5rem;"><button id="finishReward" ${canProceed ? '' : 'disabled class="is-disabled"'}>報酬を受け取って進む</button></div>
    `;
    el.actions.querySelectorAll('[data-reward]').forEach((btn) => btn.addEventListener('click', () => takeReward(btn.dataset.reward)));
    document.getElementById('skipReward').addEventListener('click', skipReward);
    if (relicPick) document.getElementById('takeRelic').addEventListener('click', () => chooseRelic(relicPick.id));
    document.getElementById('finishReward').addEventListener('click', () => { if (canProceed) { state.mode = 'postCombat'; render(); } });
    return;
  }

  if (state.mode === 'postCombat') {
    const campDisabled = state.postCombatLocked;
    const shopDisabled = state.postCombatLocked;
    el.actions.innerHTML = `<div class="row"><button id="toCamp" ${campDisabled ? 'disabled class="is-disabled"' : ''}>焚き火へ</button><button id="toShop" ${shopDisabled ? 'disabled class="is-disabled"' : ''}>ショップへ</button><button id="nextFloor">次の階層へ</button></div>`;
    if (!campDisabled) document.getElementById('toCamp').addEventListener('click', enterCamp);
    if (!shopDisabled) document.getElementById('toShop').addEventListener('click', enterShop);
    document.getElementById('nextFloor').addEventListener('click', nextFloor);
    return;
  }

  if (state.mode === 'shop') {
    el.actions.innerHTML = `<div class="row">${state.shopChoices.map((c) => `<button data-buy="${c.id}" data-price="${c.price}" class="${getCardRarityClass(c.id)}">${getCardDisplayName(c.id)} [${cardDefs[c.id].cost}]<br><span class="small">${cardText(c.id)} / ${c.price}G</span></button>`).join('')}</div><div class="row" style="margin-top:0.6rem;"><button id="leaveShop">ショップを出る</button></div>`;
    el.actions.querySelectorAll('[data-buy]').forEach((btn) => btn.addEventListener('click', () => buyCard(btn.dataset.buy, Number(btn.dataset.price))));
    document.getElementById('leaveShop').addEventListener('click', leaveShop);
    return;
  }

  if (state.mode === 'camp') {
    const upgradable = state.campChoices.filter((id) => cardDefs[id].upgradeTo).map((id) => `${getCardDisplayName(id)} -> ${getCardDisplayName(cardDefs[id].upgradeTo)} (${cardText(cardDefs[id].upgradeTo)})`).join('<br>');
    el.actions.innerHTML = `<div class="row"><button id="campHeal">休憩（14回復）</button></div><p class="small">カード削除（1枚）</p><div class="row">${state.campChoices.map((id) => `<button data-remove="${id}" class="${getCardRarityClass(id)}">削除: ${getCardDisplayName(id)} [${cardDefs[id].cost}]</button>`).join('')}</div><p class="small">カード強化（1枚）</p><div class="row">${state.campChoices.filter((id) => cardDefs[id].upgradeTo).map((id) => `<button data-up="${id}" class="${getCardRarityClass(id)}">強化: ${getCardDisplayName(id)} → ${getCardDisplayName(cardDefs[id].upgradeTo)}<br><span class="small">${cardText(cardDefs[id].upgradeTo)}</span></button>`).join('')}</div><p class="small">${upgradable || '対象なし'}</p>`;
    document.getElementById('campHeal').addEventListener('click', campHeal);
    el.actions.querySelectorAll('[data-remove]').forEach((btn) => btn.addEventListener('click', () => campRemove(btn.dataset.remove)));
    el.actions.querySelectorAll('[data-up]').forEach((btn) => btn.addEventListener('click', () => campUpgrade(btn.dataset.up)));
    return;
  }

  el.actions.innerHTML = '<button id="restart">最初からプレイ</button>';
  document.getElementById('restart').addEventListener('click', restart);
}

function renderLog() { el.log.innerHTML = state.log.map((item) => `<div class="log-entry">${item}</div>`).join(''); }
function render() { renderTopControls(); renderHUD(); renderState(); renderActions(); renderLog(); }

prepareMap();
addLog('ゲーム開始。戦闘を始めましょう。');
render();
