import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  errorResponseInterceptor,
  spinnerInterceptor,
} from '@core/interceptors';
import { provideTranslateService } from '@ngx-translate/core';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideMessage, provideModal } from './providers';
import { themeConfig } from './theme.config';
import { translateConfig } from './translate.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideModal(),
    provideMessage(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([errorResponseInterceptor, spinnerInterceptor]),
    ),
    provideTranslateService(translateConfig),
    providePrimeNG({
      ...themeConfig,
    }),
  ],
};
