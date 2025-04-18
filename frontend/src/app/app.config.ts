import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { ApiBaseUrlInterceptor } from './core/middleware/api-base.interceptor';
import { ErrorInterceptor } from './core/middleware/error.interceptor';
import DFTheme from './themes/mytheme';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './core/middleware/auth.interceptor';
registerLocaleData(ptBr);

const INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiBaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: LOCALE_ID, useValue: 'pt-BR' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation()
    ),
    MessageService,
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi() // Isso é OBRIGATÓRIO para interceptors funcionarem com fetch
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: DFTheme,
        options: {
          darkMode: true,
        },
      },
      translation: {
        emptyMessage: 'Nenhum resultado encontrado.',
        noFileChosenMessage: 'Nenhum arquivo selecionado.',
      },
      ripple: true,
    }),
    ...INTERCEPTORS,
  ],
};
