/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SpinnerService } from '@core/services';
import { ApiService } from '@core/services/api.service';
import { CountUpModule } from 'ngx-countup';
@Component({
  selector: 'app-all-stats',
  standalone: true,
  imports: [CommonModule, CountUpModule],
  templateUrl: './all-stats.component.html',
  styleUrl: './all-stats.component.scss',
})
export class AllStatsComponent {
  private _api = inject(ApiService);
  private _spinner = inject(SpinnerService);
  loading = this._spinner.isLoading;
  stats: any;
  constructor() {
    this.getStats();
  }

  public async getStats() {
    this._spinner.show();
    this._api.get(`game-tables/stats`).subscribe({
      next: (response: any) => {
        this.stats = response.body.data;
      },
      complete: () => this._spinner.hide(),
    });
  }
}
