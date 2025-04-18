import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameTableService } from '../../../core/services/game-table.service';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { RpgLoadingComponent } from '../../../shared/components/loading.component';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { RPGDataService } from '../../../core/services/utils/rpg-data.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-create-table',
  imports: [PrimeNgModule, RpgLoadingComponent],
  templateUrl: './create-table.component.html',
  styleUrl: './create-table.component.scss',
})
export class CreateTableComponent implements OnInit {
  tableForm!: FormGroup;
  uploadedFiles: any[] = [];
  imagePreview: string | null = null;
  rpgSystems: { label: string; value: string }[] = [];

  durations = [
    { label: 'One Shot', value: 'ONE_SHOT' },
    { label: 'Curta', value: 'SHORT' },
    { label: 'Média', value: 'MEDIUM' },
    { label: 'Longa', value: 'LONG' },
  ];

  loading = false;

  constructor(
    private fb: FormBuilder,
    private tableService: GameTableService,
    private messageService: MessageService,
    private rpgDataService: RPGDataService
  ) {
    this.tableForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      image: [''],
      system: [null, Validators.required],
      maxPlayers: [1, [Validators.required, Validators.min(1)]],
      time: [null, Validators.required],
      duration: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.rpgSystems = this.rpgDataService.getRPGSystems();
  }

  onImageSelected(event: FileUploadHandlerEvent) {
    const file = event.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.imagePreview = base64;
      this.tableForm.patchValue({ image: base64 });

      this.messageService.add({
        severity: 'success',
        summary: 'Imagem carregada',
        detail: file.name,
      });
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.tableForm.invalid) return;
    this.loading = true;
    this.tableService
      .createGameTable(this.tableForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: res => {
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          const msg = err?.message || 'Occurred an unknown error!';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        },
      });
  }
}
