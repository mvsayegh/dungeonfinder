import { inject, Injectable } from '@angular/core';
import { ModalComponent } from '@components/shared';
import { Component, DEFAULT_MODAL_CONFIG, ModalConfig } from '@core/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _dialog = inject(DialogService);

  private _openedRef: DynamicDialogRef | null = null;

  open<T>(component: Component<T>, options: ModalConfig): void {
    this._openedRef = this._dialog.open<T>(component, {
      ...DEFAULT_MODAL_CONFIG,
      ...options,
    });
  }

  close<T>(): void {
    this.getOpened<T extends ModalComponent ? T : ModalComponent>()?.close();
  }

  getOpened<T>(): DynamicDialogRef<T> | null {
    return this._openedRef;
  }
}
