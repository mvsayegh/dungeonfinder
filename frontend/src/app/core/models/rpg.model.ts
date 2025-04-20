// Tipos literais para o sistema e status
export type RPGSystem =
  | 'DND_5E'
  | 'DND_3_5'
  | 'DND_4E'
  | 'DND_OLD_SCHOOL'
  | 'PATHFINDER'
  | 'PATHFINDER_2E'
  | 'CALL_OF_CTHULHU'
  | 'GURPS'
  | 'VAMPIRE_THE_MASQUERADE'
  | 'VAMPIRE_DARK_AGES'
  | 'WEREWOLF_APOCALYPSE'
  | 'MAGE_ASCENSION'
  | 'MAGE_AWAKENING'
  | 'CYBERPUNK_2020'
  | 'CYBERPUNK_RED'
  | 'SHADOWRUN'
  | 'TORG'
  | 'MUTANTS_AND_MASTERMINDS'
  | 'SAVAGE_WORLDS'
  | 'STARFINDER'
  | 'STARS_WITHOUT_NUMBER'
  | 'TRAVELLER'
  | 'FATE'
  | 'FATE_ACCELERATED'
  | 'FATE_CORE'
  | '13TH_AGE'
  | 'WARHAMMER_FANTASY'
  | 'WARHAMMER_40K'
  | 'DELTA_GREEN'
  | 'MONSTER_OF_THE_WEEK'
  | 'APOCALYPSE_WORLD'
  | 'BLADES_IN_THE_DARK'
  | 'FORGED_IN_THE_DARK'
  | 'DUNGEON_WORLD'
  | 'IRONSWORN'
  | 'VAESEN'
  | 'ALIEN_RPG'
  | 'NUMENERA'
  | 'THE_STRANGE'
  | 'BESM'
  | 'ANIMA_BEYOND_FANTASY'
  | 'ROLEMASTER'
  | 'ARCANUM'
  | 'KULT'
  | 'DARK_HERESY'
  | 'CORTEX'
  | 'GENESYS'
  | 'TROIKA'
  | 'OSRIC'
  | 'LANCER'
  | 'TUNNELS_AND_TROLLS'
  | 'CYPHER_SYSTEM'
  | 'CUSTOM';

export type RPGStatus = 'OPEN' | 'CLOSED' | 'IN_PROGRESS';

// Arrays com os valores, usando "as const" para manter o tipo literal
export const RPG_SYSTEMS: readonly RPGSystem[] = [
  'DND_5E',
  'DND_3_5',
  'DND_4E',
  'DND_OLD_SCHOOL',
  'PATHFINDER',
  'PATHFINDER_2E',
  'CALL_OF_CTHULHU',
  'GURPS',
  'VAMPIRE_THE_MASQUERADE',
  'VAMPIRE_DARK_AGES',
  'WEREWOLF_APOCALYPSE',
  'MAGE_ASCENSION',
  'MAGE_AWAKENING',
  'CYBERPUNK_2020',
  'CYBERPUNK_RED',
  'SHADOWRUN',
  'TORG',
  'MUTANTS_AND_MASTERMINDS',
  'SAVAGE_WORLDS',
  'STARFINDER',
  'STARS_WITHOUT_NUMBER',
  'TRAVELLER',
  'FATE',
  'FATE_ACCELERATED',
  'FATE_CORE',
  '13TH_AGE',
  'WARHAMMER_FANTASY',
  'WARHAMMER_40K',
  'DELTA_GREEN',
  'MONSTER_OF_THE_WEEK',
  'APOCALYPSE_WORLD',
  'BLADES_IN_THE_DARK',
  'FORGED_IN_THE_DARK',
  'DUNGEON_WORLD',
  'IRONSWORN',
  'VAESEN',
  'ALIEN_RPG',
  'NUMENERA',
  'THE_STRANGE',
  'BESM',
  'ANIMA_BEYOND_FANTASY',
  'ROLEMASTER',
  'ARCANUM',
  'KULT',
  'DARK_HERESY',
  'CORTEX',
  'GENESYS',
  'TROIKA',
  'OSRIC',
  'LANCER',
  'TUNNELS_AND_TROLLS',
  'CYPHER_SYSTEM',
  'CUSTOM',
];

export const RPG_STATUSES: readonly RPGStatus[] = ['OPEN', 'CLOSED', 'IN_PROGRESS'];

// Labels para os sistemas RPG
export const RPG_SYSTEM_LABELS: Record<RPGSystem, string> = {
  DND_5E: 'D&D 5ª Edição',
  DND_3_5: 'D&D 3.5',
  DND_4E: 'D&D 4ª Edição',
  DND_OLD_SCHOOL: 'D&D Old School',
  PATHFINDER: 'Pathfinder',
  PATHFINDER_2E: 'Pathfinder 2ª Edição',
  CALL_OF_CTHULHU: 'Chamado de Cthulhu',
  GURPS: 'GURPS',
  VAMPIRE_THE_MASQUERADE: 'Vampiro: A Máscara',
  VAMPIRE_DARK_AGES: 'Vampiro: Idade das Trevas',
  WEREWOLF_APOCALYPSE: 'Lobisomem: O Apocalipse',
  MAGE_ASCENSION: 'Mago: A Ascensão',
  MAGE_AWAKENING: 'Mago: O Despertar',
  CYBERPUNK_2020: 'Cyberpunk 2020',
  CYBERPUNK_RED: 'Cyberpunk RED',
  SHADOWRUN: 'Shadowrun',
  TORG: 'TORG',
  MUTANTS_AND_MASTERMINDS: 'Mutantes e Malfeitores',
  SAVAGE_WORLDS: 'Savage Worlds',
  STARFINDER: 'Starfinder',
  STARS_WITHOUT_NUMBER: 'Stars Without Number',
  TRAVELLER: 'Traveller',
  FATE: 'FATE',
  FATE_ACCELERATED: 'FATE Acelerado',
  FATE_CORE: 'FATE Core',
  '13TH_AGE': '13th Age',
  WARHAMMER_FANTASY: 'Warhammer Fantasy',
  WARHAMMER_40K: 'Warhammer 40k',
  DELTA_GREEN: 'Delta Green',
  MONSTER_OF_THE_WEEK: 'Monstro da Semana',
  APOCALYPSE_WORLD: 'Apocalypse World',
  BLADES_IN_THE_DARK: 'Blades in the Dark',
  FORGED_IN_THE_DARK: 'Forged in the Dark',
  DUNGEON_WORLD: 'Dungeon World',
  IRONSWORN: 'Ironsworn',
  VAESEN: 'Vaesen',
  ALIEN_RPG: 'Alien RPG',
  NUMENERA: 'Numenera',
  THE_STRANGE: 'The Strange',
  BESM: 'BESM (Big Eyes, Small Mouth)',
  ANIMA_BEYOND_FANTASY: 'Anima: Beyond Fantasy',
  ROLEMASTER: 'Rolemaster',
  ARCANUM: 'Arcanum',
  KULT: 'Kult',
  DARK_HERESY: 'Dark Heresy',
  CORTEX: 'Cortex',
  GENESYS: 'Genesys',
  TROIKA: 'Troika!',
  OSRIC: 'OSRIC',
  LANCER: 'Lancer',
  TUNNELS_AND_TROLLS: 'Tunnels & Trolls',
  CYPHER_SYSTEM: 'Cypher System',
  CUSTOM: 'Outro',
};

// Labels para os status RPG
export const RPG_STATUS_LABELS: Record<RPGStatus, string> = {
  OPEN: 'Aberta',
  CLOSED: 'Fechada',
  IN_PROGRESS: 'Em andamento',
};
