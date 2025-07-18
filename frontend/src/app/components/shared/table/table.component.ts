import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableColumn } from '@core/models';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { InputComponent } from '../input';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, InputComponent, TranslateModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  columns = input.required<TableColumn[]>();
  data = input.required<T[]>();
  loading = input<boolean>(false);
  paginator = input<boolean>(false);
  rows = input<number>(10);
  rowsPerPageOptions = input<number[]>([10, 25, 50]);
  showFilter = input<boolean>(false);

  filterValue: string = '';

  onGlobalFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
}
