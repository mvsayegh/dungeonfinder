import { DynamicDialogConfig } from 'primeng/dynamicdialog';

export interface ModalData {
  description?: string;
  btnConfirm?: string;
  btnClose?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ModalConfig extends DynamicDialogConfig {
  data?: ModalData;
}

export const DEFAULT_MODAL_CONFIG: ModalConfig = {
  modal: true,
  closeOnEscape: true,
  closable: true,
  position: 'center',
  width: 'auto',
  data: {},
};
