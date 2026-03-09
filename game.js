const VERSION = '1.04';
const STORAGE_KEY = 'mini_spire_save_v9';

const cardDefs = {
  strike: { name: 'ストライク', cost: 1, type: 'A', rarity: 'common', dmg: 6, upgradeTo: 'strike_p' },
  strike_p: { name: 'ストライク+', cost: 1, type: 'A', rarity: 'common', dmg: 9, upgraded: true },
  defend: { name: 'ディフェンド', cost: 1, type: 'S', rarity: 'common', block: 5, upgradeTo: 'defend_p' },
  defend_p: { name: 'ディフェンド+', cost: 1, type: 'S', rarity: 'common', block: 8, upgraded: true },
  bash: { name: 'バッシュ', cost: 2, type: 'A', rarity: 'common', dmg: 8, weak: 2, upgradeTo: 'bash_p' },
  bash_p: { name: 'バッシュ+', cost: 2, type: 'A', rarity: 'common', dmg: 10, weak: 3, upgraded: true },
  battleCry: { name: '鼓舞', cost: 0, type: 'P', rarity: 'common', strengthGain: 1, upgradeTo: 'battleCry_p' },
  battleCry_p: { name: '鼓舞+', cost: 0, type: 'P', rarity: 'common', strengthGain: 2, upgraded: true },
  sweep: { name: '薙ぎ払い', cost: 1, type: 'A', rarity: 'common', aoe: 4, upgradeTo: 'sweep_p' },
  sweep_p: { name: '薙ぎ払い+', cost: 1, type: 'A', rarity: 'common', aoe: 6, upgraded: true },
  flurry: { name: '連打', cost: 1, type: 'A', rarity: 'common', dmg: 2, hits: 3, upgradeTo: 'flurry_p' },
  flurry_p: { name: '連打+', cost: 1, type: 'A', rarity: 'common', dmg: 2, hits: 4, upgraded: true },
  guardAura: { name: '守護のオーラ', cost: 1, type: 'P', rarity: 'common', blockPerTurn: 2, upgradeTo: 'guardAura_p' },
  guardAura_p: { name: '守護のオーラ+', cost: 1, type: 'P', rarity: 'common', blockPerTurn: 3, upgraded: true },
  insight: { name: 'ひらめき', cost: 1, type: 'S', rarity: 'common', drawCount: 2, upgradeTo: 'insight_p' },
  insight_p: { name: 'ひらめき+', cost: 1, type: 'S', rarity: 'common', drawCount: 3, upgraded: true },
  charge: { name: 'チャージ', cost: 0, type: 'S', rarity: 'common', gainEnergy: 1, exhaust: true, upgradeTo: 'charge_p' },
  charge_p: { name: 'チャージ+', cost: 0, type: 'S', rarity: 'common', gainEnergy: 2, exhaust: true, upgraded: true },

  quick: { name: 'クイックジャブ', cost: 0, type: 'A', rarity: 'uncommon', dmg: 4, upgradeTo: 'quick_p' },
  quick_p: { name: 'クイックジャブ+', cost: 0, type: 'A', rarity: 'uncommon', dmg: 6, upgraded: true },
  ironwall: { name: '鉄壁', cost: 1, type: 'S', rarity: 'uncommon', block: 8, upgradeTo: 'ironwall_p' },
  ironwall_p: { name: '鉄壁+', cost: 1, type: 'S', rarity: 'uncommon', block: 11, upgraded: true },
  rage: { name: '激昂', cost: 1, type: 'A', rarity: 'uncommon', dmg: 5, block: 3, upgradeTo: 'rage_p' },
  rage_p: { name: '激昂+', cost: 1, type: 'A', rarity: 'uncommon', dmg: 7, block: 5, upgraded: true },
  keenMind: { name: '明鏡止水', cost: 1, type: 'P', rarity: 'uncommon', drawPerTurn: 1, upgradeTo: 'keenMind_p' },
  keenMind_p: { name: '明鏡止水+', cost: 1, type: 'P', rarity: 'uncommon', drawPerTurn: 2, upgraded: true },
  tacticalShift: { name: '戦術転換', cost: 1, type: 'S', rarity: 'uncommon', block: 5, drawCount: 2, upgradeTo: 'tacticalShift_p' },
  tacticalShift_p: { name: '戦術転換+', cost: 1, type: 'S', rarity: 'uncommon', block: 7, drawCount: 3, upgraded: true },
  ricochet: { name: '跳弾乱打', cost: 1, type: 'A', rarity: 'uncommon', randomDmg: 3, randomHits: 4, upgradeTo: 'ricochet_p' },
  ricochet_p: { name: '跳弾乱打+', cost: 1, type: 'A', rarity: 'uncommon', randomDmg: 4, randomHits: 5, upgraded: true },
  firstAid: { name: '応急手当', cost: 1, type: 'S', rarity: 'uncommon', heal: 8, exhaust: true, upgradeTo: 'firstAid_p' },
  firstAid_p: { name: '応急手当+', cost: 1, type: 'S', rarity: 'uncommon', heal: 12, exhaust: true, upgraded: true },

  uppercut: { name: 'アッパーカット', cost: 2, type: 'A', rarity: 'rare', dmg: 11, weak: 1, drain: 1, upgradeTo: 'uppercut_p' },
  uppercut_p: { name: 'アッパーカット+', cost: 2, type: 'A', rarity: 'rare', dmg: 14, weak: 2, drain: 2, upgraded: true },
  execute: { name: '処刑', cost: 2, type: 'A', rarity: 'rare', dmg: 16, upgradeTo: 'execute_p' },
  execute_p: { name: '処刑+', cost: 2, type: 'A', rarity: 'rare', dmg: 21, upgraded: true },
  bloodPact: { name: '血盟', cost: 1, type: 'P', rarity: 'rare', strengthGain: 2, weakSelf: 1, upgradeTo: 'bloodPact_p' },
  bloodPact_p: { name: '血盟+', cost: 1, type: 'P', rarity: 'rare', strengthGain: 3, upgraded: true },
  deepFocus: { name: '深層思考', cost: 1, type: 'S', rarity: 'rare', drawCount: 4, gainEnergy: 1, upgradeTo: 'deepFocus_p' },
  deepFocus_p: { name: '深層思考+', cost: 1, type: 'S', rarity: 'rare', drawCount: 5, gainEnergy: 1, upgraded: true },
  overdrive: { name: 'オーバードライブ', cost: 1, type: 'S', rarity: 'rare', gainEnergy: 2, weakSelf: 1, upgradeTo: 'overdrive_p' },
  overdrive_p: { name: 'オーバードライブ+', cost: 1, type: 'S', rarity: 'rare', gainEnergy: 3, weakSelf: 1, upgraded: true },
  phoenixSip: { name: '不死鳥の雫', cost: 2, type: 'S', rarity: 'rare', heal: 16, gainEnergy: 1, exhaust: true, upgradeTo: 'phoenixSip_p' },
  phoenixSip_p: { name: '不死鳥の雫+', cost: 2, type: 'S', rarity: 'rare', heal: 22, gainEnergy: 1, exhaust: true, upgraded: true },

  meteor: { name: 'メテオブレイク', cost: 2, type: 'A', rarity: 'legendary', dmg: 24, exhaust: true },
  bloodRitual: { name: '血の儀式', cost: 1, type: 'A', rarity: 'legendary', dmg: 18, weak: 2, exhaust: true },
  fateEngine: { name: '運命機関', cost: 2, type: 'P', rarity: 'legendary', strengthPerTurn: 1, upgradeTo: 'fateEngine_p' },
  fateEngine_p: { name: '運命機関+', cost: 2, type: 'P', rarity: 'legendary', strengthPerTurn: 2, upgraded: true },
  timeSpiral: { name: '時巡り', cost: 2, type: 'S', rarity: 'legendary', drawCount: 5, gainEnergy: 2, exhaust: true, upgradeTo: 'timeSpiral_p' },
  timeSpiral_p: { name: '時巡り+', cost: 2, type: 'S', rarity: 'legendary', drawCount: 6, gainEnergy: 2, exhaust: true, upgraded: true },
};

const itemDefs = {
  healPotion: { id: 'healPotion', rarity: 'common', name: '回復薬', desc: 'HPを18回復', combatOnly: false, use: () => { const before = state.player.hp; state.player.hp = Math.min(state.player.maxHp, state.player.hp + 18); addLog(`回復薬: HP ${before}→${state.player.hp}`); } },
  bombPotion: { id: 'bombPotion', rarity: 'uncommon', name: '火炎壺', desc: '敵全体に15ダメージ', combatOnly: true, use: () => { aliveEnemies().forEach((e) => damage(e, 15)); addLog('火炎壺: 敵全体に15ダメージ。'); } },
  fortPotion: { id: 'fortPotion', rarity: 'common', name: '防護札', desc: '戦闘中のみ: 15ブロックを得る', combatOnly: true, use: () => { gainBlock(state.player, 15); addLog('防護札: 15ブロック。'); } },
  furyPotion: { id: 'furyPotion', rarity: 'rare', name: '戦神の香', desc: '筋力+2（戦闘中）', combatOnly: true, use: () => { state.player.strengthCombat += 2; addLog('戦神の香: 筋力+2。'); } },
  weakenPotion: { id: 'weakenPotion', rarity: 'common', name: '呪縛の粉', desc: '対象に弱体2', combatOnly: true, use: () => { const t = currentTarget(); if (t) { t.weak += 2; addLog(`${t.name}に弱体2。`); } } },
  drawPotion: { id: 'drawPotion', rarity: 'uncommon', name: '戦術の巻物', desc: 'カードを2枚引く', combatOnly: true, use: () => { draw(2); addLog('戦術の巻物: 2枚ドロー。'); } },
  smokeBomb: { id: 'smokeBomb', rarity: 'rare', name: '煙幕玉', desc: '敵全体に脱力2', combatOnly: true, use: () => { aliveEnemies().forEach((e) => { e.drain += 2; }); addLog('煙幕玉: 敵全体に脱力2。'); } },
  coinCharm: { id: 'coinCharm', rarity: 'legendary', name: '金貨のお守り', desc: '25Gを得る', combatOnly: false, use: () => { state.gold += 25; addLog('金貨のお守り: 25Gを得た。'); } },
};

const normalEnemyPool = [
  { name: 'シラミ', danger: 1, hp: 12, gold: 7, intents: [{ type: 'attack', value: 3 }, { type: 'attack', value: 4 }] },
  { name: 'ゴブリン', danger: 2, hp: 16, gold: 10, intents: [{ type: 'attack', value: 4 }, { type: 'block', block: 4 }] },
  { name: 'カルト教団員', danger: 2, hp: 18, gold: 11, intents: [{ type: 'attack', value: 5 }, { type: 'buff', value: 1 }] },
  { name: 'ジョーウォーム', danger: 3, hp: 24, gold: 15, intents: [{ type: 'attack', value: 6 }, { type: 'attackBlock', value: 4, block: 4 }] },
  { name: '番兵', danger: 4, hp: 30, gold: 19, intents: [{ type: 'attack', value: 7 }, { type: 'block', block: 7 }, { type: 'weaken', weak: 1 }] },
  { name: '漆黒の騎士', danger: 6, hp: 48, gold: 28, intents: [{ type: 'attack', value: 10 }, { type: 'attackBlock', value: 8, block: 8 }, { type: 'buff', value: 2 }] },
  { name: '深淵の処刑人', danger: 8, hp: 70, gold: 40, intents: [{ type: 'attack', value: 14 }, { type: 'weakenAttack', weak: 2, value: 10 }, { type: 'buff', value: 2 }] },
];

const elitePool = [
  { name: 'エリート・ラガヴーリン', hp: 72, gold: 65, isElite: true, intents: [{ type: 'attack', value: 14 }, { type: 'attackBlock', value: 10, block: 10 }, { type: 'buff', value: 2 }] },
  { name: 'エリート・グレムリンノブ', hp: 80, gold: 70, isElite: true, intents: [{ type: 'attack', value: 15 }, { type: 'weakenAttack', weak: 2, value: 11 }, { type: 'buff', value: 2 }] },
];
const bossPool = [{ name: 'ボス・覚醒者', hp: 150, gold: 0, isBoss: true, intents: [{ type: 'attack', value: 18 }, { type: 'attackBlock', value: 12, block: 14 }, { type: 'buff', value: 3 }, { type: 'weakenAttack', weak: 2, value: 14 }] }];

const relicPool = [
  { id: 'whetstone', name: '砥石', rarity: 'common', text: '戦闘開始時に8ブロック', onCombatStart: () => gainBlock(state.player, 8) },
  { id: 'horn', name: '角笛', rarity: 'uncommon', text: '各ターン開始時に2ブロック', applyStartTurn: () => gainBlock(state.player, 2) },
  { id: 'heart', name: '赤いハート', rarity: 'rare', text: '最大HP+10、即時10回復', onGain: () => { state.player.maxHp += 10; state.player.hp = Math.min(state.player.maxHp, state.player.hp + 10); } },
  { id: 'ruby', name: '紅蓮のルビー', rarity: 'rare', text: '与ダメージ+2。戦闘開始時に筋力+2', onDealDamageBonus: 2, onCombatStart: () => { state.player.strengthCombat += 2; addLog('紅蓮のルビー: 戦闘開始時に筋力+2'); } },
  { id: 'mirror', name: '鏡面の欠片', rarity: 'legendary', text: '筋力+1（永続）', onGain: () => { state.player.strengthBase += 1; } },
  { id: 'belt', name: '冒険者のベルト', rarity: 'uncommon', text: 'アイテム所持枠+2（最大7）', onGain: () => { state.player.itemSlots = Math.min(state.player.maxItemSlots, state.player.itemSlots + 2); } },
];

const mapTexts = [
  '次の敵を探して進む。',
  '暗い通路の先に、何かの気配を感じる。',
  '靴音が反響する。戦いはすぐそこだ。',
  '湿った空気が肺を刺す。慎重に進む。',
  '遠くで金属音が鳴る。誰かが待ち構えている。',
  '崩れた柱の影を縫って、先へ進んだ。',
  '静寂が不気味だ。次の一手を探る。',
];

const rewardCards = Object.keys(cardDefs);
const shopCards = Object.keys(cardDefs).filter((k) => !cardDefs[k].upgraded);

const defaultState = () => ({
  floor: 1, maxFloor: 10, gold: 120, mode: 'map', mapText: mapTexts[0], nextNode: 'combat', eventState: null, turn: 0,
  rewardTaken: false, relicTaken: false, rewardChoices: [], shopChoices: [], shopItemChoices: [], relicChoices: [], campChoices: [],
  postCombatLocked: false, eliteOffer: null, showDeck: false, showRelics: false, selectedTarget: 0, screenHidden: false, blessingChoices: [],
  items: ['healPotion', 'bombPotion'],
  player: {
    maxHp: 70, hp: 70, block: 0, energy: 3,
    strengthBase: 0, strengthCombat: 0, weak: 0, vuln: 0, drain: 0,
    deck: ['strike', 'strike', 'strike', 'defend', 'defend', 'bash', 'battleCry', 'sweep', 'flurry', 'quick'],
    itemSlots: 3, maxItemSlots: 7,
    draw: [], hand: [], discard: [], relics: [], powers: { blockPerTurn: 0, drawPerTurn: 0, strengthPerTurn: 0 },
  },
  enemies: [], playerDamageFlashUntil: 0, log: [],
});

let state = defaultState();
const el = { topControls: document.getElementById('topControls'), hud: document.getElementById('hud'), state: document.getElementById('state'), actions: document.getElementById('actions'), log: document.getElementById('log') };

const addLog = (t, cls = '') => { state.log.unshift({ text: t, cls }); state.log = state.log.slice(0, 80); };
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const aliveEnemies = () => state.enemies.filter((e) => e.hp > 0);
const currentTarget = () => state.enemies[state.selectedTarget]?.hp > 0 ? state.enemies[state.selectedTarget] : aliveEnemies()[0];
const playerStrength = () => state.player.strengthBase + state.player.strengthCombat;
const relicDamageBonus = () => state.player.relics.reduce((s, r) => s + (r.onDealDamageBonus || 0), 0);
const applyDrain = (a, u) => (u.drain > 0 ? Math.floor(a * 0.75) : a);
const calcPlayerDamage = (b) => Math.max(0, applyDrain(b + playerStrength() + relicDamageBonus(), state.player));
const calcEnemyAttack = (e, b) => Math.max(0, applyDrain(b + (e.strength || 0), e));
const getCardRarityClass = (id) => `rarity-${cardDefs[id].rarity || 'common'}`;
const getRelicRarityClass = (r) => `rarity-${r.rarity || 'common'}`;
const getItemRarityClass = (id) => `rarity-${itemDefs[id]?.rarity || 'common'}`;
const hpClass = (cur, max) => (cur / max <= 0.25 ? 'hp-critical' : cur / max <= 0.5 ? 'hp-caution' : '');
const cardLabel = (id) => `<span class="${cardDefs[id].upgraded ? 'upgraded' : ''}">${cardDefs[id].type}.${cardDefs[id].name}【${cardDefs[id].cost}】</span>`;

function cardEffectText(id) {
  const c = cardDefs[id]; const p = [];
  if (c.dmg) p.push(`敵に${calcPlayerDamage(c.dmg)}ダメージ${c.hits ? ` x${c.hits}` : ''}`);
  if (c.randomDmg) p.push(`ランダムな敵に${calcPlayerDamage(c.randomDmg)}ダメージ x${c.randomHits}`);
  if (c.aoe) p.push(`敵全体に${calcPlayerDamage(c.aoe)}ダメージ`);
  if (c.block) p.push(`自分に${c.block}ブロック`);
  if (c.heal) p.push(`HPを${c.heal}回復`);
  if (c.drawCount) p.push(`${c.drawCount}枚ドロー`);
  if (c.gainEnergy) p.push(`エナジー+${c.gainEnergy}`);
  if (c.weak) p.push(`弱体${c.weak}`);
  if (c.drain) p.push(`脱力${c.drain}`);
  if (c.strengthGain) p.push(`筋力+${c.strengthGain}`);
  if (c.blockPerTurn) p.push(`毎ターン${c.blockPerTurn}ブロック`);
  if (c.drawPerTurn) p.push(`毎ターン${c.drawPerTurn}ドロー`);
  if (c.strengthPerTurn) p.push(`毎ターン筋力+${c.strengthPerTurn}`);
  if (c.exhaust) p.push('廃棄');
  return p.join(' / ');
}

function gainBlock(u, v) { const a = u.vuln > 0 ? Math.max(0, Math.floor(v * 0.75)) : v; u.block += a; addLog(`${u === state.player ? 'あなた' : u.name}は${a}ブロックを得た。`); }
function damage(u, a) { const amp = u.weak > 0 ? Math.ceil(a * 1.5) : a; const dealt = Math.max(0, amp - u.block); u.block = Math.max(0, u.block - amp); u.hp -= dealt; if (dealt > 0) { const until = Date.now() + 280; if (u === state.player) state.playerDamageFlashUntil = until; else u.damageFlashUntil = until; } return dealt; }
function draw(n = 1) { for (let i = 0; i < n; i += 1) { if (state.player.draw.length === 0) { state.player.draw = shuffle(state.player.discard); state.player.discard = []; } const c = state.player.draw.shift(); if (c) state.player.hand.push(c); } }
function chooseEnemyIntent(e) { e.intent = { ...e.intents[Math.floor(Math.random() * e.intents.length)] }; }

function intentText(e) {
  const i = e.intent; if (!i) return '-';
  if (i.type === 'attack') return `攻撃 ${calcEnemyAttack(e, i.value)}`;
  if (i.type === 'block') return `防御 ${i.block}`;
  if (i.type === 'buff') return `強化 筋力+${i.value}`;
  if (i.type === 'attackBlock') return `攻撃 ${calcEnemyAttack(e, i.value)} + 防御 ${i.block}`;
  if (i.type === 'weaken') return `弱体付与 ${i.weak}`;
  if (i.type === 'weakenAttack') return `攻撃 ${calcEnemyAttack(e, i.value)} + 弱体${i.weak}`;
  return '???';
}

function spawnNormalGroup() {
  const targetDanger = 5 + Math.floor(Math.random() * 6);
  let sum = 0; const group = [];
  while (sum <= targetDanger && group.length < 6) {
    const seed = normalEnemyPool[Math.floor(Math.random() * normalEnemyPool.length)];
    group.push({ ...seed, maxHp: seed.hp, hp: seed.hp, block: 0, weak: 0, vuln: 0, drain: 0, strength: 0, intent: null, damageFlashUntil: 0 });
    sum += seed.danger;
  }
  addLog(`この戦闘の危険度: 目標${targetDanger} / 実値${sum}`);
  return group;
}

function startCombat(encounter = null) {
  state.enemies = encounter?.isBoss || encounter?.isElite
    ? [{ ...encounter, maxHp: encounter.hp, block: 0, weak: 0, vuln: 0, drain: 0, strength: 0, intent: null, danger: encounter.isElite ? 9 : 10, damageFlashUntil: 0 }]
    : spawnNormalGroup();
  state.selectedTarget = 0;
  state.mode = 'combat';
  state.turn = 1;
  Object.assign(state.player, { block: 0, energy: 3, strengthCombat: 0, weak: 0, vuln: 0, drain: 0, draw: shuffle(state.player.deck), hand: [], discard: [] });
  draw(5);
  state.enemies.forEach(chooseEnemyIntent);
  state.player.relics.forEach((r) => { if (r.onCombatStart) r.onCombatStart(); });
  state.player.relics.forEach((r) => { if (r.applyStartTurn) r.applyStartTurn(); });
  addLog(`戦闘開始: ${state.enemies.map((e) => e.name).join(' / ')}`);
  render();
}

function applyPowerOnPlay(c) {
  if (c.blockPerTurn) state.player.powers.blockPerTurn += c.blockPerTurn;
  if (c.drawPerTurn) state.player.powers.drawPerTurn += c.drawPerTurn;
  if (c.strengthPerTurn) state.player.powers.strengthPerTurn += c.strengthPerTurn;
  if (c.weakSelf) state.player.weak += c.weakSelf;
}

function playCard(index) {
  const id = state.player.hand[index]; const c = cardDefs[id]; if (!c || c.cost > state.player.energy) return;
  const target = currentTarget();
  state.player.energy -= c.cost;
  state.player.hand.splice(index, 1);
  if (!(c.exhaust || c.type === 'P')) state.player.discard.push(id);

  if (c.dmg && target) { const hits = c.hits || 1; let total = 0; for (let i = 0; i < hits; i += 1) { if (target.hp <= 0) break; total += damage(target, calcPlayerDamage(c.dmg)); } addLog(`${c.name}で${target.name}に${total}ダメージ。`); }
  if (c.randomDmg) {
    let total = 0;
    for (let i = 0; i < c.randomHits; i += 1) {
      const list = aliveEnemies();
      if (list.length === 0) break;
      const pick = list[Math.floor(Math.random() * list.length)];
      total += damage(pick, calcPlayerDamage(c.randomDmg));
    }
    addLog(`${c.name}でランダム攻撃、合計${total}ダメージ。`);
  }
  if (c.aoe) { aliveEnemies().forEach((e) => damage(e, calcPlayerDamage(c.aoe))); addLog(`${c.name}で敵全体を攻撃。`); }
  if (c.block) gainBlock(state.player, c.block);
  if (c.heal) { const before = state.player.hp; state.player.hp = Math.min(state.player.maxHp, state.player.hp + c.heal); addLog(`${c.name}でHP ${before}→${state.player.hp}`); }
  if (c.drawCount) { draw(c.drawCount); addLog(`${c.name}で${c.drawCount}枚ドロー。`); }
  if (c.gainEnergy) { state.player.energy += c.gainEnergy; addLog(`${c.name}でエナジー+${c.gainEnergy}。`); }
  if (c.weak && target) { target.weak += c.weak; addLog(`${target.name}に弱体${c.weak}。`); }
  if (c.drain && target) { target.drain += c.drain; addLog(`${target.name}に脱力${c.drain}。`); }
  if (c.strengthGain) { state.player.strengthCombat += c.strengthGain; addLog(`筋力が${c.strengthGain}上昇。`); }
  if (c.type === 'P') { applyPowerOnPlay(c); addLog(`パワー発動: ${c.name}（この戦闘では廃棄）`); }

  if (aliveEnemies().length === 0) { victory(); return; }
  render();
}

function doEnemyTurn() {
  state.enemies.forEach((e) => {
    if (e.hp <= 0) return;
    const i = e.intent;
    e.block = 0;
    if (i.type === 'attack' || i.type === 'attackBlock' || i.type === 'weakenAttack') { const dealt = damage(state.player, calcEnemyAttack(e, i.value)); addLog(`${e.name}の攻撃で${dealt}ダメージ。`); }
    if (i.type === 'block' || i.type === 'attackBlock') gainBlock(e, i.block);
    if (i.type === 'buff') { e.strength += i.value; addLog(`${e.name}の筋力が上昇。`); }
    if (i.type === 'weaken' || i.type === 'weakenAttack') { state.player.weak += i.weak; addLog(`あなたは弱体${i.weak}。`); }
  });
}

function tickDebuffs(u) { u.weak = Math.max(0, u.weak - 1); u.vuln = Math.max(0, u.vuln - 1); u.drain = Math.max(0, u.drain - 1); }

function startPlayerTurn() {
  state.turn += 1;
  state.player.block = 0;
  state.player.energy = 3;
  if (state.player.powers.blockPerTurn > 0) gainBlock(state.player, state.player.powers.blockPerTurn);
  if (state.player.powers.strengthPerTurn > 0) { state.player.strengthCombat += state.player.powers.strengthPerTurn; addLog(`パワー効果: 筋力+${state.player.powers.strengthPerTurn}`); }
  draw(5 + state.player.powers.drawPerTurn);
  state.enemies.forEach((e) => { if (e.hp > 0) chooseEnemyIntent(e); });
  state.player.relics.forEach((r) => { if (r.applyStartTurn) r.applyStartTurn(); });
}

function endTurn() { state.player.hand.forEach((c) => state.player.discard.push(c)); state.player.hand = []; tickDebuffs(state.player); state.enemies.forEach(tickDebuffs); doEnemyTurn(); if (state.player.hp <= 0) { state.mode = 'dead'; render(); return; } startPlayerTurn(); render(); }

function availableRelics() { const owned = new Set(state.player.relics.map((r) => r.id)); return relicPool.filter((r) => !owned.has(r.id)); }
function pickRewardChoices(elite = false) { const common = rewardCards.filter((id) => cardDefs[id].rarity === 'common'); const high = rewardCards.filter((id) => cardDefs[id].rarity !== 'common'); return shuffle(elite ? [...shuffle(high).slice(0, 9), ...shuffle(common).slice(0, 1)] : rewardCards).slice(0, 3); }

function maybeDropItem() {
  if (Math.random() >= 0.3 || state.items.length >= state.player.itemSlots) return;
  const keys = Object.keys(itemDefs);
  const drop = keys[Math.floor(Math.random() * keys.length)];
  state.items.push(drop);
  addLog(`アイテムドロップ: ${itemDefs[drop].name}`, `log-glow-${itemDefs[drop].rarity || 'common'}`);
}

function victory() {
  if (state.enemies.some((e) => e.isBoss)) { state.mode = 'win'; addLog('ボスを撃破！'); render(); return; }
  const elite = state.enemies.some((e) => e.isElite);
  const earned = state.enemies.reduce((sum, e) => sum + (e.gold || 0), 0);
  state.gold += earned;
  addLog(`戦闘報酬: ${earned}G`, 'log-glow-gold');
  maybeDropItem();
  state.mode = 'reward';
  state.rewardTaken = false;
  state.relicTaken = !elite;
  state.rewardChoices = pickRewardChoices(elite);
  state.relicChoices = elite ? shuffle(availableRelics()).slice(0, 1) : [];
  state.postCombatLocked = false;
  render();
}

function takeReward(id) { if (!state.rewardTaken) { state.player.deck.push(id); state.rewardTaken = true; addLog(`${cardDefs[id].name}を入手。`); } render(); }
function chooseRelic(id) { const r = relicPool.find((x) => x.id === id); if (!r) return; state.player.relics.push(r); if (r.onGain) r.onGain(); state.relicTaken = true; state.relicChoices = []; addLog(`${r.name}を獲得。`); render(); }

function useItemAt(index) {
  const key = state.items[index];
  const p = itemDefs[key];
  if (!p) return;
  if (p.combatOnly && state.mode !== 'combat') return;
  p.use();
  state.items.splice(index, 1);
  if (state.mode === 'combat' && aliveEnemies().length === 0) { victory(); return; }
  render();
}

function enterShop() {
  state.mode = 'shop';
  state.shopChoices = shuffle(shopCards).slice(0, 5).map((id) => ({ id, price: 45 + cardDefs[id].cost * 15 + ({ uncommon: 20, rare: 55, legendary: 100 }[cardDefs[id].rarity] || 0) }));
  state.shopItemChoices = shuffle(Object.keys(itemDefs)).slice(0, 3).map((id) => ({ id, price: 35 }));
  render();
}

function buyCard(id, price) { if (state.gold < price) return; state.gold -= price; state.player.deck.push(id); addLog(`${cardDefs[id].name}を購入。`); state.shopChoices = state.shopChoices.filter((c) => c.id !== id); render(); }
function buyItem(id, price) { if (state.gold < price || state.items.length >= state.player.itemSlots) return; state.gold -= price; state.items.push(id); addLog(`${itemDefs[id].name}を購入。`); state.shopItemChoices = state.shopItemChoices.filter((p) => p.id !== id); render(); }
function leaveShop() { state.postCombatLocked = true; state.mode = 'postCombat'; render(); }

function enterCamp() { state.mode = 'camp'; state.campChoices = [...new Set(state.player.deck)].slice(0, 12); render(); }
function resolveCamp() { state.postCombatLocked = true; state.mode = 'postCombat'; render(); }
function campHeal() { state.player.hp = Math.min(state.player.maxHp, state.player.hp + 14); addLog('焚き火で回復。'); resolveCamp(); }
function campRemove(id) { const i = state.player.deck.indexOf(id); if (i >= 0) state.player.deck.splice(i, 1); addLog(`${cardDefs[id].name}を削除。`); resolveCamp(); }
function campUpgrade(id) { const up = cardDefs[id].upgradeTo; if (!up) return; const i = state.player.deck.indexOf(id); if (i >= 0) state.player.deck[i] = up; addLog(`${cardDefs[id].name}を強化。`); resolveCamp(); }

function openEvent() {
  const roll = Math.random();
  if (roll < 0.17) state.eventState = { key: 'chest', title: '忘れられた宝箱', text: '苔むした宝箱が、ぽつんと置かれている。長い年月、誰にも開けられていないようだ。', resolved: false };
  else if (roll < 0.34) state.eventState = { key: 'fountain', title: '回復の泉', text: '澄んだ泉が湧いている。身を清めるか、力を求めるか。', resolved: false };
  else if (roll < 0.51) state.eventState = { key: 'altar', title: '血の祭壇', text: '不気味な祭壇が脈打っている。血を捧げれば金を得られそうだ。', resolved: false };
  else if (roll < 0.67) state.eventState = { key: 'merchant', title: '行商人の落とし物', text: '破れた荷袋を見つけた。中には金貨と見慣れない瓶。', resolved: false };
  else if (roll < 0.84) state.eventState = { key: 'idol', title: '古びた偶像', text: '古代の偶像があなたを見つめている。触れるべきか？', resolved: false };
  else state.eventState = { key: 'library', title: '静寂の書庫', text: '崩れかけの書庫に、まだ読める戦術書が残っている。', resolved: false };
  state.mode = 'event';
  render();
}

function resolveEvent(action) {
  const ev = state.eventState;
  if (!ev || ev.resolved) return;

  if (ev.key === 'chest') {
    if (action === 'open') {
      const r = availableRelics().find((x) => x.rarity === 'common');
      ev.result = r ? `宝箱を開け、${r.name}を得た。` : '宝箱は空だった。';
      if (r) { state.player.relics.push(r); if (r.onGain) r.onGain(); }
    } else ev.result = '宝箱を見送り、先へ進む。';
  }

  if (ev.key === 'fountain') {
    if (action === 'heal') { const heal = Math.ceil(state.player.maxHp * 0.2); state.player.hp = Math.min(state.player.maxHp, state.player.hp + heal); ev.result = `泉で癒やされ、HPを${heal}回復した。`; }
    else { const inc = Math.ceil(state.player.maxHp * 0.1); state.player.maxHp += inc; state.player.hp += inc; ev.result = `泉の力で最大HPが${inc}上昇した。`; }
  }

  if (ev.key === 'altar') {
    if (action === 'offer') { const lose = Math.ceil(state.player.maxHp * 0.12); const gain = 45; state.player.hp = Math.max(1, state.player.hp - lose); state.gold += gain; ev.result = `血を捧げ、HP${lose}を失う代わりに${gain}Gを得た。`; }
    else ev.result = '祭壇には触れずに立ち去った。';
  }

  if (ev.key === 'merchant') {
    if (action === 'take') { state.gold += 35; if (state.items.length < state.player.itemSlots) state.items.push('fortPotion'); ev.result = '荷袋から35Gと防護札を得た。'; }
    else ev.result = '荷袋には触れず、静かに去った。';
  }

  if (ev.key === 'idol') {
    if (action === 'touch') { state.player.drain += 2; state.gold += 60; ev.result = '偶像の呪いで脱力2を受けたが、60Gを得た。'; }
    else ev.result = 'あなたは偶像を無視した。';
  }

  if (ev.key === 'library') {
    if (action === 'study') {
      const pool = rewardCards.filter((id) => cardDefs[id].rarity === 'uncommon' || cardDefs[id].rarity === 'rare');
      const pick = pool[Math.floor(Math.random() * pool.length)];
      state.player.deck.push(pick);
      ev.result = `書庫で${cardDefs[pick].name}を習得した。`;
    } else ev.result = '書庫を後にした。';
  }

  ev.resolved = true;
  addLog(`イベント: ${ev.result}`);
  render();
}


function blessingChoices() {
  return [
    { id: 'maxhp', text: '最大HP+8', apply: () => { state.player.maxHp += 8; state.player.hp += 8; } },
    { id: 'gold', text: '100G獲得', apply: () => { state.gold += 100; } },
    { id: 'card', text: 'レアカード1枚獲得', apply: () => { const pool = rewardCards.filter((id) => cardDefs[id].rarity === 'rare'); const c = pool[Math.floor(Math.random() * pool.length)]; state.player.deck.push(c); addLog(`祝福で${cardDefs[c].name}を獲得。`); } },
    { id: 'relic', text: 'ランダムレリック1個獲得', apply: () => { const r = shuffle(availableRelics())[0]; if (r) { state.player.relics.push(r); if (r.onGain) r.onGain(); addLog(`祝福で${r.name}を獲得。`); } } },
    { id: 'heal', text: 'HPを全回復', apply: () => { state.player.hp = state.player.maxHp; } },
  ];
}
function startBlessing() {
  state.mode = 'blessing';
  state.blessingChoices = shuffle(blessingChoices()).slice(0, 3);
}
function chooseBlessing(id) {
  const pick = state.blessingChoices.find((b) => b.id === id);
  if (!pick) return;
  pick.apply();
  addLog(`祝福を受け取った: ${pick.text}`);
  state.blessingChoices = [];
  state.mode = 'map';
  render();
}

function prepareMap() {
  state.mapText = mapTexts[Math.floor(Math.random() * mapTexts.length)];
  state.nextNode = Math.random() < 0.72 ? 'combat' : 'event';
  state.eliteOffer = state.floor === state.maxFloor || state.nextNode !== 'combat' ? null : (Math.random() < 0.22 ? elitePool[Math.floor(Math.random() * elitePool.length)] : null);
}

function nextFloor() { state.floor += 1; if (state.floor > state.maxFloor) { state.mode = 'win'; render(); return; } state.mode = 'map'; state.eventState = null; state.enemies = []; state.postCombatLocked = false; prepareMap(); render(); }
function saveGame() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); addLog('セーブした。'); }
function loadGame() { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return; const loaded = JSON.parse(raw); loaded.player.relics = (loaded.player.relics || []).map((r) => relicPool.find((x) => x.id === r.id)).filter(Boolean); state = { ...defaultState(), ...loaded, player: { ...defaultState().player, ...loaded.player } }; document.body.classList.toggle('screen-hidden', !!state.screenHidden); addLog('ロードした。'); render(); }
function restart() { state = defaultState(); document.body.classList.remove('screen-hidden'); prepareMap(); startBlessing(); addLog('ニューゲーム開始。'); render(); }
function toggleScreenMask() { state.screenHidden = !state.screenHidden; document.body.classList.toggle('screen-hidden', state.screenHidden); renderTopControls(); }
function toggleDeck() { state.showDeck = !state.showDeck; render(); }
function toggleRelics() { state.showRelics = !state.showRelics; render(); }
function setTarget(i) { state.selectedTarget = i; render(); }

function renderDeckList() { if (!state.showDeck) return ''; const counts = {}; state.player.deck.forEach((id) => { counts[id] = (counts[id] || 0) + 1; }); return `<div class="deck-view">${Object.entries(counts).map(([id, n]) => `<div class="small ${getCardRarityClass(id)}">・${cardLabel(id)} x${n} - ${cardEffectText(id)}</div>`).join('')}</div>`; }
function renderRelicList() { return state.showRelics ? `<div class="deck-view">${state.player.relics.map((r) => `<div class="small ${getRelicRarityClass(r)}">・${r.name}: ${r.text}</div>`).join('') || '<div class="small">なし</div>'}</div>` : ''; }
function statusLine(s, w, v, d) { const b = []; if (s > 0) b.push(`筋力:${s}`); if (w > 0) b.push(`弱体:${w}`); if (v > 0) b.push(`脆弱:${v}`); if (d > 0) b.push(`脱力:${d}`); return b.length ? `<p>${b.join(' / ')}</p>` : ''; }
function hpBar(cur, max) { return `<div class="hp-bar"><span style="width:${Math.round((cur / max) * 100)}%"></span></div>`; }

function renderTopControls() { const h1 = document.querySelector('header h1'); if (h1) h1.innerHTML = `Mini Spire <span class="version">Ver${VERSION}</span>`; el.topControls.innerHTML = `<button id="saveBtn">セーブ</button><button id="screenBtn">${state.screenHidden ? 'スクリーン解除' : 'スクリーン'}</button><button id="loadBtn">ロード</button><button id="restartBtn">ニューゲーム</button>`; document.getElementById('saveBtn').addEventListener('click', saveGame); document.getElementById('screenBtn').addEventListener('click', toggleScreenMask); document.getElementById('loadBtn').addEventListener('click', loadGame); document.getElementById('restartBtn').addEventListener('click', restart); }

function renderHUD() {
  const slots = Array.from({ length: state.player.itemSlots }, (_, i) => state.items[i] || null);
  el.hud.innerHTML = `<div class="grid hud-grid-5"><div class="stat">HP: ${state.player.hp} / ${state.player.maxHp}</div><div class="stat">階層: ${state.floor} / ${state.maxFloor}</div><div class="stat">所持金: ${state.gold}G</div><button class="stat deck-btn" id="deckBtn">デッキ: ${state.player.deck.length}枚</button><button class="stat deck-btn" id="relicBtn">所持レリック一覧</button></div><div class="small">アイテム: ${state.items.length} / ${state.player.itemSlots}</div><div class="row" style="margin-top:0.5rem;">${slots.map((id, idx) => { if (!id) return '<button class="is-disabled" disabled>空スロット</button>'; const p = itemDefs[id]; const en = !p.combatOnly || state.mode === 'combat'; return `<button data-item-index="${idx}" class="${en ? '' : 'is-disabled'}" ${en ? '' : 'disabled'} title="${p.desc}">${p.name}</button>`; }).join('')}</div>${renderDeckList()}${renderRelicList()}`;
  document.getElementById('deckBtn').addEventListener('click', toggleDeck);
  document.getElementById('relicBtn').addEventListener('click', toggleRelics);
  el.hud.querySelectorAll('[data-item-index]').forEach((btn) => btn.addEventListener('click', () => useItemAt(Number(btn.dataset.itemIndex))));
}

function renderState() {
  if (state.mode === 'combat') {
    const enemiesHtml = state.enemies.map((e, i) => `<button data-tip="危険度:${e.danger || (e.isElite ? 9 : 10)} / 報酬:${e.gold || 0}G" class="panel enemy-panel enemy-card ${Date.now() < (e.damageFlashUntil || 0) ? 'damage-flash' : ''} ${currentTarget() === e ? 'selected-target' : ''} ${e.hp <= 0 ? 'is-disabled' : ''}" data-target="${i}" ${e.hp <= 0 ? 'disabled' : ''}><h3>${e.name}${e.isElite ? '【エリート】' : e.isBoss ? '【ボス】' : ''}</h3><p class="${hpClass(Math.max(0, e.hp), e.maxHp)}">HP ${Math.max(0, e.hp)} / ${e.maxHp}</p>${hpBar(Math.max(0, e.hp), e.maxHp)}<p>ブロック: <span class="block">${e.block}</span></p>${statusLine(e.strength || 0, e.weak || 0, e.vuln || 0, e.drain || 0)}<p>行動予告: <strong>${e.hp > 0 ? intentText(e) : '撃破済み'}</strong></p></button>`).join('');
    el.state.innerHTML = `<div class="status-grid"><div class="panel player-panel ${Date.now() < state.playerDamageFlashUntil ? 'damage-flash' : ''}"><h3>あなた</h3><p class="${hpClass(state.player.hp, state.player.maxHp)}">HP ${state.player.hp} / ${state.player.maxHp}</p>${hpBar(state.player.hp, state.player.maxHp)}<p>エナジー: ${state.player.energy} / ブロック: <span class="block">${state.player.block}</span></p>${statusLine(playerStrength(), state.player.weak, state.player.vuln, state.player.drain)}</div></div><div class="enemy-grid">${enemiesHtml}</div>`;
    document.querySelectorAll('[data-target]').forEach((b) => b.addEventListener('click', () => setTarget(Number(b.dataset.target))));
    return;
  }
  if (state.mode === 'blessing') { el.state.innerHTML = '<h2>祝福</h2><p>冒険の始まりに、3つの祝福から1つ選んでください。</p>'; return; }
  if (state.mode === 'event') { const ev = state.eventState; el.state.innerHTML = ev ? `<h2>${ev.title}</h2><p>${ev.text}</p>${ev.resolved ? `<p>${ev.result}</p>` : ''}` : '<h2>イベント</h2>'; return; }
  if (state.mode === 'map') { if (state.floor === state.maxFloor) { el.state.innerHTML = '<h2>最終階層</h2><p>重い殺気が漂う。ボスが待っている…。</p>'; return; } el.state.innerHTML = `<h2>次の階層へ進む</h2><p>${state.nextNode === 'event' ? '不思議な気配が漂っている。' : (state.eliteOffer ? '強い気配を感じる。' : state.mapText)}</p>`; return; }
  if (state.mode === 'reward') { el.state.innerHTML = '<h2>戦利品</h2><p>報酬を選択。</p>'; return; }
  if (state.mode === 'postCombat') { el.state.innerHTML = `<h2>戦闘後イベント</h2><p>${state.postCombatLocked ? '次の階層へ進もう。' : '焚火かショップを1つ選べる。'}</p>`; return; }
  if (state.mode === 'shop') { el.state.innerHTML = '<h2>ショップ</h2>'; return; }
  if (state.mode === 'camp') { el.state.innerHTML = '<h2>焚き火</h2>'; return; }
  if (state.mode === 'win') { el.state.innerHTML = '<h2>踏破成功！</h2>'; return; }
  if (state.mode === 'dead') { el.state.innerHTML = '<h2>ゲームオーバー</h2>'; }
}

function renderActions() {
  if (state.mode === 'combat') {
    el.actions.innerHTML = `<div class="row">${state.player.hand.map((id, i) => `<button class="card-button ${getCardRarityClass(id)}${cardDefs[id].cost > state.player.energy ? ' is-disabled' : ''}" ${cardDefs[id].cost > state.player.energy ? 'disabled' : ''} data-play="${i}">${cardLabel(id)}<br><span class="small">${cardEffectText(id)}</span></button>`).join('')}</div><div class="row" style="margin-top:0.6rem;"><button id="endTurn">ターン終了</button></div>`;
    el.actions.querySelectorAll('[data-play]').forEach((b) => b.addEventListener('click', () => playCard(Number(b.dataset.play))));
    document.getElementById('endTurn').addEventListener('click', endTurn);
    return;
  }

  if (state.mode === 'event') {
    const ev = state.eventState;
    if (!ev) { el.actions.innerHTML = ''; return; }
    if (ev.resolved) { el.actions.innerHTML = '<button id="nextFloor">次の階層へ</button>'; document.getElementById('nextFloor').addEventListener('click', nextFloor); return; }
    if (ev.key === 'chest') { el.actions.innerHTML = '<button id="evOpen">開ける</button><button id="evLeave">開けない</button>'; document.getElementById('evOpen').addEventListener('click', () => resolveEvent('open')); document.getElementById('evLeave').addEventListener('click', () => resolveEvent('leave')); return; }
    if (ev.key === 'fountain') { el.actions.innerHTML = '<button id="evHeal">HPを20%回復</button><button id="evMax">最大HP10%アップ</button>'; document.getElementById('evHeal').addEventListener('click', () => resolveEvent('heal')); document.getElementById('evMax').addEventListener('click', () => resolveEvent('max')); return; }
    if (ev.key === 'altar') { el.actions.innerHTML = '<button id="evOffer">血を捧げる</button><button id="evIgnore">立ち去る</button>'; document.getElementById('evOffer').addEventListener('click', () => resolveEvent('offer')); document.getElementById('evIgnore').addEventListener('click', () => resolveEvent('ignore')); return; }
    if (ev.key === 'merchant') { el.actions.innerHTML = '<button id="evTake">拾う</button><button id="evPass">無視する</button>'; document.getElementById('evTake').addEventListener('click', () => resolveEvent('take')); document.getElementById('evPass').addEventListener('click', () => resolveEvent('pass')); return; }
    if (ev.key === 'idol') { el.actions.innerHTML = '<button id="evTouch">触れる</button><button id="evBack">引き返す</button>'; document.getElementById('evTouch').addEventListener('click', () => resolveEvent('touch')); document.getElementById('evBack').addEventListener('click', () => resolveEvent('back')); return; }
    el.actions.innerHTML = '<button id="evStudy">読む</button><button id="evLeaveLib">立ち去る</button>'; document.getElementById('evStudy').addEventListener('click', () => resolveEvent('study')); document.getElementById('evLeaveLib').addEventListener('click', () => resolveEvent('leave')); return;
  }

  if (state.mode === 'map') {
    if (state.floor === state.maxFloor) { el.actions.innerHTML = '<button id="startBoss">ボス戦に挑む</button>'; document.getElementById('startBoss').addEventListener('click', () => startCombat(bossPool[0])); return; }
    if (state.nextNode === 'event') { el.actions.innerHTML = '<button id="goEvent">イベントへ進む</button>'; document.getElementById('goEvent').addEventListener('click', openEvent); return; }
    if (state.eliteOffer) { el.actions.innerHTML = '<div class="row"><button id="startElite">エリート戦に挑む</button><button id="startNormal">通常戦闘にする</button></div>'; document.getElementById('startElite').addEventListener('click', () => startCombat(state.eliteOffer)); document.getElementById('startNormal').addEventListener('click', () => startCombat()); return; }
    el.actions.innerHTML = '<button id="startFight">戦闘開始</button>'; document.getElementById('startFight').addEventListener('click', () => startCombat()); return;
  }

  if (state.mode === 'reward') {
    const relic = state.relicChoices[0];
    const allTaken = state.rewardTaken && (state.relicTaken || !relic);
    const finishText = allTaken ? '次の階層へ進む' : '報酬をスキップして進む';
    el.actions.innerHTML = `<div class="row">${state.rewardChoices.map((id) => `<button data-reward="${id}" class="${getCardRarityClass(id)} ${state.rewardTaken ? 'is-disabled' : ''}" ${state.rewardTaken ? 'disabled' : ''}>${cardLabel(id)}<br><span class="small">${cardEffectText(id)}</span></button>`).join('')}</div>${relic ? `<div class="row" style="margin-top:0.5rem;"><button id="takeRelic" data-tip="${relic.text}" class="${getRelicRarityClass(relic)}" ${state.relicTaken ? 'disabled class="is-disabled"' : ''}>レリック獲得: ${relic.name}</button></div>` : ''}<div class="row" style="margin-top:0.5rem;"><button id="finishReward">${finishText}</button></div>`;
    el.actions.querySelectorAll('[data-reward]').forEach((b) => b.addEventListener('click', () => takeReward(b.dataset.reward)));
    if (relic) document.getElementById('takeRelic').addEventListener('click', () => chooseRelic(relic.id));
    document.getElementById('finishReward').addEventListener('click', () => { state.mode = 'postCombat'; render(); });
    return;
  }

  if (state.mode === 'postCombat') { el.actions.innerHTML = `<div class="row"><button id="toCamp" ${state.postCombatLocked ? 'disabled class="is-disabled"' : ''}>焚き火へ</button><button id="toShop" ${state.postCombatLocked ? 'disabled class="is-disabled"' : ''}>ショップへ</button><button id="nextFloor">次の階層へ</button></div>`; if (!state.postCombatLocked) { document.getElementById('toCamp').addEventListener('click', enterCamp); document.getElementById('toShop').addEventListener('click', enterShop); } document.getElementById('nextFloor').addEventListener('click', nextFloor); return; }

  if (state.mode === 'shop') {
    el.actions.innerHTML = `<p class="small">カード購入</p><div class="row">${state.shopChoices.map((c) => `<button data-buy="${c.id}" data-price="${c.price}" class="${getCardRarityClass(c.id)} ${state.gold < c.price ? 'is-disabled' : ''}" ${state.gold < c.price ? 'disabled' : ''}>${cardLabel(c.id)}<br><span class="small">${cardEffectText(c.id)} / ${c.price}G</span></button>`).join('')}</div><p class="small">アイテム購入</p><div class="row">${state.shopItemChoices.map((p) => `<button data-buy-item="${p.id}" data-price="${p.price}" class="${getItemRarityClass(p.id)} ${(state.items.length >= state.player.itemSlots || state.gold < p.price) ? 'is-disabled' : ''}" ${(state.items.length >= state.player.itemSlots || state.gold < p.price) ? 'disabled' : ''}>${itemDefs[p.id].name}<br><span class="small">${itemDefs[p.id].desc} / ${p.price}G</span></button>`).join('')}</div><div class="row" style="margin-top:0.6rem;"><button id="leaveShop">ショップを出る</button></div>`;
    el.actions.querySelectorAll('[data-buy]').forEach((b) => b.addEventListener('click', () => buyCard(b.dataset.buy, Number(b.dataset.price))));
    el.actions.querySelectorAll('[data-buy-item]').forEach((b) => b.addEventListener('click', () => buyItem(b.dataset.buyItem, Number(b.dataset.price))));
    document.getElementById('leaveShop').addEventListener('click', leaveShop);
    return;
  }

  if (state.mode === 'camp') {
    el.actions.innerHTML = `<div class="row"><button id="campHeal">休憩（14回復）</button></div><p class="small">カード削除（1枚）</p><div class="row">${state.campChoices.map((id) => `<button data-remove="${id}" class="${getCardRarityClass(id)}">削除: ${cardLabel(id)}</button>`).join('')}</div><p class="small">カード強化（1枚）</p><div class="row">${state.campChoices.filter((id) => cardDefs[id].upgradeTo).map((id) => `<button data-up="${id}" class="${getCardRarityClass(id)}">強化: ${cardLabel(id)}<br><span class="small">前: ${cardEffectText(id)}<br>後: ${cardEffectText(cardDefs[id].upgradeTo)}</span></button>`).join('')}</div>`;
    document.getElementById('campHeal').addEventListener('click', campHeal);
    el.actions.querySelectorAll('[data-remove]').forEach((b) => b.addEventListener('click', () => campRemove(b.dataset.remove)));
    el.actions.querySelectorAll('[data-up]').forEach((b) => b.addEventListener('click', () => campUpgrade(b.dataset.up)));
    return;
  }

  el.actions.innerHTML = '<button id="restart">最初からプレイ</button>';
  document.getElementById('restart').addEventListener('click', restart);
}

function renderLog() { el.log.innerHTML = state.log.map((x) => `<div class="log-entry ${x.cls || ''}">${x.text ?? x}</div>`).join(''); }
function render() { renderTopControls(); renderHUD(); renderState(); renderActions(); renderLog(); }

prepareMap();
startBlessing();
addLog('ゲーム開始。戦闘を始めましょう。');
render();
