/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { GameTableService } from '../../core/services/game-table.service';
import { finalize } from 'rxjs';

interface Creator {
  _id: string;
  name: string;
}

// Match this interface exactly to the objects INSIDE the data.gameTables array
interface Table {
  title: string;
  system: string;
  description: string;
  createdBy?: Creator;
  time: Date;
  players?: any[];
  image?: string;
  maxPlayers: number;
  status: 'OPEN' | 'WAITING' | 'CLOSED' | 'FULL' | string; // Adjust the possible status values as needed
}

@Component({
  selector: 'app-home',
  imports: [PrimeNgModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly gameTableService = inject(GameTableService);
  tables: Table[] = [];
  isLoading?: boolean = false;
  errorLoading?: boolean = false;

  layout: 'grid' | 'list' = 'grid';
  layoutOptions?: any[] = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ];

  pagination = {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
    first: 0,
  };

  filters = {
    system: undefined,
    title: '',
    status: undefined,
    duration: undefined,
  };

  systemOptions = [
    { label: 'D&D 5ª Edição', value: 'DND_5E' },
    { label: 'D&D 3.5', value: 'DND_3_5' },
    { label: 'D&D 4ª Edição', value: 'DND_4E' },
    { label: 'D&D Old School', value: 'DND_OLD_SCHOOL' },
    { label: 'Pathfinder', value: 'PATHFINDER' },
    { label: 'Pathfinder 2E', value: 'PATHFINDER_2E' },
    { label: 'Call of Cthulhu', value: 'CALL_OF_CTHULHU' },
    { label: 'GURPS', value: 'GURPS' },
    { label: 'Vampiro: A Máscara', value: 'VAMPIRE_THE_MASQUERADE' },
    { label: 'Vampiro: Idade das Trevas', value: 'VAMPIRE_DARK_AGES' },
    { label: 'Lobisomem: O Apocalipse', value: 'WEREWOLF_APOCALYPSE' },
    { label: 'Mago: A Ascensão', value: 'MAGE_ASCENSION' },
    { label: 'Mago: O Despertar', value: 'MAGE_AWAKENING' },
    { label: 'Cyberpunk 2020', value: 'CYBERPUNK_2020' },
    { label: 'Cyberpunk RED', value: 'CYBERPUNK_RED' },
    { label: 'Shadowrun', value: 'SHADOWRUN' },
    { label: 'TORG', value: 'TORG' },
    { label: 'Mutantes & Malfeitores', value: 'MUTANTS_AND_MASTERMINDS' },
    { label: 'Savage Worlds', value: 'SAVAGE_WORLDS' },
    { label: 'Starfinder', value: 'STARFINDER' },
    { label: 'Stars Without Number', value: 'STARS_WITHOUT_NUMBER' },
    { label: 'Traveller', value: 'TRAVELLER' },
    { label: 'FATE', value: 'FATE' },
    { label: 'FATE Acelerado', value: 'FATE_ACCELERATED' },
    { label: 'FATE Core', value: 'FATE_CORE' },
    { label: '13th Age', value: '13TH_AGE' },
    { label: 'Warhammer Fantasy', value: 'WARHAMMER_FANTASY' },
    { label: 'Warhammer 40K', value: 'WARHAMMER_40K' },
    { label: 'Delta Green', value: 'DELTA_GREEN' },
    { label: 'Monster of the Week', value: 'MONSTER_OF_THE_WEEK' },
    { label: 'Apocalypse World', value: 'APOCALYPSE_WORLD' },
    { label: 'Blades in the Dark', value: 'BLADES_IN_THE_DARK' },
    { label: 'Forged in the Dark', value: 'FORGED_IN_THE_DARK' },
    { label: 'Dungeon World', value: 'DUNGEON_WORLD' },
    { label: 'Ironsworn', value: 'IRONSWORN' },
    { label: 'Vaesen', value: 'VAESEN' },
    { label: 'Alien RPG', value: 'ALIEN_RPG' },
    { label: 'Numenera', value: 'NUMENERA' },
    { label: 'The Strange', value: 'THE_STRANGE' },
    { label: 'BESM', value: 'BESM' },
    { label: 'Anima: Beyond Fantasy', value: 'ANIMA_BEYOND_FANTASY' },
    { label: 'Rolemaster', value: 'ROLEMASTER' },
    { label: 'Arcanum', value: 'ARCANUM' },
    { label: 'Kult', value: 'KULT' },
    { label: 'Dark Heresy', value: 'DARK_HERESY' },
    { label: 'Cortex', value: 'CORTEX' },
    { label: 'Genesys', value: 'GENESYS' },
    { label: 'Troika', value: 'TROIKA' },
    { label: 'OSRIC', value: 'OSRIC' },
    { label: 'Lancer', value: 'LANCER' },
    { label: 'Tunnels & Trolls', value: 'TUNNELS_AND_TROLLS' },
    { label: 'Cypher System', value: 'CYPHER_SYSTEM' },
    { label: 'Outro', value: 'CUSTOM' },
  ];

  statusOptions = [
    { label: 'Abertas', value: 'OPEN' },
    { label: 'Fechadas', value: 'CLOSED' },
    { label: 'Em progresso', value: 'IN_PROGRESS' },
  ];

  durationOptions = [
    { label: 'One Shot', value: 'ONE_SHOT' },
    { label: 'Curta', value: 'SHORT' },
    { label: 'Média', value: 'MEDIUM' },
    { label: 'Longa', value: 'LONG' },
  ];

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.isLoading = true;
    this.errorLoading = false;
    const page = this.pagination.page;
    const limit = this.pagination.limit;
    this.gameTableService
      .listAvailableTables(page, limit, this.filters.status, this.filters.system, this.filters.title, this.filters.duration)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res: any) => {
          this.tables = res.response.gameTables;
          this.pagination.totalItems = res?.response?.pagination?.totalItems || 0;
          this.pagination.totalPages = res?.response?.pagination?.totalPages || 1;
        },
        error: err => {
          console.error('Erro ao buscar mesas:', err);
          this.errorLoading = true;
        },
      });
  }

  onPageChange(event: any): void {
    this.pagination.page = event.page + 1;
    this.pagination.limit = event.rows;
    this.loadTables();
  }

  join(tableId: string): void {
    console.log(`Tentando entrar na mesa ${tableId}`);
    alert(`Funcionalidade "Entrar na Mesa ${tableId}" ainda não implementada.`);
  }

  isTableFull(table: Table): boolean {
    return (table.players?.length || 0) >= table.maxPlayers;
  }
}
