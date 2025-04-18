import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RPGDataService {
  private readonly rpgSystems = [
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

  private readonly rpgStatuses = ['OPEN', 'CLOSED', 'IN_PROGRESS'];

  getRPGSystems() {
    return this.rpgSystems.map(system => ({ label: system, value: system }));
  }

  getRPGStatuses() {
    return this.rpgStatuses.map(status => ({ label: status, value: status }));
  }
}
