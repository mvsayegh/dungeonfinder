/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SpinnerService } from '@core/services';
import { ApiService } from '@core/services/api.service';
import { SharedModule } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { SpinnerComponent } from '@components/shared';

@Component({
  selector: 'app-tables-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    SharedModule,
    TagModule,
    SpinnerComponent,
  ],
  templateUrl: './tables-home.component.html',
  styleUrl: './tables-home.component.scss',
})
export class TablesHomeComponent {
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
