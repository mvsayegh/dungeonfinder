import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { GameDuration, GameTable } from '../../../core/models/game-table.model';
import { RPGDataService } from '../../../core/services/utils/rpg-data.service';

@Component({
  selector: 'app-table-form',
  imports: [PrimeNgModule],
  template: `
    <form [formGroup]="tableForm" (ngSubmit)="onSubmit()">
      <div class="mb-2">
        <label for="title">Título</label>
        <input id="title" pInputText formControlName="title" />
      </div>
      <div class="mb-2">
        <label for="description">Descrição</label>
        <p-editor id="description" formControlName="description" [style]="{ height: '320px' }"></p-editor>
      </div>
      <div class="mb-2">
        <label for="system">Sistema</label>
        <p-select
          id="system"
          formControlName="system"
          [options]="rpgSystems"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecione o sistema"></p-select>
      </div>
      <div class="mb-2">
        <label for="status">Status</label>
        <p-select
          id="status"
          formControlName="status"
          [options]="rpgStatuses"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecione o status"></p-select>
      </div>
      <div class="mb-2">
        <label for="maxPlayers">Número máximo de jogadores</label>
        <input id="maxPlayers" type="number" pInputText formControlName="maxPlayers" />
      </div>
      <div class="mb-2">
        <label for="duration">Duração</label>
        <p-select id="duration" formControlName="duration" [options]="gameDurations" placeholder="Selecione a duração"></p-select>
      </div>
      <div class="mb-2">
        <label for="time" class="block text-sm font-medium">Data e Hora</label>
        <input type="datetime-local" formControlName="time" />
      </div>

      <p-button type="submit" label="Salvar" [disabled]="tableForm.invalid"></p-button>
    </form>
  `,
})
export class TableFormComponent implements OnInit {
  @Input() initialData?: GameTable;
  @Output() formSubmitted = new EventEmitter<GameTable>();
  tableForm!: FormGroup;

  rpgSystems: { label: string; value: string }[] = [];
  rpgStatuses: { label: string; value: string }[] = [];
  gameDurations: GameDuration[] = ['ONE_SHOT', 'SHORT', 'MEDIUM', 'LONG'];

  constructor(
    private fb: FormBuilder,
    private rpgDataService: RPGDataService
  ) {}

  ngOnInit(): void {
    // Preenche os dropdowns utilizando os dados do RPGDataService
    this.rpgSystems = this.rpgDataService.getRPGSystems();
    this.rpgStatuses = this.rpgDataService.getRPGStatuses();

    this.tableForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      system: ['', Validators.required],
      maxPlayers: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      time: [null, Validators.required],
      duration: ['', Validators.required],
      // image: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.tableForm.valid) {
      // Convertendo o valor de 'time' para um objeto Date
      this.tableForm.value.time = new Date(this.tableForm.value.time);
      this.formSubmitted.emit(this.tableForm.value);
    }
  }
}
