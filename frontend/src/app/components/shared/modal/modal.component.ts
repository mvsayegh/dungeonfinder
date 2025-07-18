import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '@core/services';
import { Button } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [Button],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  private _dialogConfig = inject(DynamicDialogConfig);
  private _modalService = inject(ModalService);

  data = this._dialogConfig.data;

  close(): void {
    this._modalService.close<ModalComponent>();
  }
}
