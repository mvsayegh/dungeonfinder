import { Component, inject, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { GameTableService } from '../../core/services/game-table.service';
import { finalize } from 'rxjs';

interface GameMaster {
  _id: string;
  name: string;
}

// Match this interface exactly to the objects INSIDE the data.gameTables array
interface Table {
  _id: string;
  title: string;
  description: string;
  system: string;
  maxPlayers: number;
  time: string;
  players?: [];
  gameMasterId?: GameMaster;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: 'OPEN' | 'CLOSED' | 'FULL' | 'WAITING' | string;
}

interface ListTablesResponse {
  gameTables: Table[];
  // Add other potential response properties if they exist (e.g., totalCount, pageInfo)
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

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.isLoading = true;
    this.errorLoading = false;
    this.tables = []; // Clear previous tables before loading

    this.gameTableService
      .listAvailableTables(1, 10, 'OPEN')
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.tables = response?.gameTables || [];
          console.log('Mesas carregadas:', this.tables);
        },
        error: err => {
          console.error('Erro ao buscar mesas:', err);
          this.errorLoading = true;
        },
      });
  }

  join(tableId: string): void {
    console.log(`Tentando entrar na mesa ${tableId}`);
    alert(`Funcionalidade "Entrar na Mesa ${tableId}" ainda não implementada.`);
  }

  isTableFull(table: Table): boolean {
    return (table.players?.length || 0) >= table.maxPlayers;
  }
}
