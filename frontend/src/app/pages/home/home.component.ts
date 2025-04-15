import { Component, inject, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { NgIf } from '@angular/common';
import { GameTableService } from '../../core/services/game-table.service';

@Component({
  selector: 'app-home',
  imports: [PrimeNgModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  _gameTableService = inject(GameTableService);
  tables: unknown[] = [];

  ngOnInit(): void {
    this._gameTableService.listAvailableTables().subscribe({
      next: (data: any) => {
        this.tables = data.gameTables;
      },
      error: err => {
        console.error('Erro ao buscar mesas:', err);
      },
    });
  }

  join(tableId: string) {
    console.log(`Entrar na mesa ${tableId}`);
    // Implementar chamada para entrar na mesa
  }
}
