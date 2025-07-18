import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, SpinnerComponent } from '@components/shared';
import { SpinnerService } from '@core/services';
import { ApiService } from '@core/services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    PaginatorModule,
    ButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private _api = inject(ApiService);
  private _spinner = inject(SpinnerService);

  loading = this._spinner.isLoading; // signal<boolean>
  featuredTables: any[] = [];
  pagination = {
    pageNumber: 1,
    pageSize: 10,
    totalGameTables: 0,
  };

  constructor() {
    this.searchTables(this.pagination.pageNumber, this.pagination.pageSize);
  }

  searchTables(page: number, size: number) {
    this._spinner.show();
    this._api.get(`game-tables?page=${page}&limit=${size}`).subscribe({
      next: (response: any) => {
        this.featuredTables = response.body.data.gameTables;
        this.pagination = response.body.data.pagination;
      },
      error: (err) => {
        console.error('Erro ao buscar mesas', err);
      },
      complete: () => {
        this._spinner.hide();
      },
    });
  }

  paginate(event: any) {
    this.pagination.pageNumber = event.page + 1; // page começa em 0 no paginator
    this.pagination.pageSize = event.rows;
    this.searchTables(this.pagination.pageNumber, this.pagination.pageSize);
  }

  onViewTable(table: any) {
    console.log('Ver detalhes da mesa:', table);
  }
}
