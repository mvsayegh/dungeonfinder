import { Routes } from '@angular/router';
import { Pages } from '@core/models';
import { buildRoute } from '@core/utils';
export const HOME_ROUTES: Routes = [
  {
    path: '',
    redirectTo: Pages.HOME,
    pathMatch: 'full',
  },
  buildRoute({
    path: Pages.HOME,
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
  }),
];
