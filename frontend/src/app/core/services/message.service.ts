import { inject, Injectable } from '@angular/core';
import {
  MessageService as PrimeMessageService,
  ToastMessageOptions,
} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly _primeMessageService = inject(PrimeMessageService);

  addSuccess(message: string): void {
    this.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  addError(message: string): void {
    this.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  addInfo(message: string): void {
    this.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  addWarn(message: string): void {
    this.add({
      severity: 'warn',
      summary: 'Warn',
      detail: message,
    });
  }

  addSticky(messsageConfig: ToastMessageOptions): void {
    this.add({
      ...messsageConfig,
      sticky: true,
    });
  }

  addCustom(messsageConfig: ToastMessageOptions): void {
    this.add(messsageConfig);
  }

  clear(): void {
    this._primeMessageService.clear();
  }

  private add(
    messsageConfig: ToastMessageOptions = {
      severity: 'success',
      summary: '',
      detail: '',
      life: 3000,
    },
  ): void {
    this._primeMessageService.add(messsageConfig);
  }
}
