const STORAGE_KEY = 'mini_spire_save_v3';

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
  cleave: { name: '薙ぎ払い', cost: 1, rarity: 'uncommon', dmg: 7, upgradeTo: 'cleave_p' },
  cleave_p: { name: '薙ぎ払い+', cost: 1, rarity: 'uncommon', dmg: 10, upgraded: true },
  focusGuard: { name: '集中防御', cost: 1, rarity: 'uncommon', block: 9, weak: 1, upgradeTo: 'focusGuard_p' },
  focusGuard_p: { name: '集中防御+', cost: 1, rarity: 'uncommon', block: 12, weak: 1, upgraded: true },

  uppercut: { name: 'アッパーカット', cost: 2, rarity: 'rare', dmg: 11, weak: 2, upgradeTo: 'uppercut_p' },
  uppercut_p: { name: 'アッパーカット+', cost: 2, rarity: 'rare', dmg: 14, weak: 2, upgraded: true },
  battleTrance: { name: '闘志', cost: 1, rarity: 'rare', block: 12, strengthGain: 1, upgradeTo: 'battleTrance_p' },
  battleTrance_p: { name: '闘志+', cost: 1, rarity: 'rare', block: 14, strengthGain: 2, upgraded: true },
  execute: { name: '処刑', cost: 2, rarity: 'rare', dmg: 16, upgradeTo: 'execute_p' },
  execute_p: { name: '処刑+', cost: 2, rarity: 'rare', dmg: 21, upgraded: true },

  dragonRoar: { name: '竜吼', cost: 2, rarity: 'legendary', dmg: 14, weak: 2, strengthGain: 1, upgradeTo: 'dragonRoar_p' },
  dragonRoar_p: { name: '竜吼+', cost: 2, rarity: 'legendary', dmg: 18, weak: 2, strengthGain: 2, upgraded: true },
  apocalypse: { name: '終末の一撃', cost: 3, rarity: 'legendary', dmg: 30, upgradeTo: 'apocalypse_p' },
  apocalypse_p: { name: '終末の一撃+', cost: 3, rarity: 'legendary', dmg: 38, upgraded: true },
};

const normalEnemyPool = [
  { name: 'シラミ', hp: 30, intents: [{ type: 'attack', value: 6 }, { type: 'attack', value: 8 }] },
  { name: 'カルト教団員', hp: 38, intents: [{ type: 'attack', value: 9 }, { type: 'buff', value: 2 }] },
  { name: 'ジョーウォーム', hp: 45, intents: [{ type: 'attack', value: 10 }, { type: 'attackBlock', value: 8, block: 7 }] },
  { name: '番兵', hp: 48, intents: [{ type: 'attack', value: 11 }, { type: 'block', block: 10 }, { type: 'weaken', weak: 1 }] },
];

const elitePool = [
  { name: 'エリート・ラガヴーリン', hp: 72, isElite: true, intents: [{ type: 'attack', value: 15 }, { type: 'attackBlock', value: 12, block: 12 }, { type: 'buff', value: 3 }] },
  { name: 'エリート・グレムリンノブ', hp: 78, isElite: true, intents: [{ type: 'attack', value: 16 }, { type: 'weakenAttack', weak: 2, value: 12 }, { type: 'buff', value: 3 }] },
];

const bossPool = [
  { name: 'ボス・覚醒者', hp: 130, isBoss: true, intents: [{ type: 'attack', value: 18 }, { type: 'attackBlock', value: 14, block: 16 }, { type: 'buff', value: 4 }, { type: 'weakenAttack', weak: 2, value: 16 }] },
];

const relicPool = [
  { id: 'lantern', name: 'ランタン', text: '各戦闘の1ターン目エナジー+1', applyStartTurn: (g) => { if (g.turn === 1) g.player.energy += 1; } },
  { id: 'whetstone', name: '砥石', text: '攻撃カードのダメージ+1（永続）', onDealDamageBonus: 1 },
  { id: 'horn', name: '角笛', text: '各ターン開始時に2ブロック', applyStartTurn: (g) => gainBlock(g.player, 2) },
  { id: 'heart', name: '赤いハート', text: '最大HP+10、即時10回復', onGain: (g) => { g.player.maxHp += 10; g.player.hp = Math.min(g.player.maxHp, g.player.hp + 10); } },
  { id: 'fang', name: '吸血牙', text: '攻撃カード使用時にHP1回復', onAttackCardPlayed: (g) => { g.player.hp = Math.min(g.player.maxHp, g.player.hp + 1); } },
  { id: 'shieldcore', name: 'シールドコア', text: '防御カードのブロック+2', onBlockGainBonus: 2 },
  { id: 'ruby', name: '紅蓮のルビー', text: '与ダメージ+2', onDealDamageBonus: 2 },
  { id: 'feather', name: '天使の羽', text: '階層移動時にHP3回復', onFloorAdvance: (g) => { g.player.hp = Math.min(g.player.maxHp, g.player.hp + 3); } },
  { id: 'mirror', name: '鏡面の欠片', text: '戦闘開始時に筋力+1', onCombatStart: (g) => { g.player.strength += 1; } },
];

const rewardCards = ['quick', 'ironwall', 'rage', 'cleave', 'focusGuard', 'uppercut', 'battleTrance', 'execute', 'dragonRoar', 'apocalypse', 'strike', 'defend', 'bash'];
const shopCards = ['quick', 'ironwall', 'rage', 'cleave', 'focusGuard', 'uppercut', 'battleTrance', 'execute', 'dragonRoar', 'apocalypse'];

const mapMessages = [
  (g) => (g.player.hp < g.player.maxHp * 0.4 ? '傷が深い…慎重に進もう。' : '塔の奥から敵意を感じる。'),
  (g) => (g.gold >= 150 ? '財布は重い。商人に出会えれば有利だ。' : '物資は乏しい。戦って稼ぐしかない。'),
  (g) => (g.floor >= g.maxFloor - 2 ? '終盤だ。あと少しで踏破できる。' : `第${g.floor}階層、まだまだ先は長い。`),
  () => '足音を潜め、次の戦いへ向かう。',
];

const defaultState = () => ({
  floor: 1,
  maxFloor: 10,
  gold: 120,
  mode: 'map',
  turn: 0,
  rewardTaken: false,
  relicTaken: false,
  nextEncounter: null,
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
  player: {
    maxHp: 70,
    hp: 70,
    block: 0,
    energy: 3,
    strength: 0,
    weak: 0,
    vuln: 0,
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
  topControls: document.getElementById('topControls'),
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

function applyVulnOnBlock(unit, value) {
  return unit.vuln > 0 ? Math.max(0, Math.floor(value * 0.75)) : value;
}

function blockBonusFromRelics() {
  return state.player.relics.reduce((sum, r) => sum + (r.onBlockGainBonus || 0), 0);
}

function gainBlock(unit, value) {
  let source = value;
  if (unit === state.player) source += blockBonusFromRelics();
  const actual = applyVulnOnBlock(unit, source);
  unit.block += actual;
  const unitName = unit === state.player ? 'あなた' : '敵';
  if (actual !== source) addLog(`${unitName}は脆弱の影響で${actual}ブロックを得た。`);
  else addLog(`${unitName}は${actual}ブロックを得た。`);
}

function damage(unit, amount) {
  const amplified = unit.weak > 0 ? Math.ceil(amount * 1.5) : amount;
  const reduced = Math.max(0, amplified - unit.block);
  unit.block = Math.max(0, unit.block - amplified);
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
  return !state.enemy ? base : Math.max(0, base + state.enemy.strength);
}

function getCardRarityClass(cardId) {
  return `rarity-${cardDefs[cardId].rarity || 'common'}`;
}

function getCardDisplayName(cardId) {
  const c = cardDefs[cardId];
  return `<span class="${c.upgraded ? 'upgraded' : ''}">${c.name}</span>`;
}

function cardText(cardId) {
  const card = cardDefs[cardId];
  const parts = [];
  if (card.dmg) parts.push(`敵に${calcPlayerDamage(card.dmg)}ダメージ`);
  if (card.block) parts.push(`自分に${card.block}ブロック`);
  if (card.weak) parts.push(`弱体${card.weak}`);
  if (card.strengthGain) parts.push(`筋力+${card.strengthGain}`);
  return parts.join(' + ');
}

function playCard(index) {
  const cardId = state.player.hand[index];
  const card = cardDefs[cardId];
  if (!card || card.cost > state.player.energy || !state.enemy) return;

  state.player.energy -= card.cost;
  state.player.hand.splice(index, 1);
  state.player.discard.push(cardId);

  if (card.dmg) {
    const dealt = damage(state.enemy, calcPlayerDamage(card.dmg));
    addLog(`あなたの${card.name}！ ${state.enemy.name}に${dealt}ダメージ。`);
    state.player.relics.forEach((r) => { if (r.onAttackCardPlayed) r.onAttackCardPlayed(state); });
  }
  if (card.block) gainBlock(state.player, card.block);
  if (card.weak) {
    state.enemy.weak += card.weak;
    addLog(`${state.enemy.name}に弱体${card.weak}を付与。`);
  }
  if (card.strengthGain) {
    state.player.strength += card.strengthGain;
    addLog(`あなたの筋力が${card.strengthGain}上がった。`);
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
  if (intent.type === 'weaken') return `弱体付与 ${intent.weak}`;
  if (intent.type === 'weakenAttack') return `攻撃 ${calcEnemyAttack(intent.value)} + 弱体${intent.weak}`;
  return '???';
}

function applyRelicStartTurn() {
  state.player.relics.forEach((r) => { if (r.applyStartTurn) r.applyStartTurn(state); });
}

function startCombat(encounter = null) {
  const seed = encounter || state.nextEncounter || normalEnemyPool[Math.floor(Math.random() * normalEnemyPool.length)];
  state.enemy = { ...seed, maxHp: seed.hp, block: 0, weak: 0, vuln: 0, strength: 0, intent: null };
  state.nextEncounter = null;
  state.mode = 'combat';
  state.turn = 1;

  state.player.block = 0;
  state.player.energy = 3;
  state.player.draw = shuffle(state.player.deck);
  state.player.hand = [];
  state.player.discard = [];

  state.player.relics.forEach((r) => { if (r.onCombatStart) r.onCombatStart(state); });

  draw(5);
  chooseEnemyIntent(state.enemy);
  applyRelicStartTurn();
  addLog(`--- 戦闘開始: ${state.enemy.name}${state.enemy.isElite ? '（エリート）' : state.enemy.isBoss ? '（ボス）' : ''} ---`);
  render();
}

function doEnemyTurn() {
  const intent = state.enemy.intent;
  if (!intent) return;

  state.enemy.block = 0;

  if (intent.type === 'attack' || intent.type === 'attackBlock' || intent.type === 'weakenAttack') {
    const dealt = damage(state.player, calcEnemyAttack(intent.value));
    addLog(`${state.enemy.name}の攻撃！ あなたは${dealt}ダメージ。`);
  }
  if (intent.type === 'block' || intent.type === 'attackBlock') gainBlock(state.enemy, intent.block);
  if (intent.type === 'buff') {
    state.enemy.strength += intent.value;
    addLog(`${state.enemy.name}の筋力が${intent.value}上がった。`);
  }
  if (intent.type === 'weaken' || intent.type === 'weakenAttack') {
    state.player.weak += intent.weak;
    addLog(`あなたは弱体${intent.weak}を受けた。`);
  }
}

function tickDebuffs(unit) {
  unit.weak = Math.max(0, unit.weak - 1);
  unit.vuln = Math.max(0, unit.vuln - 1);
}

function startPlayerTurn() {
  state.turn += 1;
  state.player.block = 0;
  state.player.energy = 3;
  draw(5);
  chooseEnemyIntent(state.enemy);
  applyRelicStartTurn();
}

function endTurn() {
  state.player.hand.forEach((c) => state.player.discard.push(c));
  state.player.hand = [];

  tickDebuffs(state.player);
  doEnemyTurn();
  tickDebuffs(state.enemy);

  if (state.player.hp <= 0) {
    state.mode = 'dead';
    addLog('力尽きた…。');
    render();
    return;
  }

  startPlayerTurn();
  render();
}

function availableRelics() {
  const owned = new Set(state.player.relics.map((r) => r.id));
  return relicPool.filter((r) => !owned.has(r.id));
}

function rollPostCombatEvents() {
  const events = [];
  if (Math.random() < 0.65) events.push('camp');
  if (Math.random() < 0.55) events.push('shop');
  if (events.length === 0) events.push('continue');
  return events;
}

function victory() {
  if (state.enemy.isBoss) {
    state.mode = 'win';
    addLog(`${state.enemy.name}を撃破！ 塔を踏破した！`);
    render();
    return;
  }

  const gainGold = (state.enemy.isElite ? 40 : 18) + Math.floor(Math.random() * (state.enemy.isElite ? 20 : 18));
  state.gold += gainGold;
  state.mode = 'reward';
  state.rewardTaken = false;
  state.relicTaken = false;
  state.rewardChoices = shuffle(rewardCards).slice(0, 3);
  state.relicChoices = state.enemy.isElite ? shuffle(availableRelics()).slice(0, 1) : [];
  state.postCombatOptions = rollPostCombatEvents();
  state.postCombatLocked = false;
  addLog(`${state.enemy.name}を倒した！ ${gainGold}ゴールド獲得。`);
  render();
}

function takeReward(cardId) {
  if (state.rewardTaken) return;
  state.player.deck.push(cardId);
  state.rewardTaken = true;
  addLog(`${cardDefs[cardId].name}をデッキに追加。`);
  if (state.relicChoices.length === 0 || state.relicTaken) {
    state.mode = 'postCombat';
  }
  render();
}

function skipReward() {
  state.rewardTaken = true;
  addLog('カード報酬をスキップ。');
  if (state.relicChoices.length === 0 || state.relicTaken) state.mode = 'postCombat';
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
  state.relicTaken = true;
  state.relicChoices = [];
  if (state.rewardTaken) state.mode = 'postCombat';
  render();
}

function lockPostCombat() {
  state.postCombatLocked = true;
  state.postCombatOptions = ['continue'];
}

function enterShop() {
  state.mode = 'shop';
  state.shopChoices = shuffle(shopCards).slice(0, 5).map((id) => {
    const card = cardDefs[id];
    const rarityMul = { common: 0, uncommon: 20, rare: 55, legendary: 100 };
    const price = 45 + card.cost * 15 + (rarityMul[card.rarity] || 0);
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

function leaveShop() {
  lockPostCombat();
  state.mode = 'postCombat';
  render();
}

function enterCamp() {
  state.mode = 'camp';
  state.campChoices = [...new Set(state.player.deck)].slice(0, 12);
  render();
}

function resolveCamp() {
  lockPostCombat();
  state.mode = 'postCombat';
  render();
}

function campHeal() {
  const heal = 14;
  state.player.hp = Math.min(state.player.maxHp, state.player.hp + heal);
  addLog(`休憩してHPを${heal}回復。`);
  resolveCamp();
}

function campRemove(cardId) {
  const idx = state.player.deck.indexOf(cardId);
  if (idx >= 0) {
    state.player.deck.splice(idx, 1);
    addLog(`${cardDefs[cardId].name}をデッキから削除。`);
  }
  resolveCamp();
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
  resolveCamp();
}

function randomMapText() {
  return mapMessages[Math.floor(Math.random() * mapMessages.length)](state);
}

function prepareMap() {
  state.mapText = randomMapText();
  if (state.floor === state.maxFloor) {
    state.eliteOffer = null;
    return;
  }
  state.eliteOffer = Math.random() < 0.22 ? elitePool[Math.floor(Math.random() * elitePool.length)] : null;
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
  state.postCombatLocked = false;
  state.player.relics.forEach((r) => { if (r.onFloorAdvance) r.onFloorAdvance(state); });
  prepareMap();
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
  loaded.player.relics = (loaded.player.relics || []).map((r) => relicPool.find((x) => x.id === r.id)).filter(Boolean);
  state = { ...defaultState(), ...loaded, player: { ...defaultState().player, ...loaded.player } };
  addLog('ロードしました。');
  render();
}

function restart() {
  state = defaultState();
  prepareMap();
  addLog('新しい冒険を開始。');
  render();
}

function hpBar(current, max) {
  const ratio = Math.max(0, Math.min(100, Math.round((current / max) * 100)));
  return `<div class="hp-bar"><span style="width:${ratio}%"></span></div>`;
}

function toggleDeck() {
  state.showDeck = !state.showDeck;
  render();
}

function toggleRelics() {
  state.showRelics = !state.showRelics;
  render();
}

function renderDeckList() {
  if (!state.showDeck) return '';
  const counts = {};
  state.player.deck.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
  const lines = Object.entries(counts)
    .sort((a, b) => cardDefs[a[0]].name.localeCompare(cardDefs[b[0]].name, 'ja'))
    .map(([id, count]) => `<div class="small ${getCardRarityClass(id)}">・${getCardDisplayName(id)} x${count} - ${cardText(id)}</div>`)
    .join('');
  return `<div class="deck-view">${lines || '<div class="small">デッキなし</div>'}</div>`;
}

function renderRelicList() {
  if (!state.showRelics) return '';
  const lines = state.player.relics.map((r) => `<div class="small">・${r.name}: ${r.text}</div>`).join('');
  return `<div class="deck-view">${lines || '<div class="small">なし</div>'}</div>`;
}

function renderTopControls() {
  el.topControls.innerHTML = `
    <button id="saveBtn">セーブ</button>
    <button id="loadBtn">ロード</button>
    <button id="restartBtn">ニューゲーム</button>
  `;
  document.getElementById('saveBtn').addEventListener('click', saveGame);
  document.getElementById('loadBtn').addEventListener('click', loadGame);
  document.getElementById('restartBtn').addEventListener('click', restart);
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
    el.state.innerHTML = `
      <div class="status-grid">
        <div class="panel player-panel">
          <h3>あなた</h3>
          <p>HP ${state.player.hp} / ${state.player.maxHp}</p>
          ${hpBar(state.player.hp, state.player.maxHp)}
          <p>エナジー: ${state.player.energy} / ブロック: <span class="block">${state.player.block}</span> / 筋力: ${state.player.strength}</p>
          <p>弱体: ${state.player.weak} / 脆弱: ${state.player.vuln}</p>
        </div>
        <div class="panel enemy-panel">
          <h3>${state.enemy.name}${state.enemy.isElite ? '【エリート】' : state.enemy.isBoss ? '【ボス】' : ''}</h3>
          <p>HP ${state.enemy.hp} / ${state.enemy.maxHp}</p>
          ${hpBar(state.enemy.hp, state.enemy.maxHp)}
          <p>ブロック: <span class="block">${state.enemy.block}</span> / 筋力: ${state.enemy.strength}</p>
          <p>弱体: ${state.enemy.weak} / 脆弱: ${state.enemy.vuln}</p>
          <p>次の行動予告: <strong>${intentText(state.enemy.intent)}</strong></p>
        </div>
      </div>
    `;
    return;
  }

  if (state.mode === 'map') {
    if (state.floor === state.maxFloor) {
      el.state.innerHTML = '<h2>最終階層</h2><p>重い殺気が漂う。ボスが待っている…。</p>';
      return;
    }
    const elite = state.eliteOffer ? `<p class="small">付近で強い気配… ${state.eliteOffer.name} が待ち構えている。</p>` : '';
    el.state.innerHTML = `<h2>次の階層へ進む</h2><p>${state.mapText}</p>${elite}`;
    return;
  }

  if (state.mode === 'reward') {
    const relicPick = state.relicChoices[0];
    el.state.innerHTML = `<h2>戦利品</h2><p>カード${state.rewardTaken ? '取得済み' : 'を1枚選択'}。${relicPick ? 'エリート報酬: レリックを選択。' : ''}</p>`;
    return;
  }

  if (state.mode === 'postCombat') {
    el.state.innerHTML = `<h2>戦闘後イベント</h2><p>${state.postCombatLocked ? '準備は整った。次の階層へ進もう。' : '出現した施設を任意で利用してから次へ進めます。'}</p>`;
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
      return `<button class="card-button ${getCardRarityClass(id)}${disabled ? ' is-disabled' : ''}" ${disabled ? 'disabled' : ''} data-play="${i}">${getCardDisplayName(id)} [${c.cost}]<br><span class="small">${cardText(id)}</span></button>`;
    }).join('');
    el.actions.innerHTML = `<div class="row">${handButtons}</div><div class="row" style="margin-top:0.6rem;"><button id="endTurn">ターン終了</button></div>`;
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
    const picks = state.rewardChoices.map((id) => `<button data-reward="${id}" class="${getCardRarityClass(id)} ${state.rewardTaken ? 'is-disabled' : ''}" ${state.rewardTaken ? 'disabled' : ''}>${getCardDisplayName(id)}<br><span class="small">${cardText(id)}</span></button>`).join('');
    const relicPick = state.relicChoices[0];
    const relicButton = relicPick ? `<button id="takeRelic" class="${state.relicTaken ? 'is-disabled' : ''}" ${state.relicTaken ? 'disabled' : ''}>レリック獲得: ${relicPick.name}<br><span class="small">${relicPick.text}</span></button>` : '';
    const canProceed = state.rewardTaken && (state.relicChoices.length === 0 || state.relicTaken);
    el.actions.innerHTML = `
      <div class="row">${picks}</div>
      <div class="row" style="margin-top:0.5rem;"><button id="skipReward" class="${state.rewardTaken ? 'is-disabled' : ''}" ${state.rewardTaken ? 'disabled' : ''}>カードをスキップ</button>${relicButton}</div>
      <div class="row" style="margin-top:0.5rem;"><button id="finishReward" class="${canProceed ? '' : 'is-disabled'}" ${canProceed ? '' : 'disabled'}>報酬を受け取って進む</button></div>
    `;
    el.actions.querySelectorAll('[data-reward]').forEach((btn) => btn.addEventListener('click', () => takeReward(btn.dataset.reward)));
    document.getElementById('skipReward').addEventListener('click', skipReward);
    if (relicPick) document.getElementById('takeRelic').addEventListener('click', () => chooseRelic(relicPick.id));
    document.getElementById('finishReward').addEventListener('click', () => { if (canProceed) { state.mode = 'postCombat'; render(); } });
    return;
  }

  if (state.mode === 'postCombat') {
    const opts = state.postCombatOptions || [];
    const campDisabled = state.postCombatLocked || !opts.includes('camp');
    const shopDisabled = state.postCombatLocked || !opts.includes('shop');
    el.actions.innerHTML = `
      <div class="row">
        <button id="toCamp" class="${campDisabled ? 'is-disabled' : ''}" ${campDisabled ? 'disabled' : ''}>焚き火へ</button>
        <button id="toShop" class="${shopDisabled ? 'is-disabled' : ''}" ${shopDisabled ? 'disabled' : ''}>ショップへ</button>
        <button id="nextFloor">次の階層へ</button>
      </div>
    `;
    if (!campDisabled) document.getElementById('toCamp').addEventListener('click', enterCamp);
    if (!shopDisabled) document.getElementById('toShop').addEventListener('click', enterShop);
    document.getElementById('nextFloor').addEventListener('click', nextFloor);
    return;
  }

  if (state.mode === 'shop') {
    const list = state.shopChoices.map((c) => `<button data-buy="${c.id}" data-price="${c.price}" class="${getCardRarityClass(c.id)}">${getCardDisplayName(c.id)}<br><span class="small">${cardText(c.id)} / ${c.price}G</span></button>`).join('');
    el.actions.innerHTML = `<div class="row">${list || '<span class="small">購入候補がありません。</span>'}</div><div class="row" style="margin-top:0.6rem;"><button id="leaveShop">ショップを出る</button></div>`;
    el.actions.querySelectorAll('[data-buy]').forEach((btn) => btn.addEventListener('click', () => buyCard(btn.dataset.buy, Number(btn.dataset.price))));
    document.getElementById('leaveShop').addEventListener('click', leaveShop);
    return;
  }

  if (state.mode === 'camp') {
    const removable = state.campChoices.map((id) => `<button data-remove="${id}" class="${getCardRarityClass(id)}">削除: ${getCardDisplayName(id)}</button>`).join('');
    const upgradable = state.campChoices.filter((id) => cardDefs[id].upgradeTo).map((id) => `<button data-up="${id}" class="${getCardRarityClass(id)}">強化: ${getCardDisplayName(id)} → ${getCardDisplayName(cardDefs[id].upgradeTo)}</button>`).join('');
    el.actions.innerHTML = `<div class="row"><button id="campHeal">休憩（14回復）</button></div><p class="small">カード削除（1枚）</p><div class="row">${removable || '<span class="small">対象なし</span>'}</div><p class="small">カード強化（1枚）</p><div class="row">${upgradable || '<span class="small">対象なし</span>'}</div>`;
    document.getElementById('campHeal').addEventListener('click', campHeal);
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
  renderTopControls();
  renderHUD();
  renderState();
  renderActions();
  renderLog();
}

prepareMap();
addLog('ゲーム開始。戦闘を始めましょう。');
render();
