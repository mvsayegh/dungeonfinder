import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, SpinnerComponent } from '@components/shared';
import { SpinnerService } from '@core/services';
import { ApiService } from '@core/services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { CarouselModule } from 'primeng/carousel';

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
    CardModule,
    TagModule,
    AvatarModule,
    CarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private _api = inject(ApiService);
  private _spinner = inject(SpinnerService);

  loading = this._spinner.isLoading;
  featuredTables: any[] = [];
  showMore = false;

  pagination = {
    pageNumber: 1,
    pageSize: 10,
    totalGameTables: 0,
  };

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

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
      error: (err) => console.error('Erro ao buscar mesas', err),
      complete: () => this._spinner.hide(),
    });
  }

  paginate(event: any) {
    this.pagination.pageNumber = event.page + 1;
    this.pagination.pageSize = event.rows;
    this.searchTables(this.pagination.pageNumber, this.pagination.pageSize);
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  onViewTable(table: any) {
    // Logic to view the table details can be implemented here
    console.log('Viewing table:', table);
  }
}
