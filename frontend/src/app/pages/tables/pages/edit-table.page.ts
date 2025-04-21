import { Component, OnInit } from '@angular/core';
import { GameTable } from '../../../core/models/game-table.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GameTableService } from '../../../core/services/game-table.service';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { TableFormComponent } from '../components/table-form.component';

@Component({
  selector: 'app-edit-table',
  imports: [PrimeNgModule, TableFormComponent],
  template: `
    <p-card header="Editar Mesa">
      <ng-container *ngIf="table">
        <app-table-form (formSubmitted)="update($event)"></app-table-form>
      </ng-container>
    </p-card>
  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class EditTablePage implements OnInit {
  table?: GameTable;
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private tableService: GameTableService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.tableService.getById(this.id).subscribe(res => (this.table = res));
  }

  update(data: GameTable) {
    this.tableService.updateGameTable(this.id, data).subscribe(() => {
      this.router.navigate(['/tables']);
    });
  }
}
