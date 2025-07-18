import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MessageService } from 'primeng/api';

export function provideMessage(): EnvironmentProviders {
  return makeEnvironmentProviders([MessageService]);
}
