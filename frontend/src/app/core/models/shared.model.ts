import { Type } from '@angular/core';
import { KeyFilterPattern } from 'primeng/keyfilter';

export type Component<T> = Type<T>;

export type ButtonSeverity =
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'help'
  | 'primary'
  | 'secondary'
  | 'contrast';

export type InputKeyFilter = RegExp | KeyFilterPattern | null | undefined;

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
}

export interface CardAction {
  label: string;
  severity: ButtonSeverity;
  onClick: () => void;
}

export interface SelectOption {
  label: string;
  value: string;
}
