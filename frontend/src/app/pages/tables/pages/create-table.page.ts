import { Router } from '@angular/router';
import { GameTableService } from '../../../core/services/game-table.service';
import { GameTable } from '../../../core/models/game-table.model';
import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { TableFormComponent } from '../components/table-form.component';

@Component({
  selector: 'app-create-table',
  imports: [PrimeNgModule, TableFormComponent],
  template: `
    <p-card header="Criar nova Mesa">
      <app-table-form (formSubmitted)="create($event)"></app-table-form>
    </p-card>
  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CreateTablePage {
  constructor(
    private tableService: GameTableService,
    private router: Router
  ) {}

  create(data: GameTable) {
    this.tableService.createGameTable(data).subscribe(res => {
      console.log(res);
      // this.router.navigate(['/tables']);
    });
  }
}
