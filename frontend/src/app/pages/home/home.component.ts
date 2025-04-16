/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { GameTableService } from '../../core/services/game-table.service';
import { finalize } from 'rxjs';
import { NgClass } from '@angular/common';

interface GameMaster {
  _id: string;
  name: string;
}

// Match this interface exactly to the objects INSIDE the data.gameTables array
interface Table {
  title: string;
  system: string;
  description: string;
  gameMasterId?: GameMaster;
  time: Date;
  players?: any[];
  image?: string;
  maxPlayers: number;
  status: 'OPEN' | 'WAITING' | 'CLOSED' | 'FULL' | string; // Adjust the possible status values as needed
}

@Component({
  selector: 'app-home',
  imports: [PrimeNgModule, NgClass],
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
  };

  systemOptions = [
    { label: 'D&D 5e', value: 'DND_5E' },
    { label: 'Tormenta', value: 'TOR' },
    { label: 'Call of Cthulhu', value: 'COC' },
    { label: 'Outro', value: 'OUTRO' },
  ];

  statusOptions = [
    { label: 'Abertas', value: 'OPEN' },
    { label: 'Fechadas', value: 'CLOSED' },
    { label: 'Em progresso', value: 'IN_PROGRESS' },
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
      .listAvailableTables(page, limit, this.filters.status, this.filters.system, this.filters.title)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response: any) => {
          this.tables = response.gameTables;
          this.pagination.totalItems = response?.pagination?.totalItems || 0;
          this.pagination.totalPages = response?.pagination?.totalPages || 1;
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
