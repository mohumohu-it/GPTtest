const VERSION = '1.07';
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

  meteor: { name: 'メテオブレイク', cost: 2, type: 'A', rarity: 'legendary', dmg: 24, exhaust: true, upgradeTo: 'meteor_p' },
  meteor_p: { name: 'メテオブレイク+', cost: 2, type: 'A', rarity: 'legendary', dmg: 30, exhaust: true, upgraded: true },
  bloodRitual: { name: '血の儀式', cost: 1, type: 'A', rarity: 'legendary', dmg: 18, weak: 2, exhaust: true, upgradeTo: 'bloodRitual_p' },
  bloodRitual_p: { name: '血の儀式+', cost: 1, type: 'A', rarity: 'legendary', dmg: 22, weak: 3, exhaust: true, upgraded: true },
  fateEngine: { name: '運命機関', cost: 2, type: 'P', rarity: 'legendary', strengthPerTurn: 1, upgradeTo: 'fateEngine_p' },
  fateEngine_p: { name: '運命機関+', cost: 2, type: 'P', rarity: 'legendary', strengthPerTurn: 2, upgraded: true },
  timeSpiral: { name: '時巡り', cost: 2, type: 'S', rarity: 'legendary', drawCount: 5, gainEnergy: 2, exhaust: true, upgradeTo: 'timeSpiral_p' },
  timeSpiral_p: { name: '時巡り+', cost: 2, type: 'S', rarity: 'legendary', drawCount: 6, gainEnergy: 2, exhaust: true, upgraded: true },

  voidCard: { name: '空虚', cost: 0, type: 'I', rarity: 'common', unplayable: true, ethereal: true, onDrawEnergyLoss: 1, statusWeight: 7, statusCard: true },
  dazed: { name: '眩暈', cost: 0, type: 'I', rarity: 'common', unplayable: true, ethereal: true, statusWeight: 1, statusCard: true },
  bind: { name: '拘束', cost: 1, type: 'I', rarity: 'common', drawCount: 1, exhaust: true, statusWeight: 2, statusCard: true },
  wound: { name: '負傷', cost: 0, type: 'I', rarity: 'common', unplayable: true, statusWeight: 3, statusCard: true },
  bleed: { name: '出血', cost: 0, type: 'I', rarity: 'common', selfDamage: 3, exhaust: true, statusWeight: 4, statusCard: true },
  burn: { name: '火傷', cost: 0, type: 'I', rarity: 'common', unplayable: true, endTurnSelfDamage: 2, statusWeight: 5, statusCard: true },
  toxin: { name: '毒素', cost: 1, type: 'I', rarity: 'common', delayedSelfDamage: 5, exhaust: true, statusWeight: 6, statusCard: true },

  illusion: { name: '錯覚', cost: 0, type: 'C', rarity: 'common', unplayable: true, ethereal: true, curseWeight: 1, curseCard: true },
  injury: { name: '怪我', cost: 0, type: 'C', rarity: 'common', unplayable: true, curseWeight: 2, curseCard: true },
  anguish: { name: '苦悩', cost: 0, type: 'C', rarity: 'common', unplayable: true, innate: true, curseWeight: 3, curseCard: true },
  decay: { name: '腐敗', cost: 0, type: 'C', rarity: 'common', unplayable: true, endTurnSelfDamage: 3, curseWeight: 4, curseCard: true },
  doubt: { name: '疑念', cost: 0, type: 'C', rarity: 'common', unplayable: true, endTurnDrain: 1, curseWeight: 5, curseCard: true },
  shame: { name: '羞恥', cost: 0, type: 'C', rarity: 'common', unplayable: true, endTurnVuln: 1, curseWeight: 6, curseCard: true },
  regret: { name: '後悔', cost: 0, type: 'C', rarity: 'common', unplayable: true, endTurnHandDamage: 1, curseWeight: 7, curseCard: true },
  destiny: { name: '運命', cost: 0, type: 'C', rarity: 'common', unplayable: true, unremovable: true, curseWeight: 7, curseCard: true },
  pain: { name: '苦痛', cost: 0, type: 'C', rarity: 'common', unplayable: true, onCardPlaySelfDamage: 1, curseWeight: 7, curseCard: true },
  shackles: { name: '足枷', cost: 0, type: 'C', rarity: 'common', unplayable: true, playLimit: 4, curseWeight: 8, curseCard: true },
  atonement: { name: '贖罪', cost: 1, type: 'C', rarity: 'common', eternal: true, exclusivePlay: true, curseWeight: 9, curseCard: true },
};

const itemDefs = {
  healPotion: { id: 'healPotion', rarity: 'common', name: '回復薬', desc: 'HPを18回復', combatOnly: false, use: () => { const before = state.player.hp; state.player.hp = Math.min(state.player.maxHp, state.player.hp + Math.ceil(18 * healRatio())); addLog(`回復薬: HP ${before}→${state.player.hp}`); } },
  bombPotion: { id: 'bombPotion', rarity: 'uncommon', name: '火炎壺', desc: '敵全体に15ダメージ', combatOnly: true, use: () => { aliveEnemies().forEach((e) => damage(e, 15)); addLog('火炎壺: 敵全体に15ダメージ。'); } },
  fortPotion: { id: 'fortPotion', rarity: 'common', name: '防護札', desc: '戦闘中のみ: 15ブロックを得る', combatOnly: true, use: () => { gainBlock(state.player, 15); addLog('防護札: 15ブロック。'); } },
  furyPotion: { id: 'furyPotion', rarity: 'rare', name: '戦神の香', desc: '筋力+2（戦闘中）', combatOnly: true, use: () => { state.player.strengthCombat += 2; addLog('戦神の香: 筋力+2。'); } },
  weakenPotion: { id: 'weakenPotion', rarity: 'common', name: '呪縛の粉', desc: '対象に弱体2', combatOnly: true, use: () => { const t = currentTarget(); if (t) { t.weak += 2; addLog(`${t.name}に弱体2。`); } } },
  drawPotion: { id: 'drawPotion', rarity: 'uncommon', name: '戦術の巻物', desc: 'カードを2枚引く', combatOnly: true, use: () => { draw(2); addLog('戦術の巻物: 2枚ドロー。'); } },
  smokeBomb: { id: 'smokeBomb', rarity: 'rare', name: '煙幕玉', desc: '敵全体に脱力2', combatOnly: true, use: () => { aliveEnemies().forEach((e) => { e.drain += 2; }); addLog('煙幕玉: 敵全体に脱力2。'); } },
  coinCharm: { id: 'coinCharm', rarity: 'legendary', name: '金貨のお守り', desc: '25Gを得る', combatOnly: false, use: () => { gainGold(25, '金貨のお守り'); } },
};

const normalEnemyPool = [
  { name: 'シラミ', danger: 1, hp: 12, gold: 7, intents: [{ type: 'attack', value: 3 }, { type: 'attack', value: 4 }] },
  { name: 'ゴブリン', danger: 2, hp: 16, gold: 10, intents: [{ type: 'attack', value: 4 }, { type: 'block', block: 4 }] },
  { name: 'カルト教団員', danger: 2, hp: 18, gold: 11, intents: [{ type: 'attack', value: 5 }, { type: 'buff', value: 1 }] },
  { name: 'ジョーウォーム', danger: 3, hp: 24, gold: 15, intents: [{ type: 'attack', value: 6 }, { type: 'attackBlock', value: 4, block: 4 }] },
  { name: '番兵', danger: 4, hp: 30, gold: 19, intents: [{ type: 'attack', value: 7 }, { type: 'block', block: 7 }, { type: 'addStatus', statusId: 'dazed', count: 2, zone: 'discard' }] },
  { name: '漆黒の騎士', danger: 6, hp: 48, gold: 28, intents: [{ type: 'attack', value: 10 }, { type: 'attackBlock', value: 8, block: 8 }, { type: 'buff', value: 2 }] },
  { name: '深淵の処刑人', danger: 8, hp: 70, gold: 40, intents: [{ type: 'attack', value: 14 }, { type: 'weakenAttack', weak: 2, value: 10 }, { type: 'addStatus', statusId: 'burn', count: 1, zone: 'draw' }, { type: 'addCurse', curseId: 'doubt', count: 1, zone: 'discard' }] },
];

const elitePool = [
  { name: 'ラガヴーリン', hp: 72, gold: 65, isElite: true, intents: [{ type: 'attack', value: 14 }, { type: 'attackBlock', value: 10, block: 10 }, { type: 'buff', value: 2 }] },
  { name: 'グレムリンノブ', hp: 80, gold: 70, isElite: true, intents: [{ type: 'attack', value: 15 }, { type: 'weakenAttack', weak: 2, value: 11 }, { type: 'buff', value: 2 }] },
];
const bossPool = [{ name: '覚醒者', hp: 150, gold: 140, isBoss: true, intents: [{ type: 'attack', value: 18 }, { type: 'attackBlock', value: 12, block: 14 }, { type: 'buff', value: 3 }, { type: 'weakenAttack', weak: 2, value: 14 }] }];

const relicPool = [
  { id: 'whetstone', name: '砥石', rarity: 'common', value: 90, text: '戦闘開始時に8ブロック', onCombatStart: () => gainBlock(state.player, 8) },
  { id: 'swift_feather', name: '迅羽の護符', rarity: 'common', value: 100, text: '戦闘開始時に1枚ドロー', onCombatStart: () => draw(1) },
  { id: 'coin_pouch', name: '金貨袋', rarity: 'common', value: 95, text: '戦闘報酬のGold+20%', onBattleGoldRate: 1.2 },
  { id: 'horn', name: '角笛', rarity: 'uncommon', value: 150, text: '各ターン開始時に2ブロック', applyStartTurn: () => gainBlock(state.player, 2) },
  { id: 'belt', name: '冒険者のベルト', rarity: 'uncommon', value: 155, text: 'アイテム所持枠+2（最大7）', onGain: () => { state.player.itemSlots = Math.min(state.player.maxItemSlots, state.player.itemSlots + 2); } },
  { id: 'war_drum', name: '戦鼓', rarity: 'uncommon', value: 165, text: '戦闘開始時にエナジー+1', onCombatStart: () => { state.player.maxEnergy += 1; state.player.energy += 1; } },
  { id: 'heart', name: '赤いハート', rarity: 'rare', value: 230, text: '最大HP+10、即時10回復', onGain: () => { state.player.maxHp += 10; state.player.hp = Math.min(state.player.maxHp, state.player.hp + 10); } },
  { id: 'ruby', name: '紅蓮のルビー', rarity: 'rare', value: 210, text: '戦闘開始時に筋力+1', onCombatStart: () => { state.player.strengthCombat += 1; addLog('紅蓮のルビー: 戦闘開始時に筋力+1'); } },
  { id: 'mirror', name: '鏡面の欠片', rarity: 'rare', value: 260, text: '戦闘開始後、最初に使うカード1枚の効果を2回発動', onCombatStart: () => { state.firstCardDouble = true; } },
  { id: 'blood_charm', name: '血晶の護符', rarity: 'rare', value: 220, text: 'ターン開始時、HPが50%以下なら筋力+1', applyStartTurn: () => { if (state.player.hp <= Math.floor(state.player.maxHp * 0.5)) state.player.strengthCombat += 1; } },
];

const bossRelicPool = [
  { id: 'black_blood', name: 'ブラックブラッド', rarity: 'legendary', text: '戦闘開始時に追加で6HP回復', onCombatStart: () => { const before = state.player.hp; state.player.hp = Math.min(state.player.maxHp, state.player.hp + 6); if (state.player.hp > before) addLog('ブラックブラッド: 戦闘開始時に6HP回復。'); } },
  { id: 'energy_core', name: 'エナジーコア', rarity: 'legendary', text: '毎ターン開始時エナジー+1', applyStartTurn: () => { state.player.energy += 1; } },
  { id: 'pandora_note', name: 'パンドラの覚書', rarity: 'legendary', text: '戦闘開始時にカードを1枚追加で引く', onCombatStart: () => { draw(1); addLog('パンドラの覚書: 追加で1枚ドロー。'); } },
  { id: 'sacred_bark', name: '聖樹の樹皮', rarity: 'legendary', text: '回復効果+50%', onHealRatio: 1.5 },
  { id: 'tiny_house', name: '小さな家', rarity: 'legendary', text: '獲得時: 最大HP+5、50G、カード1枚強化', onGain: () => { state.player.maxHp += 5; state.player.hp += 5; gainGold(50, '小さな家'); const idx = state.player.deck.findIndex((id) => cardDefs[id].upgradeTo); if (idx >= 0) { const oldId = state.player.deck[idx]; state.player.deck[idx] = cardDefs[state.player.deck[idx]].upgradeTo; addLog(`小さな家: ${cardDefs[oldId].name}が強化された。`, 'log-glow-drop'); } } },
];

const mapTexts = [
  '次の敵を探して進む。',
  '暗い通路の先に、何かの気配を感じる。',
  '靴音が反響する。戦いはすぐそこだ。',
  '湿った空気が肺を刺す。慎重に進む。',
  '遠くで金属音が鳴る。誰かが待ち構えている。',
  '崩れた柱の影を縫って、先へ進んだ。',
  '静寂が不気味だ。次の一手を探る。',
  '足元に散った骨が、ここが安全ではないと語っている。',
];

const rewardCards = Object.keys(cardDefs).filter((id) => !cardDefs[id].statusCard && !cardDefs[id].curseCard && !cardDefs[id].upgraded);
const shopCards = Object.keys(cardDefs).filter((k) => !cardDefs[k].upgraded && !cardDefs[k].statusCard && !cardDefs[k].curseCard);

const defaultState = () => ({
  floor: 1, maxFloor: 15, gold: 120, mode: 'map', mapText: mapTexts[0], nextNode: 'combat', eventState: null, turn: 0,
  rewardTaken: false, relicTaken: false, rewardChoices: [], shopChoices: [], shopItemChoices: [], relicChoices: [], campChoices: [], bossRelicChoices: [], bossRelicTaken: false, pendingBossRelic: false, shopRelicChoices: [], combatPileView: null,
  postCombatLocked: false, eliteOffer: null, showDeck: false, showRelics: false, selectedTarget: 0, screenHidden: false, screenMaskLevel: 0, blessingChoices: [], blessingResult: '', blessingUpgradeRemaining: 0,
  items: ['healPotion', 'bombPotion'],
  pendingVictory: null, dropItemChoices: [], itemTaken: true, cardsPlayedThisTurn: 0,
  player: {
    maxHp: 70, hp: 70, block: 0, energy: 3, maxEnergy: 3,
    strengthBase: 0, strengthCombat: 0, weak: 0, vuln: 0, drain: 0,
    deck: ['strike', 'strike', 'strike', 'defend', 'defend', 'bash', 'battleCry', 'sweep', 'flurry', 'quick'],
    itemSlots: 3, maxItemSlots: 7,
    draw: [], hand: [], discard: [], relics: [], powers: { blockPerTurn: 0, drawPerTurn: 0, strengthPerTurn: 0 },
  },
  enemies: [], playerDamageFlashUntil: 0, pendingSelfDamage: 0, log: [], firstCardDouble: false,
});

let state = defaultState();
const el = { topControls: document.getElementById('topControls'), hud: document.getElementById('hud'), state: document.getElementById('state'), actions: document.getElementById('actions'), log: document.getElementById('log') };

const addLog = (t, cls = '') => { state.log.unshift({ text: t, cls }); state.log = state.log.slice(0, 80); };
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const aliveEnemies = () => state.enemies.filter((e) => e.hp > 0);
const currentTarget = () => state.enemies[state.selectedTarget]?.hp > 0 ? state.enemies[state.selectedTarget] : aliveEnemies()[0];
const playerStrength = () => state.player.strengthBase + state.player.strengthCombat;
const relicDamageBonus = () => state.player.relics.reduce((s, r) => s + (r.onDealDamageBonus || 0), 0);
const healRatio = () => state.player.relics.reduce((m, r) => m * (r.onHealRatio || 1), 1);
const applyDrain = (a, u) => (u.drain > 0 ? Math.floor(a * 0.75) : a);
const calcPlayerDamage = (b) => Math.max(0, applyDrain(b + playerStrength() + relicDamageBonus(), state.player));
const calcEnemyAttack = (e, b) => Math.max(0, applyDrain(b + (e.strength || 0), e));
const getCardRarityClass = (id) => `rarity-${cardDefs[id].rarity || 'common'}`;
const getRelicRarityClass = (r) => `rarity-${r.rarity || 'common'}`;
const getItemRarityClass = (id) => `rarity-${itemDefs[id]?.rarity || 'common'}`;
const hpClass = (cur, max) => (cur / max <= 0.25 ? 'hp-critical' : cur / max <= 0.5 ? 'hp-caution' : '');
const areaOf = (floor) => Math.ceil(floor / 5);
const isBossFloor = (floor) => floor % 5 === 0;
const intentClass = (i) => {
  if (!i) return '';
  if (i.type === 'attack' || i.type === 'attackBlock' || i.type === 'weakenAttack') return 'intent-attack';
  if (i.type === 'block' || i.type === 'buff') return 'intent-def';
  return 'intent-debuff';
};
const cardCostText = (id) => ((cardDefs[id].statusCard && cardDefs[id].unplayable) ? '-' : cardDefs[id].cost);
const cardLabel = (id) => `<span class="${cardDefs[id].upgraded ? 'upgraded' : ''}">${cardDefs[id].type}.${cardDefs[id].name}【${cardCostText(id)}】</span>`;

const hpToneClass = (cur, max) => (cur / max <= 0.25 ? 'hp-critical-static' : cur / max <= 0.5 ? 'hp-caution-static' : '');
function gainGold(amount, reason = 'ゴールド獲得', applyRate = false) { const rate = applyRate ? state.player.relics.reduce((m, r) => m * (r.onBattleGoldRate || 1), 1) : 1; const finalAmount = Math.max(0, Math.floor(amount * rate)); state.gold += finalAmount; addLog(`${reason}: ${finalAmount}G`, 'log-glow-gold'); }
function triggerFlash(u) {
  const until = Date.now() + 320;
  if (u === state.player) state.playerDamageFlashUntil = until;
  else u.damageFlashUntil = until;
}

function popupTargetElement(u) {
  if (u === state.player) return document.getElementById('playerPanel');
  const idx = state.enemies.indexOf(u);
  if (idx < 0) return null;
  return document.querySelector(`.enemy-card[data-target="${idx}"]`);
}

function spawnPopup(u, text, kind = 'damage') {
  const host = popupTargetElement(u);
  if (!host) return;
  const n = document.createElement('span');
  n.className = `float-text ${kind === 'block' ? 'float-block' : 'float-damage'}`;
  n.textContent = text;
  host.appendChild(n);
  n.addEventListener('animationend', () => n.remove());
}

function injectCurseToPlayer(curseId, count = 1, zone = 'discard') {
  for (let i = 0; i < count; i += 1) {
    state.player.deck.push(curseId);
    if (zone === 'draw') state.player.draw.unshift(curseId);
    else if (zone === 'hand') state.player.hand.push(curseId);
    else state.player.discard.push(curseId);
  }
}

function injectStatusToPlayer(statusId, count = 1, zone = 'discard') {
  for (let i = 0; i < count; i += 1) {
    if (zone === 'draw') state.player.draw.unshift(statusId);
    else if (zone === 'hand') state.player.hand.push(statusId);
    else state.player.discard.push(statusId);
  }
}

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
  if (c.onDrawEnergyLoss) p.push(`引いた時エナジー-${c.onDrawEnergyLoss}`);
  if (c.endTurnSelfDamage) p.push(`ターン終了時に${c.endTurnSelfDamage}ダメージ`);
  if (c.delayedSelfDamage) p.push(`ターン終了時に${c.delayedSelfDamage}ダメージ`);
  if (c.unplayable) p.push('使用不可');
  if (c.ethereal) p.push('エセリアル');
  if (c.innate) p.push('天賦');
  if (c.unremovable) p.push('逃れるすべはない');
  if (c.onCardPlaySelfDamage) p.push(`カード使用ごとに${c.onCardPlaySelfDamage}ダメージ`);
  if (c.playLimit) p.push(`このターン${c.playLimit}枚まで`);
  if (c.exclusivePlay) p.push('このカード以外プレイ不可');
  if (c.eternal) p.push('永劫');
  if (c.exhaust) p.push('廃棄');
  return p.join(' / ');
}

function gainBlock(u, v, showFx = true) { const a = u.vuln > 0 ? Math.max(0, Math.floor(v * 0.75)) : v; u.block += a; addLog(`${u === state.player ? 'あなた' : u.name}は${a}ブロックを得た。`); if (showFx && a > 0) { spawnPopup(u, `+${a}`, 'block'); } return a; }
function damage(u, a, showFx = true) { const amp = u.weak > 0 ? Math.ceil(a * 1.5) : a; const dealt = Math.max(0, amp - u.block); u.block = Math.max(0, u.block - amp); u.hp -= dealt; if (dealt > 0 && showFx) { triggerFlash(u); spawnPopup(u, `-${dealt}`, 'damage'); } return dealt; }
function draw(n = 1) { for (let i = 0; i < n; i += 1) { if (state.player.draw.length === 0) { state.player.draw = shuffle(state.player.discard); state.player.discard = []; } const c = state.player.draw.shift(); if (!c) continue; state.player.hand.push(c); const def = cardDefs[c]; if (def?.onDrawEnergyLoss) { state.player.energy = Math.max(0, state.player.energy - def.onDrawEnergyLoss); addLog(`${def.name}を引いた: エナジー-${def.onDrawEnergyLoss}`); } } }
function chooseEnemyIntent(e) { e.intent = { ...e.intents[Math.floor(Math.random() * e.intents.length)] }; }

function intentText(e) {
  const i = e.intent; if (!i) return '-';
  if (i.type === 'attack') return `攻撃 ${calcEnemyAttack(e, i.value)}`;
  if (i.type === 'block') return `防御 ${i.block}`;
  if (i.type === 'buff') return `強化 筋力+${i.value}`;
  if (i.type === 'attackBlock') return `攻撃 ${calcEnemyAttack(e, i.value)} + 防御 ${i.block}`;
  if (i.type === 'weaken') return `弱体付与 ${i.weak}`;
  if (i.type === 'weakenAttack') return `攻撃 ${calcEnemyAttack(e, i.value)} + 弱体${i.weak}`;
  if (i.type === 'addStatus') return `状態異常付与 ${cardDefs[i.statusId]?.name || '不明'}x${i.count}`;
  if (i.type === 'addCurse') return `呪い付与 ${cardDefs[i.curseId]?.name || '不明'}x${i.count}`;
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
  return { group, targetDanger, sum };
}

function startCombat(encounter = null) {
  const normalPack = !encounter ? spawnNormalGroup() : null;
  state.enemies = encounter?.isBoss || encounter?.isElite
    ? [{ ...encounter, maxHp: encounter.hp, block: 0, weak: 0, vuln: 0, drain: 0, strength: 0, intent: null, danger: encounter.isElite ? 9 : 10, damageFlashUntil: 0 }]
    : normalPack.group;
  state.selectedTarget = 0;
  state.mode = 'combat';
  state.turn = 1;
  state.combatPileView = null;
  state.firstCardDouble = false;
  Object.assign(state.player, { block: 0, energy: 3, maxEnergy: 3, strengthCombat: 0, weak: 0, vuln: 0, drain: 0, powers: { blockPerTurn: 0, drawPerTurn: 0, strengthPerTurn: 0 }, draw: shuffle(state.player.deck), hand: [], discard: [] });
  state.cardsPlayedThisTurn = 0;
  const innate = [];
  state.player.draw = state.player.draw.filter((id) => { if (cardDefs[id]?.innate && innate.length < 1) { innate.push(id); return false; } return true; });
  state.player.hand.push(...innate);
  draw(5 - innate.length);
  state.enemies.forEach(chooseEnemyIntent);
  state.player.relics.forEach((r) => { if (r.onCombatStart) r.onCombatStart(); });
  state.player.relics.forEach((r) => { if (r.applyStartTurn) r.applyStartTurn(); });
  const dangerSum = state.enemies.reduce((sum, e) => sum + (e.danger || (e.isElite ? 9 : 10)), 0);
  const estimate = normalPack ? normalPack.targetDanger : (encounter?.isBoss ? 10 : encounter?.isElite ? 9 : dangerSum);
  addLog(`戦闘開始: ${state.enemies.map((e) => e.name).join(' / ')} / 危険度:${dangerSum}(推測${estimate})`);
  render();
}

function applyPowerOnPlay(c) {
  if (c.blockPerTurn) state.player.powers.blockPerTurn += c.blockPerTurn;
  if (c.drawPerTurn) state.player.powers.drawPerTurn += c.drawPerTurn;
  if (c.strengthPerTurn) state.player.powers.strengthPerTurn += c.strengthPerTurn;
  if (c.weakSelf) state.player.weak += c.weakSelf;
}

function playCard(index) {
  const id = state.player.hand[index]; const c = cardDefs[id]; if (!c || c.unplayable || c.cost > state.player.energy) return;
  if (state.player.hand.includes('atonement') && id !== 'atonement') { addLog('贖罪が手札にあるため、このカード以外はプレイできない。', 'log-glow-danger'); return; }
  if (state.player.hand.includes('shackles') && state.cardsPlayedThisTurn >= 4) { addLog('足枷の呪いで、このターンは4枚までしかプレイできない。', 'log-glow-danger'); return; }
  const target = currentTarget();
  state.player.energy -= c.cost;
  state.cardsPlayedThisTurn += 1;
  state.player.hand.splice(index, 1);
  if (c.eternal) state.player.discard.push(id);
  else if (!(c.exhaust || c.type === 'P')) state.player.discard.push(id);

  const repeat = state.firstCardDouble ? 2 : 1;
  if (state.firstCardDouble) { addLog('鏡面の欠片が輝き、カード効果が2回発動！', 'log-glow-rare'); state.firstCardDouble = false; }
  for (let r = 0; r < repeat; r += 1) {
    if (state.player.hand.includes('pain')) { const pDmg = damage(state.player, 1); addLog(`苦痛により${pDmg}ダメージ。`, 'log-glow-danger'); }
    if (c.dmg && target) { const hits = c.hits || 1; let total = 0; for (let i = 0; i < hits; i += 1) { if (target.hp <= 0) break; total += damage(target, calcPlayerDamage(c.dmg), false); } if (total > 0) { triggerFlash(target); spawnPopup(target, `-${total}`, 'damage'); } addLog(`${c.name}で${target.name}に${total}ダメージ。`, 'log-glow-danger'); }
    if (c.randomDmg) {
      let total = 0;
      const perTarget = new Map();
      for (let i = 0; i < c.randomHits; i += 1) {
        const list = aliveEnemies();
        if (list.length === 0) break;
        const pick = list[Math.floor(Math.random() * list.length)];
        const dealt = damage(pick, calcPlayerDamage(c.randomDmg), false);
        total += dealt;
        perTarget.set(pick, (perTarget.get(pick) || 0) + dealt);
      }
      perTarget.forEach((val, enemy) => { if (val > 0) { triggerFlash(enemy); spawnPopup(enemy, `-${val}`, 'damage'); } });
      addLog(`${c.name}でランダム攻撃、合計${total}ダメージ。`, 'log-glow-danger');
    }
    if (c.aoe) { aliveEnemies().forEach((e) => { const dealt = damage(e, calcPlayerDamage(c.aoe), false); if (dealt > 0) { triggerFlash(e); spawnPopup(e, `-${dealt}`, 'damage'); } }); addLog(`${c.name}で敵全体を攻撃。`, 'log-glow-danger'); }
    if (c.block) gainBlock(state.player, c.block, true);
    if (c.heal) { const before = state.player.hp; state.player.hp = Math.min(state.player.maxHp, state.player.hp + Math.ceil(c.heal * healRatio())); addLog(`${c.name}でHP ${before}→${state.player.hp}`); }
    if (c.drawCount) { draw(c.drawCount); addLog(`${c.name}で${c.drawCount}枚ドロー。`); }
    if (c.gainEnergy) { state.player.energy += c.gainEnergy; addLog(`${c.name}でエナジー+${c.gainEnergy}。`); }
    if (c.selfDamage) { const dealt = damage(state.player, c.selfDamage); addLog(`${c.name}の反動で${dealt}ダメージ。`, 'log-glow-danger'); }
    if (c.delayedSelfDamage) { state.pendingSelfDamage += c.delayedSelfDamage; addLog(`${c.name}: このターン終了時に${c.delayedSelfDamage}ダメージ。`, 'log-glow-danger'); }
    if (c.weak && target) { target.weak += c.weak; addLog(`${target.name}に弱体${c.weak}。`); }
    if (c.drain && target) { target.drain += c.drain; addLog(`${target.name}に脱力${c.drain}。`); }
    if (c.strengthGain) { state.player.strengthCombat += c.strengthGain; addLog(`筋力が${c.strengthGain}上昇。`); }
    if (c.type === 'P') { applyPowerOnPlay(c); addLog(`パワー発動: ${c.name}（この戦闘では廃棄）`); }
  }

  if (aliveEnemies().length === 0) { victory(); return; }
  render();
}

function doEnemyTurn() {
  state.enemies.forEach((e) => {
    if (e.hp <= 0) return;
    const i = e.intent;
    e.block = 0;
    if (i.type === 'attack' || i.type === 'attackBlock' || i.type === 'weakenAttack') { const dealt = damage(state.player, calcEnemyAttack(e, i.value)); addLog(`${e.name}の攻撃で${dealt}ダメージ。`, 'log-glow-danger'); }
    if (i.type === 'block' || i.type === 'attackBlock') gainBlock(e, i.block);
    if (i.type === 'buff') { e.strength += i.value; addLog(`${e.name}の筋力が上昇。`); }
    if (i.type === 'weaken' || i.type === 'weakenAttack') { state.player.weak += i.weak; addLog(`あなたは弱体${i.weak}。`); }
    if (i.type === 'addStatus') { injectStatusToPlayer(i.statusId, i.count, i.zone); triggerFlash(state.player); addLog(`${e.name}は${cardDefs[i.statusId]?.name || '状態異常'}を${i.zone === 'draw' ? '山札' : i.zone === 'hand' ? '手札' : '捨て札'}に${i.count}枚混ぜた。`, 'log-glow-danger'); }
    if (i.type === 'addCurse') { injectCurseToPlayer(i.curseId, i.count, i.zone); triggerFlash(state.player); addLog(`${e.name}は呪い${cardDefs[i.curseId]?.name || '不明'}を${i.zone === 'draw' ? '山札' : i.zone === 'hand' ? '手札' : '捨て札'}に${i.count}枚混ぜた。`, 'log-glow-danger'); }
  });
}

function tickDebuffs(u) { u.weak = Math.max(0, u.weak - 1); u.vuln = Math.max(0, u.vuln - 1); u.drain = Math.max(0, u.drain - 1); }

function startPlayerTurn() {
  state.turn += 1;
  state.player.block = 0;
  state.player.energy = state.player.maxEnergy;
  state.cardsPlayedThisTurn = 0;
  if (state.player.powers.blockPerTurn > 0) gainBlock(state.player, state.player.powers.blockPerTurn);
  if (state.player.powers.strengthPerTurn > 0) { state.player.strengthCombat += state.player.powers.strengthPerTurn; addLog(`パワー効果: 筋力+${state.player.powers.strengthPerTurn}`); }
  draw(5 + state.player.powers.drawPerTurn);
  state.enemies.forEach((e) => { if (e.hp > 0) chooseEnemyIntent(e); });
  state.player.relics.forEach((r) => { if (r.applyStartTurn) r.applyStartTurn(); });
}

function endTurn() {
  let endTurnSelfDamage = 0;
  const kept = [];
  state.player.hand.forEach((id) => {
    const c = cardDefs[id];
    if (c?.endTurnSelfDamage) endTurnSelfDamage += c.endTurnSelfDamage;
    if (c?.endTurnDrain) state.player.drain += c.endTurnDrain;
    if (c?.endTurnVuln) state.player.vuln += c.endTurnVuln;
    if (c?.endTurnHandDamage) endTurnSelfDamage += c.endTurnHandDamage * state.player.hand.length;
    if (c?.ethereal) return;
    kept.push(id);
  });
  state.player.discard.push(...kept);
  state.player.hand = [];
  const totalEndDamage = endTurnSelfDamage + (state.pendingSelfDamage || 0);
  state.pendingSelfDamage = 0;
  if (totalEndDamage > 0) { const dealt = damage(state.player, totalEndDamage); addLog(`状態異常により${dealt}ダメージを受けた。`, 'log-glow-danger'); }
  tickDebuffs(state.player); state.enemies.forEach(tickDebuffs); doEnemyTurn(); if (state.player.hp <= 0) { state.mode = 'dead'; render(); return; } startPlayerTurn(); render(); }

function availableRelics() { const owned = new Set(state.player.relics.map((r) => r.id)); return relicPool.filter((r) => !owned.has(r.id)); }
function pickRewardChoices(elite = false, boss = false) {
  const common = rewardCards.filter((id) => cardDefs[id].rarity === 'common');
  const high = rewardCards.filter((id) => cardDefs[id].rarity !== 'common');
  const rarePlus = rewardCards.filter((id) => ['rare', 'legendary'].includes(cardDefs[id].rarity));
  if (boss) return shuffle(rarePlus).slice(0, 3);
  return shuffle(elite ? [...shuffle(high).slice(0, 9), ...shuffle(common).slice(0, 1)] : rewardCards).slice(0, 3);
}

function maybeDropItem() {
  if (Math.random() >= 0.3 || state.items.length >= state.player.itemSlots) return null;
  const keys = Object.keys(itemDefs);
  const drop = keys[Math.floor(Math.random() * keys.length)];
  addLog(`アイテムドロップ候補: ${itemDefs[drop].name}`, 'log-glow-drop');
  return drop;
}

function finalizeVictoryToReward() {
  const p = state.pendingVictory;
  if (!p) return;
  state.mode = 'reward';
  state.rewardTaken = false;
  state.relicTaken = !p.elite;
  state.pendingBossRelic = p.isBoss;
  state.rewardChoices = p.rewardChoices;
  state.relicChoices = p.relicChoices;
  state.postCombatLocked = false;
  if (!state.dropItemChoices) state.dropItemChoices = [];
  state.pendingVictory = null;
  render();
}

function victory() {
  const isBoss = state.enemies.some((e) => e.isBoss);
  const elite = state.enemies.some((e) => e.isElite);
  const earned = state.enemies.reduce((sum, e) => sum + (e.gold || 0), 0);
  if (isBoss && state.floor >= state.maxFloor) {
    const bossName = state.enemies.find((e) => e.isBoss)?.name || 'ボス';
    addLog(`エリアボス-${bossName}を撃破！！`, 'log-glow-danger');
    gainGold(earned, '戦闘報酬', true);
    state.mode = 'win';
    render();
    return;
  }

  const clearLog = isBoss
    ? `エリアボス-${state.enemies.find((e) => e.isBoss)?.name || '???'}を撃破！！`
    : elite
      ? `エリート-${state.enemies.find((e) => e.isElite)?.name || '???'}を撃破！`
      : '敵を撃破した。';
  addLog(clearLog, isBoss || elite ? 'log-glow-danger' : 'log-glow-drop');
  gainGold(earned, '戦闘報酬', true);
  const droppedItem = maybeDropItem();
  state.dropItemChoices = droppedItem ? [droppedItem] : [];
  state.itemTaken = !droppedItem;

  const rewardChoices = pickRewardChoices(elite, isBoss);
  const relicChoices = elite ? shuffle(availableRelics()).slice(0, 1) : [];
  if (isBoss) {
    state.bossRelicTaken = false;
    const owned = new Set(state.player.relics.map((r) => r.id));
    state.bossRelicChoices = shuffle(bossRelicPool.filter((r) => !owned.has(r.id))).slice(0, 3);
  }

  state.pendingVictory = { isBoss, elite, rewardChoices, relicChoices };
  state.mode = 'combatWin';
  render();
}

function takeReward(id) { if (!state.rewardTaken) { state.player.deck.push(id); state.rewardTaken = true; addLog(`${cardDefs[id].name}を入手。`, 'log-glow-drop'); } render(); }
function chooseRelic(id) { const r = relicPool.find((x) => x.id === id); if (!r) return; state.player.relics.push(r); if (r.onGain) r.onGain(); state.relicTaken = true; state.relicChoices = []; addLog(`${r.name}を獲得。`, 'log-glow-drop'); render(); }

function chooseBossRelic(id) { const r = bossRelicPool.find((x) => x.id === id); if (!r || state.bossRelicTaken) return; state.player.relics.push(r); if (r.onGain) r.onGain(); state.bossRelicTaken = true; addLog(`ボスレリック獲得: ${r.name}`, 'log-glow-drop'); render(); }
function takeDropItem(id) { if (state.itemTaken || !id) return; if (state.items.length >= state.player.itemSlots) { addLog('アイテム枠がいっぱいで受け取れない。', 'log-glow-danger'); return; } state.items.push(id); state.itemTaken = true; state.dropItemChoices = []; addLog(`${itemDefs[id].name}を入手。`, 'log-glow-drop'); render(); }
function toggleCombatPileView(v) { state.combatPileView = state.combatPileView === v ? null : v; render(); }

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
  const owned = new Set(state.player.relics.map((r) => r.id));
  state.shopRelicChoices = shuffle(relicPool.filter((r) => !owned.has(r.id))).slice(0, 2).map((r) => ({ id: r.id, price: r.value || 120 }));
  render();
}

function buyCard(id, price) { if (state.gold < price) return; state.gold -= price; state.player.deck.push(id); addLog(`${cardDefs[id].name}を購入。`); state.shopChoices = state.shopChoices.filter((c) => c.id !== id); render(); }
function buyItem(id, price) { if (state.gold < price || state.items.length >= state.player.itemSlots) return; state.gold -= price; state.items.push(id); addLog(`${itemDefs[id].name}を購入。`); state.shopItemChoices = state.shopItemChoices.filter((p) => p.id !== id); render(); }
function buyRelic(id, price) {
  if (state.gold < price) return;
  const relic = relicPool.find((r) => r.id === id);
  if (!relic || state.player.relics.some((r) => r.id === id)) return;
  state.gold -= price;
  state.player.relics.push(relic);
  if (relic.onGain) relic.onGain();
  addLog(`${relic.name}を購入。`, 'log-glow-drop');
  state.shopRelicChoices = state.shopRelicChoices.filter((r) => r.id !== id);
  render();
}
function leaveShop() { state.postCombatLocked = true; state.mode = 'postCombat'; render(); }

function enterCamp() { state.mode = 'camp'; state.campChoices = [...new Set(state.player.deck)]; render(); }
function resolveCamp() { state.postCombatLocked = true; state.mode = 'postCombat'; render(); }
function campHeal() { state.player.hp = Math.min(state.player.maxHp, state.player.hp + Math.ceil(14 * healRatio())); addLog('焚き火で回復。'); resolveCamp(); }
function campRemove(id) { if (cardDefs[id]?.unremovable) { addLog(`${cardDefs[id].name}は取り除けない。`, 'log-glow-danger'); return; } const i = state.player.deck.indexOf(id); if (i >= 0) state.player.deck.splice(i, 1); addLog(`${cardDefs[id].name}を削除。`); resolveCamp(); }
function campUpgrade(id) { const up = cardDefs[id].upgradeTo; if (!up) return; const i = state.player.deck.indexOf(id); if (i >= 0) state.player.deck[i] = up; addLog(`${cardDefs[id].name}を強化。`); resolveCamp(); }

function openEvent() {
  const eventTable = [
    { key: 'chest', rarity: 8, build: () => ({ key: 'chest', title: '忘れられた宝箱', text: '苔むした宝箱が、ぽつんと置かれている。長い年月、誰にも開けられていないようだ。', resolved: false }) },
    { key: 'fountain', rarity: 10, build: () => ({ key: 'fountain', title: '回復の泉', text: '澄んだ泉が湧いている。身を清めるか、力を求めるか。', resolved: false }) },
    { key: 'altar', rarity: 4, build: () => { const small = Math.ceil(state.player.maxHp * 0.08); const large = Math.ceil(state.player.maxHp * 0.16); return { key: 'altar', title: '血の祭壇', text: `不気味な祭壇が脈打っている。小さな供物ならHP-${small}、大きな供物ならHP-${large}。`, resolved: false, smallLoss: small, largeLoss: large }; } },
    { key: 'merchant', rarity: 7, build: () => ({ key: 'merchant', title: '行商人の落とし物', text: '破れた荷袋を見つけた。中には金貨と見慣れない瓶。', resolved: false }) },
    { key: 'idol', rarity: 5, build: () => ({ key: 'idol', title: '古びた偶像', text: '古代の偶像があなたを見つめている。触れるなら見返りは60G、代償として呪い「錯覚」がデッキに入る。', resolved: false }) },
    { key: 'library', rarity: 9, build: () => ({ key: 'library', title: '静寂の書庫', text: '崩れかけの書庫に、まだ読める戦術書が残っている。', resolved: false }) },
    { key: 'cursedMirror', rarity: 3, build: () => ({ key: 'cursedMirror', title: '呪鏡の間', text: '黒い鏡が囁く。「力を望むなら、代償を払え」。', resolved: false }) },
    { key: 'whisperingCoin', rarity: 6, build: () => ({ key: 'whisperingCoin', title: '囁く金貨', text: '金貨の山が脈打っている。拾えば富は得られるが、禍々しい気配がする。', resolved: false }) },
    { key: 'hexedFountain', rarity: 7, build: () => ({ key: 'hexedFountain', title: '呪泉', text: '濁った泉が光る。飲めば体力は戻るが、呪いを招くかもしれない。', resolved: false }) },
    { key: 'curseTrader', rarity: 5, build: () => ({ key: 'curseTrader', title: '呪詛商', text: '怪しい商人が近づく。「呪いを引き受けるなら報酬をやろう」。', resolved: false }) },
    { key: 'hollowShrine', rarity: 4, build: () => ({ key: 'hollowShrine', title: '虚ろの祠', text: '祠の前で二つの声が響く。浄化か、代償を伴う恩恵か。', resolved: false }) },
  ];
  const totalWeight = eventTable.reduce((s, e) => s + e.rarity, 0);
  let roll = Math.random() * totalWeight;
  let chosen = eventTable[eventTable.length - 1];
  for (const entry of eventTable) {
    roll -= entry.rarity;
    if (roll <= 0) { chosen = entry; break; }
  }
  state.eventState = chosen.build();
  state.mode = 'event';
  addLog(`イベント遭遇: ${state.eventState.title}`, 'log-glow-drop');
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
    if (action === 'offerSmall') { const lose = ev.smallLoss || Math.ceil(state.player.maxHp * 0.08); const gain = 35; state.player.hp -= lose; gainGold(gain, '血の祭壇(小)'); addLog(`血の儀式でHPを${lose}失った。`, 'log-glow-danger'); ev.result = `小さな供物を捧げ、HP${lose}を失う代わりに${gain}Gを得た。`; }
    else if (action === 'offerLarge') { const lose = ev.largeLoss || Math.ceil(state.player.maxHp * 0.16); const gain = 80; state.player.hp -= lose; gainGold(gain, '血の祭壇(大)'); addLog(`血の儀式でHPを${lose}失った。`, 'log-glow-danger'); ev.result = `大きな供物を捧げ、HP${lose}を失う代わりに${gain}Gを得た。`; }
    else ev.result = '祭壇には触れずに立ち去った。';
  }

  if (ev.key === 'merchant') {
    if (action === 'take') { gainGold(35, '行商人の落とし物'); if (state.items.length < state.player.itemSlots) state.items.push('fortPotion'); ev.result = '荷袋から35Gと防護札を得た。'; }
    else ev.result = '荷袋には触れず、静かに去った。';
  }

  if (ev.key === 'idol') {
    if (action === 'touch') { state.player.deck.push('illusion'); gainGold(60, '古びた偶像'); ev.result = '偶像に触れ、60Gを得た。代償として呪い「錯覚」がデッキに刻まれた。'; }
    else ev.result = 'あなたは偶像を無視した。';
  }

  if (ev.key === 'cursedMirror') {
    if (action === 'accept') {
      const pool = rewardCards.filter((cid) => cardDefs[cid].rarity === 'rare');
      const c = pool[Math.floor(Math.random() * pool.length)];
      state.player.deck.push(c);
      state.player.deck.push('regret');
      ev.result = `${cardDefs[c].name}を得たが、呪い「後悔」がデッキに加わった。`;
    } else ev.result = '鏡の囁きを拒み、その場を去った。';
  }

  if (ev.key === 'whisperingCoin') {
    if (action === 'takeCoins') {
      gainGold(90, '囁く金貨');
      state.player.deck.push('shame');
      ev.result = '90Gを得た。代わりに呪い「羞恥」がデッキに加わった。';
    } else ev.result = '金貨に背を向け、先へ進んだ。';
  }

  if (ev.key === 'hexedFountain') {
    if (action === 'drink') {
      const heal = Math.ceil(state.player.maxHp * 0.3);
      state.player.hp = Math.min(state.player.maxHp, state.player.hp + heal);
      state.player.deck.push('doubt');
      ev.result = `泉でHPを${heal}回復した。代償として呪い「疑念」がデッキに加わった。`;
    } else ev.result = '泉には触れず、立ち去った。';
  }

  if (ev.key === 'curseTrader') {
    if (action === 'deal') {
      gainGold(120, '呪詛商との取引');
      state.player.deck.push('pain');
      ev.result = '120Gを得た。代償として呪い「苦痛」がデッキに加わった。';
    } else ev.result = '取引を断った。';
  }

  if (ev.key === 'hollowShrine') {
    if (action === 'purify') {
      const idx = state.player.deck.findIndex((id) => cardDefs[id]?.curseCard && !cardDefs[id]?.unremovable);
      if (idx >= 0) {
        const removed = state.player.deck.splice(idx, 1)[0];
        ev.result = `祠の浄化で呪い「${cardDefs[removed].name}」を取り除いた。`;
      } else ev.result = '浄化を試みたが、取り除ける呪いはなかった。';
    } else if (action === 'boon') {
      state.player.maxHp += 6;
      state.player.hp += 6;
      state.player.deck.push('decay');
      ev.result = '祠の恩恵で最大HP+6。代償として呪い「腐敗」がデッキに加わった。';
    } else ev.result = '祠に一礼して去った。';
  }

  if (ev.key === 'library') {
    if (action === 'study') {
      ev.choices = shuffle(rewardCards.filter((id) => ['uncommon', 'rare', 'legendary'].includes(cardDefs[id].rarity))).slice(0, 5);
      ev.pickMax = 2;
      ev.picked = [];
      ev.selecting = true;
      ev.result = '書庫で習得するカードを選べる。最大2枚。';
      render();
      return;
    }
    if (action.startsWith('libraryPick:')) {
      const id = action.split(':')[1];
      if (!ev.choices?.includes(id) || ev.picked.includes(id)) return;
      state.player.deck.push(id);
      ev.picked.push(id);
      addLog(`書庫で${cardDefs[id].name}を習得。`, 'log-glow-drop');
      if (ev.picked.length >= (ev.pickMax || 2)) { ev.selecting = false; ev.result = `書庫で${ev.picked.map((x) => cardDefs[x].name).join('、')}を習得した。`; ev.resolved = true; addLog(`イベント結果: ${ev.result}`, 'log-glow-drop'); render(); return; }
      render();
      return;
    }
    if (action === 'libraryDone') {
      ev.selecting = false;
      ev.result = ev.picked?.length ? `書庫で${ev.picked.map((x) => cardDefs[x].name).join('、')}を習得した。` : '書庫を後にした。';
    }
    if (action === 'leave') ev.result = '書庫を後にした。';
  }

  ev.resolved = true;
  addLog(`イベント結果: ${ev.result}`, 'log-glow-drop');
  if (state.player.hp <= 0) { state.mode = 'dead'; render(); return; }
  render();
}


function blessingChoices() {
  const hpInc = Math.ceil(state.player.maxHp * 0.25);
  return [
    { id: 'maxhp', text: `最大HPを25%増加（+${hpInc}）` },
    { id: 'gold', text: '100G獲得' },
    { id: 'card', text: 'レアカード1枚獲得' },
    { id: 'relic', text: 'ランダムレリック1個獲得' },
    { id: 'upgrade2', text: '好きなカードを2枚アップグレード' },
    { id: 'upgrade3random', text: 'ランダムなカードを3枚アップグレード' },
  ];
}
function beginBlessingResult(message) {
  state.blessingResult = message;
  state.blessingChoices = [];
  state.mode = 'blessingResult';
}
function startBlessing() {
  state.mode = 'blessing';
  state.blessingResult = '';
  state.blessingUpgradeRemaining = 0;
  state.blessingChoices = shuffle(blessingChoices()).slice(0, 3);
}
function chooseBlessing(id) {
  const pick = state.blessingChoices.find((b) => b.id === id);
  if (!pick) return;

  if (id === 'maxhp') {
    const inc = Math.ceil(state.player.maxHp * 0.25);
    state.player.maxHp += inc;
    state.player.hp += inc;
    addLog(`祝福を受け取った: 最大HP+${inc}`);
    beginBlessingResult(`温かな光に包まれた。祝福により最大HPが${inc}増加した。`);
    render();
    return;
  }

  if (id === 'gold') {
    gainGold(100, '祝福を受け取った');
    beginBlessingResult('幸運が舞い降りた。祝福により100Gを手に入れた。');
    render();
    return;
  }

  if (id === 'card') {
    const pool = rewardCards.filter((cid) => cardDefs[cid].rarity === 'rare' && !cardDefs[cid].upgraded);
    const c = pool[Math.floor(Math.random() * pool.length)];
    state.player.deck.push(c);
    addLog(`祝福で${cardDefs[c].name}を獲得。`);
    beginBlessingResult(`新たな力を得た。祝福の${cardDefs[c].name}を受け取った。`);
    render();
    return;
  }

  if (id === 'relic') {
    const r = shuffle(availableRelics())[0];
    if (r) {
      state.player.relics.push(r);
      if (r.onGain) r.onGain();
      addLog(`祝福で${r.name}を獲得。`);
      beginBlessingResult(`遺物が共鳴した。祝福の${r.name}を受け取った。`);
    } else beginBlessingResult('祝福は静かに消えた。得られるレリックはなかった。');
    render();
    return;
  }

  if (id === 'upgrade2') {
    state.mode = 'blessingUpgrade';
    state.blessingUpgradeRemaining = 2;
    state.blessingResult = '祝福により、好きなカードを2枚強化できる。';
    render();
    return;
  }

  if (id === 'upgrade3random') {
    const upIdx = state.player.deck.map((cid, i) => (cardDefs[cid].upgradeTo ? i : -1)).filter((i) => i >= 0);
    const picks = shuffle(upIdx).slice(0, 3);
    const names = [];
    picks.forEach((idx) => {
      const oldId = state.player.deck[idx];
      names.push(cardDefs[oldId].name);
      state.player.deck[idx] = cardDefs[oldId].upgradeTo;
    });
    addLog(names.length ? `祝福でカードを${picks.length}枚強化: ${names.join('、')}` : '祝福でカードを0枚強化。');
    beginBlessingResult(names.length ? `鋭い啓示を得た。${names.join('、')} が強化された。` : '強化可能なカードがなく、祝福は空を切った。');
    render();
  }
}
function pickBlessingUpgrade(id) {
  if (state.mode !== 'blessingUpgrade') return;
  const idx = state.player.deck.indexOf(id);
  const up = cardDefs[id]?.upgradeTo;
  if (idx < 0 || !up) return;
  state.player.deck[idx] = up;
  state.blessingUpgradeRemaining -= 1;
  addLog(`祝福で${cardDefs[id].name}を強化。`);
  if (state.blessingUpgradeRemaining <= 0) {
    beginBlessingResult('鍛錬の祝福を受けた。選んだ2枚のカードが強化された。');
    render();
    return;
  }
  render();
}

function prepareMap() {
  state.mapText = mapTexts[Math.floor(Math.random() * mapTexts.length)];
  state.nextNode = Math.random() < 0.72 ? 'combat' : 'event';
  state.eliteOffer = isBossFloor(state.floor) || state.nextNode !== 'combat' ? null : (Math.random() < 0.22 ? elitePool[Math.floor(Math.random() * elitePool.length)] : null);
}

function nextFloor() { state.floor += 1; if (state.floor > state.maxFloor) { state.mode = 'win'; render(); return; } state.mode = 'map'; state.eventState = null; state.enemies = []; state.postCombatLocked = false; prepareMap(); render(); }
function saveGame() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); addLog('セーブした。'); }
function loadGame() { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return; const loaded = JSON.parse(raw); loaded.player.relics = (loaded.player.relics || []).map((r) => relicPool.find((x) => x.id === r.id)).filter(Boolean); state = { ...defaultState(), ...loaded, player: { ...defaultState().player, ...loaded.player } }; state.screenMaskLevel = loaded.screenMaskLevel || (loaded.screenHidden ? 2 : 0); document.body.classList.remove('screen-dim', 'screen-hidden'); if (state.screenMaskLevel === 1) document.body.classList.add('screen-dim'); if (state.screenMaskLevel === 2) document.body.classList.add('screen-hidden'); addLog('ロードした。'); render(); }
function restart() { state = defaultState(); document.body.classList.remove('screen-dim', 'screen-hidden'); prepareMap(); startBlessing(); addLog('ニューゲーム開始。'); render(); }
function toggleScreenMask() { state.screenMaskLevel = (state.screenMaskLevel + 1) % 3; state.screenHidden = state.screenMaskLevel === 2; document.body.classList.remove('screen-dim', 'screen-hidden'); if (state.screenMaskLevel === 1) document.body.classList.add('screen-dim'); if (state.screenMaskLevel === 2) document.body.classList.add('screen-hidden'); renderTopControls(); }
function toggleDeck() { state.showDeck = !state.showDeck; render(); }
function toggleRelics() { state.showRelics = !state.showRelics; render(); }
function setTarget(i) { state.selectedTarget = i; render(); }

function renderDeckList() { if (!state.showDeck) return ''; const counts = {}; state.player.deck.forEach((id) => { counts[id] = (counts[id] || 0) + 1; }); return `<div class="deck-view">${Object.entries(counts).map(([id, n]) => `<div class="small ${getCardRarityClass(id)}">・${cardLabel(id)} x${n} - ${cardEffectText(id)}</div>`).join('')}</div>`; }
function renderRelicList() { return state.showRelics ? `<div class="deck-view">${state.player.relics.map((r) => `<div class="small ${getRelicRarityClass(r)}">・${r.name}: ${r.text}</div>`).join('') || '<div class="small">なし</div>'}</div>` : ''; }
function statusLine(s, w, v, d) { const b = []; if (s > 0) b.push(`筋力:${s}`); if (w > 0) b.push(`弱体:${w}`); if (v > 0) b.push(`脆弱:${v}`); if (d > 0) b.push(`脱力:${d}`); return `<p class="status-line">${b.length ? b.join(' / ') : '状態変化なし'}</p>`; }
function hpBar(cur, max) { return `<div class="hp-bar"><span style="width:${Math.round((cur / max) * 100)}%"></span></div>`; }

function renderTopControls() { const h1 = document.querySelector('header h1'); if (h1) h1.innerHTML = `Mini Spire <span class="version">Ver${VERSION}</span>`; el.topControls.innerHTML = `<button id="saveBtn">セーブ</button><button id="screenBtn">${state.screenMaskLevel === 0 ? 'スクリーン' : state.screenMaskLevel === 1 ? 'スクリーン(濃)' : 'スクリーン解除'}</button><button id="loadBtn">ロード</button><button id="restartBtn">ニューゲーム</button>`; document.getElementById('saveBtn').addEventListener('click', saveGame); document.getElementById('screenBtn').addEventListener('click', toggleScreenMask); document.getElementById('loadBtn').addEventListener('click', loadGame); document.getElementById('restartBtn').addEventListener('click', restart); }

function renderHUD() {
  const slots = Array.from({ length: state.player.itemSlots }, (_, i) => state.items[i] || null);
  el.hud.innerHTML = `<div class="grid hud-grid-5"><div class="stat">HP: ${state.player.hp} / ${state.player.maxHp}</div><div class="stat">階層: ${state.floor} / ${state.maxFloor}（エリア${areaOf(state.floor)}）</div><div class="stat">所持金: ${state.gold}G</div><button class="stat deck-btn" id="deckBtn">デッキ: ${state.player.deck.length}枚</button><button class="stat deck-btn" id="relicBtn">所持レリック一覧</button></div><div class="row" style="margin-top:0.5rem;">${slots.map((id, idx) => { if (!id) return '<button class="is-disabled" disabled>空スロット</button>'; const p = itemDefs[id]; const en = !p.combatOnly || state.mode === 'combat'; return `<button data-item-index="${idx}" class="${en ? '' : 'is-disabled'}" ${en ? '' : 'disabled'} title="${p.desc}">${p.name}</button>`; }).join('')}</div>${renderDeckList()}${renderRelicList()}`;
  document.getElementById('deckBtn').addEventListener('click', toggleDeck);
  document.getElementById('relicBtn').addEventListener('click', toggleRelics);
  el.hud.querySelectorAll('[data-item-index]').forEach((btn) => btn.addEventListener('click', () => useItemAt(Number(btn.dataset.itemIndex))));
}

function renderState() {
  if (state.mode === 'combat') {
    const enemiesHtml = state.enemies.map((e, i) => `<button data-tip="危険度:${e.danger || (e.isElite ? 9 : 10)} / 報酬:${e.gold || 0}G" class="panel enemy-panel enemy-card ${Date.now() < (e.damageFlashUntil || 0) ? 'damage-flash' : ''} ${currentTarget() === e ? 'selected-target' : ''} ${e.hp <= 0 ? 'is-disabled' : ''}" data-target="${i}" ${e.hp <= 0 ? 'disabled' : ''}><h3 class="${hpToneClass(Math.max(0, e.hp), e.maxHp)}">${e.name}</h3><p class="${hpClass(Math.max(0, e.hp), e.maxHp)}">HP ${e.maxHp} - ${Math.max(0, e.hp)} / ブロック: <span class="block">${e.block}</span></p>${hpBar(Math.max(0, e.hp), e.maxHp)}${statusLine(e.strength || 0, e.weak || 0, e.vuln || 0, e.drain || 0)}<p class="intent ${intentClass(e.intent)}">行動予告: <strong>${e.hp > 0 ? intentText(e) : '撃破済み'}</strong></p></button>`).join('');
    el.state.innerHTML = `<div class="status-grid"><div id="playerPanel" class="panel player-panel ${Date.now() < state.playerDamageFlashUntil ? 'damage-flash' : ''}"><h3>あなた</h3><p class="${hpClass(state.player.hp, state.player.maxHp)}">HP ${state.player.maxHp} - ${state.player.hp} / ブロック: <span class="block">${state.player.block}</span></p>${hpBar(state.player.hp, state.player.maxHp)}${statusLine(playerStrength(), state.player.weak, state.player.vuln, state.player.drain)}</div></div><div class="enemy-grid">${enemiesHtml}</div>`;
    document.querySelectorAll('[data-target]').forEach((b) => b.addEventListener('click', () => setTarget(Number(b.dataset.target))));
    return;
  }
  if (state.mode === 'blessing') { el.state.innerHTML = '<h2>祝福</h2><p>冒険の始まりに、3つの祝福から1つ選んでください。</p>'; return; }
  if (state.mode === 'blessingUpgrade') { el.state.innerHTML = `<h2>祝福</h2><p>${state.blessingResult}</p><p>残り強化回数: ${state.blessingUpgradeRemaining}</p>`; return; }
  if (state.mode === 'blessingResult') { el.state.innerHTML = `<h2>祝福</h2><p>${state.blessingResult}</p>`; return; }
  if (state.mode === 'event') { const ev = state.eventState; el.state.innerHTML = ev ? `<h2>${ev.title}</h2><p>${ev.text}</p>${ev.resolved ? `<p>${ev.result}</p>` : ''}` : '<h2>イベント</h2>'; return; }
  if (state.mode === 'combatWin') { el.state.innerHTML = '<h2>戦闘勝利</h2><p>戦利品を確認する。</p>'; return; }

  if (state.mode === 'map') { if (isBossFloor(state.floor)) { el.state.innerHTML = `<h2>エリア${areaOf(state.floor)} 最終層</h2><p>重い殺気が漂う。ボスが待っている…。</p>`; return; } el.state.innerHTML = `<h2>次の階層へ進む（エリア${areaOf(state.floor)}）</h2><p>${state.nextNode === 'event' ? '不思議な気配が漂っている。' : (state.eliteOffer ? '強い気配を感じる。' : state.mapText)}</p>`; return; }
  if (state.mode === 'reward') { el.state.innerHTML = '<h2>戦利品</h2><p>報酬を選択。</p>'; return; }
  if (state.mode === 'bossRelic') { el.state.innerHTML = '<h2>ボスレリック報酬</h2><p>強力なレリックを1つ選択。</p>'; return; }
  if (state.mode === 'postCombat') { el.state.innerHTML = `<h2>戦闘後イベント</h2><p>${state.postCombatLocked ? '次の階層へ進もう。' : '焚火かショップを1つ選べる。'}</p>`; return; }
  if (state.mode === 'shop') { el.state.innerHTML = '<h2>ショップ</h2>'; return; }
  if (state.mode === 'camp') { el.state.innerHTML = '<h2>焚き火</h2>'; return; }
  if (state.mode === 'win') { el.state.innerHTML = '<h2>踏破成功！</h2>'; return; }
  if (state.mode === 'dead') { el.state.innerHTML = '<h2>ゲームオーバー</h2>'; }
}

function renderActions() {
  if (state.mode === 'combat') {
    const drawCount = state.player.draw.length;
    const discardCount = state.player.discard.length;
    const pile = state.combatPileView === 'draw' ? state.player.draw : state.combatPileView === 'discard' ? state.player.discard : [];
    const pileTitle = state.combatPileView === 'draw' ? '山札' : state.combatPileView === 'discard' ? '捨札' : '';
    el.actions.innerHTML = `<div class="small">エナジー【 ${state.player.energy} / ${state.player.maxEnergy} 】</div><div class="row" style="margin-top:0.35rem;">${state.player.hand.map((id, i) => `<button class="card-button ${getCardRarityClass(id)}${(cardDefs[id].cost > state.player.energy || cardDefs[id].unplayable) ? ' is-disabled' : ''}" ${(cardDefs[id].cost > state.player.energy || cardDefs[id].unplayable) ? 'disabled' : ''} data-play="${i}">${cardLabel(id)}<br><span class="small">${cardEffectText(id)}</span></button>`).join('')}</div><div class="row" style="margin-top:0.6rem;"><button id="endTurn">ターン終了</button><button id="viewDraw">山札(${drawCount})</button><button id="viewDiscard">捨札(${discardCount})</button></div>${state.combatPileView ? `<div class="deck-view" style="margin-top:0.5rem;"><div class="small">${pileTitle}</div>${pile.map((id) => `<div class="small ${getCardRarityClass(id)}">・${cardLabel(id)} - ${cardEffectText(id)}</div>`).join('') || '<div class="small">空です</div>'}</div>` : ''}`;
    el.actions.querySelectorAll('[data-play]').forEach((b) => b.addEventListener('click', () => { b.classList.add('card-burst'); const idx = Number(b.dataset.play); setTimeout(() => playCard(idx), 260); }));
    document.getElementById('endTurn').addEventListener('click', endTurn);
    document.getElementById('viewDraw').addEventListener('click', () => toggleCombatPileView('draw'));
    document.getElementById('viewDiscard').addEventListener('click', () => toggleCombatPileView('discard'));
    return;
  }

  if (state.mode === 'blessing') {
    el.actions.innerHTML = `<div class="row">${state.blessingChoices.map((b) => `<button data-bless="${b.id}">${b.text}</button>`).join('')}</div>`;
    el.actions.querySelectorAll('[data-bless]').forEach((b) => b.addEventListener('click', () => chooseBlessing(b.dataset.bless)));
    return;
  }

  if (state.mode === 'blessingUpgrade') {
    const candidates = [...new Set(state.player.deck.filter((id) => cardDefs[id].upgradeTo))];
    el.actions.innerHTML = `<div class="row">${candidates.map((id) => `<button data-bup="${id}" class="${getCardRarityClass(id)}">${cardLabel(id)}<br><span class="small">前: ${cardEffectText(id)}<br>後: ${cardEffectText(cardDefs[id].upgradeTo)}</span></button>`).join('') || '<div class="small">強化可能なカードがありません。</div>'}</div>${candidates.length === 0 ? '<div class="row" style="margin-top:0.5rem;"><button id="skipBlessUp">次へ</button></div>' : ''}`;
    el.actions.querySelectorAll('[data-bup]').forEach((b) => b.addEventListener('click', () => pickBlessingUpgrade(b.dataset.bup)));
    const skip = document.getElementById('skipBlessUp'); if (skip) skip.addEventListener('click', () => { beginBlessingResult('強化可能なカードは見つからなかった。'); render(); });
    return;
  }

  if (state.mode === 'blessingResult') {
    el.actions.innerHTML = '<button id="startAfterBless">出発する</button>';
    document.getElementById('startAfterBless').addEventListener('click', () => { state.mode = 'map'; render(); });
    return;
  }


  if (state.mode === 'combatWin') { el.actions.innerHTML = '<button id="toReward">報酬画面へ</button>'; document.getElementById('toReward').addEventListener('click', finalizeVictoryToReward); return; }

  if (state.mode === 'bossRelic') {
    const all = state.bossRelicChoices || [];
    const finishText = state.bossRelicTaken ? '次のエリアへ進む' : 'ボスレリックをスキップして進む';
    el.actions.innerHTML = `<div class="row">${all.map((r) => `<button data-boss-relic="${r.id}" class="${getRelicRarityClass(r)} ${state.bossRelicTaken ? 'is-disabled' : ''}" ${state.bossRelicTaken ? 'disabled' : ''} data-tip="${r.text}">${r.name}<br><span class="small">${r.text}</span></button>`).join('')}</div><div class="row" style="margin-top:0.5rem;"><button id="bossRelicNext">${finishText}</button></div>`;
    el.actions.querySelectorAll('[data-boss-relic]').forEach((b) => b.addEventListener('click', () => chooseBossRelic(b.dataset.bossRelic)));
    document.getElementById('bossRelicNext').addEventListener('click', nextFloor);
    return;
  }

  if (state.mode === 'event') {
    const ev = state.eventState;
    if (!ev) { el.actions.innerHTML = ''; return; }
    if (ev.resolved) { el.actions.innerHTML = '<button id="nextFloor">次の階層へ</button>'; document.getElementById('nextFloor').addEventListener('click', nextFloor); return; }
    if (ev.key === 'chest') { el.actions.innerHTML = '<button id="evOpen">開ける</button><button id="evLeave">開けない</button>'; document.getElementById('evOpen').addEventListener('click', () => resolveEvent('open')); document.getElementById('evLeave').addEventListener('click', () => resolveEvent('leave')); return; }
    if (ev.key === 'fountain') { el.actions.innerHTML = '<button id="evHeal">HPを20%回復</button><button id="evMax">最大HP10%アップ</button>'; document.getElementById('evHeal').addEventListener('click', () => resolveEvent('heal')); document.getElementById('evMax').addEventListener('click', () => resolveEvent('max')); return; }
    if (ev.key === 'altar') { const small = ev.smallLoss || Math.ceil(state.player.maxHp * 0.08); const large = ev.largeLoss || Math.ceil(state.player.maxHp * 0.16); el.actions.innerHTML = `<button id="evOfferSmall">小さく捧げる（HP-${small} / 35G）</button><button id="evOfferLarge">大きく捧げる（HP-${large} / 80G）</button><button id="evIgnore">立ち去る</button>`; document.getElementById('evOfferSmall').addEventListener('click', () => resolveEvent('offerSmall')); document.getElementById('evOfferLarge').addEventListener('click', () => resolveEvent('offerLarge')); document.getElementById('evIgnore').addEventListener('click', () => resolveEvent('ignore')); return; }
    if (ev.key === 'merchant') { el.actions.innerHTML = '<button id="evTake">拾う</button><button id="evPass">無視する</button>'; document.getElementById('evTake').addEventListener('click', () => resolveEvent('take')); document.getElementById('evPass').addEventListener('click', () => resolveEvent('pass')); return; }
    if (ev.key === 'idol') { el.actions.innerHTML = '<button id="evTouch">触れる（リターン:60G / リスク: 呪い「錯覚」追加）</button><button id="evBack">引き返す（変化なし）</button>'; document.getElementById('evTouch').addEventListener('click', () => resolveEvent('touch')); document.getElementById('evBack').addEventListener('click', () => resolveEvent('back')); return; }
    if (ev.key === 'cursedMirror') { el.actions.innerHTML = '<button id="evMirrorAccept">受け入れる（リターン:レアカード1枚 / リスク: 呪い「後悔」追加）</button><button id="evMirrorLeave">拒む（変化なし）</button>'; document.getElementById('evMirrorAccept').addEventListener('click', () => resolveEvent('accept')); document.getElementById('evMirrorLeave').addEventListener('click', () => resolveEvent('leave')); return; }
    if (ev.key === 'whisperingCoin') { el.actions.innerHTML = '<button id="evCoinTake">拾う（リターン:90G / リスク: 呪い「羞恥」追加）</button><button id="evCoinLeave">無視する（変化なし）</button>'; document.getElementById('evCoinTake').addEventListener('click', () => resolveEvent('takeCoins')); document.getElementById('evCoinLeave').addEventListener('click', () => resolveEvent('leave')); return; }
    if (ev.key === 'hexedFountain') { el.actions.innerHTML = '<button id="evHexDrink">飲む（リターン:HP30%回復 / リスク: 呪い「疑念」追加）</button><button id="evHexLeave">立ち去る（変化なし）</button>'; document.getElementById('evHexDrink').addEventListener('click', () => resolveEvent('drink')); document.getElementById('evHexLeave').addEventListener('click', () => resolveEvent('leave')); return; }
    if (ev.key === 'curseTrader') { el.actions.innerHTML = '<button id="evTraderDeal">取引する（リターン:120G / リスク: 呪い「苦痛」追加）</button><button id="evTraderPass">断る（変化なし）</button>'; document.getElementById('evTraderDeal').addEventListener('click', () => resolveEvent('deal')); document.getElementById('evTraderPass').addEventListener('click', () => resolveEvent('pass')); return; }
    if (ev.key === 'hollowShrine') { el.actions.innerHTML = '<button id="evShrinePurify">浄化（リターン:呪い1枚除去）</button><button id="evShrineBoon">恩恵を受ける（リターン:最大HP+6 / リスク: 呪い「腐敗」追加）</button><button id="evShrineLeave">立ち去る</button>'; document.getElementById('evShrinePurify').addEventListener('click', () => resolveEvent('purify')); document.getElementById('evShrineBoon').addEventListener('click', () => resolveEvent('boon')); document.getElementById('evShrineLeave').addEventListener('click', () => resolveEvent('leave')); return; }
    if (ev.key === 'library' && ev.selecting) {
      const remain = (ev.pickMax || 2) - (ev.picked?.length || 0);
      el.actions.innerHTML = `<p class="small">書庫: 5択から最大2枚（残り${remain}）</p><div class="row">${(ev.choices || []).map((id) => `<button data-lib-pick="${id}" class="${getCardRarityClass(id)} ${(ev.picked || []).includes(id) ? 'is-disabled' : ''}" ${(ev.picked || []).includes(id) ? 'disabled' : ''}>${cardLabel(id)}<br><span class="small">${cardEffectText(id)}</span></button>`).join('')}</div><div class="row" style="margin-top:0.5rem;"><button id="evDoneLib">選択を終える</button></div>`;
      el.actions.querySelectorAll('[data-lib-pick]').forEach((b) => b.addEventListener('click', () => resolveEvent(`libraryPick:${b.dataset.libPick}`)));
      document.getElementById('evDoneLib').addEventListener('click', () => resolveEvent('libraryDone'));
      return;
    }
    el.actions.innerHTML = '<button id="evStudy">読む（5枚提示、最大2枚獲得）</button><button id="evLeaveLib">立ち去る</button>'; document.getElementById('evStudy').addEventListener('click', () => resolveEvent('study')); document.getElementById('evLeaveLib').addEventListener('click', () => resolveEvent('leave')); return;
  }

  if (state.mode === 'map') {
    if (isBossFloor(state.floor)) { const boss = bossPool[(areaOf(state.floor) - 1) % bossPool.length]; el.actions.innerHTML = '<button id="startBoss">ボス戦に挑む</button>'; document.getElementById('startBoss').addEventListener('click', () => startCombat(boss)); return; }
    if (state.nextNode === 'event') { el.actions.innerHTML = '<button id="goEvent">イベントへ進む</button>'; document.getElementById('goEvent').addEventListener('click', openEvent); return; }
    if (state.eliteOffer) { el.actions.innerHTML = '<div class="row"><button id="startElite">エリート戦に挑む</button><button id="startNormal">通常戦闘にする</button></div>'; document.getElementById('startElite').addEventListener('click', () => startCombat(state.eliteOffer)); document.getElementById('startNormal').addEventListener('click', () => startCombat()); return; }
    el.actions.innerHTML = '<button id="startFight">戦闘開始</button>'; document.getElementById('startFight').addEventListener('click', () => startCombat()); return;
  }

  if (state.mode === 'reward') {
    const relic = state.relicChoices[0];
    const drop = state.dropItemChoices?.[0];
    const allTaken = state.rewardTaken && (state.relicTaken || !relic) && (state.itemTaken || !drop);
    const finishText = state.pendingBossRelic ? (allTaken ? 'ボスレリック選択へ進む' : '報酬をスキップしてボスレリック選択へ') : (allTaken ? '次の階層へ進む' : '報酬をスキップして進む');
    el.actions.innerHTML = `<div class="row">${state.rewardChoices.map((id) => `<button data-reward="${id}" class="reward-choice-glow ${getCardRarityClass(id)} ${state.rewardTaken ? 'is-disabled' : ''}" ${state.rewardTaken ? 'disabled' : ''}>${cardLabel(id)}<br><span class="small">${cardEffectText(id)}</span></button>`).join('')}</div>${relic ? `<div class="row" style="margin-top:0.5rem;"><button id="takeRelic" data-tip="${relic.text}" class="reward-choice-glow ${getRelicRarityClass(relic)}" ${state.relicTaken ? 'disabled class="is-disabled"' : ''}>レリック獲得: ${relic.name}</button></div>` : ''}${drop ? `<div class="row" style="margin-top:0.5rem;"><button id="takeDrop" class="reward-choice-glow ${getItemRarityClass(drop)} ${state.itemTaken ? 'is-disabled' : ''}" ${state.itemTaken ? 'disabled' : ''}>アイテム獲得: ${itemDefs[drop].name}<br><span class="small">${itemDefs[drop].desc}</span></button></div>` : ''}<div class="row" style="margin-top:0.5rem;"><button id="finishReward">${finishText}</button></div>`;
    el.actions.querySelectorAll('[data-reward]').forEach((b) => b.addEventListener('click', () => takeReward(b.dataset.reward)));
    if (relic) document.getElementById('takeRelic').addEventListener('click', () => chooseRelic(relic.id));
    if (drop) document.getElementById('takeDrop').addEventListener('click', () => takeDropItem(drop));
    document.getElementById('finishReward').addEventListener('click', () => {
      if (state.pendingBossRelic) { state.pendingBossRelic = false; state.mode = 'bossRelic'; render(); return; }
      state.mode = 'postCombat';
      render();
    });
    return;
  }

  if (state.mode === 'postCombat') { el.actions.innerHTML = `<div class="row"><button id="toCamp" ${state.postCombatLocked ? 'disabled class="is-disabled"' : ''}>焚き火へ</button><button id="toShop" ${state.postCombatLocked ? 'disabled class="is-disabled"' : ''}>ショップへ</button><button id="nextFloor">次の階層へ</button></div>`; if (!state.postCombatLocked) { document.getElementById('toCamp').addEventListener('click', enterCamp); document.getElementById('toShop').addEventListener('click', enterShop); } document.getElementById('nextFloor').addEventListener('click', nextFloor); return; }

  if (state.mode === 'shop') {
    el.actions.innerHTML = `<p class="small">カード購入</p><div class="row">${state.shopChoices.map((c) => `<button data-buy="${c.id}" data-price="${c.price}" class="${getCardRarityClass(c.id)} ${state.gold < c.price ? 'is-disabled' : ''}" ${state.gold < c.price ? 'disabled' : ''}>${cardLabel(c.id)}<br><span class="small">${cardEffectText(c.id)} / ${c.price}G</span></button>`).join('')}</div><p class="small">アイテム購入</p><div class="row">${state.shopItemChoices.map((p) => `<button data-buy-item="${p.id}" data-price="${p.price}" class="${getItemRarityClass(p.id)} ${(state.items.length >= state.player.itemSlots || state.gold < p.price) ? 'is-disabled' : ''}" ${(state.items.length >= state.player.itemSlots || state.gold < p.price) ? 'disabled' : ''}>${itemDefs[p.id].name}<br><span class="small">${itemDefs[p.id].desc} / ${p.price}G</span></button>`).join('')}</div><p class="small">レリック購入</p><div class="row">${state.shopRelicChoices.map((r) => { const relic = relicPool.find((x) => x.id === r.id); return `<button data-buy-relic="${r.id}" data-price="${r.price}" class="${getRelicRarityClass(relic)} ${state.gold < r.price ? 'is-disabled' : ''}" ${state.gold < r.price ? 'disabled' : ''}>${relic.name}<br><span class="small">${relic.text} / ${r.price}G</span></button>`; }).join('') || '<span class="small">在庫なし</span>'}</div><div class="row" style="margin-top:0.6rem;"><button id="leaveShop">ショップを出る</button></div>`;
    el.actions.querySelectorAll('[data-buy]').forEach((b) => b.addEventListener('click', () => buyCard(b.dataset.buy, Number(b.dataset.price))));
    el.actions.querySelectorAll('[data-buy-item]').forEach((b) => b.addEventListener('click', () => buyItem(b.dataset.buyItem, Number(b.dataset.price))));
    el.actions.querySelectorAll('[data-buy-relic]').forEach((b) => b.addEventListener('click', () => buyRelic(b.dataset.buyRelic, Number(b.dataset.price))));
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

  el.actions.innerHTML = '<button id="restartAction">最初からプレイ</button>';
  document.getElementById('restartAction').addEventListener('click', restart);
}

function renderLog() { el.log.innerHTML = state.log.map((x) => { const item = typeof x === 'string' ? { text: x, cls: '' } : x; return `<div class="log-entry ${item.cls || ''}">${item.text ?? ''}</div>`; }).join(''); }
el.actions.addEventListener('click', (e) => {
  const t = e.target;
  if (t && t.id === 'restartAction') restart();
});

function render() { renderTopControls(); renderHUD(); renderState(); renderActions(); renderLog(); }

prepareMap();
startBlessing();
addLog('探索開始。');
render();
