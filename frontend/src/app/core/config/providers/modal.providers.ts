import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

export function provideModal(): EnvironmentProviders {
  return makeEnvironmentProviders([
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ]);
}
