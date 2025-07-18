import { Routes } from '@angular/router';
import { Pages } from '@core/models';

export const NOT_FOUND_ROUTES: Routes = [
  {
    path: Pages.NOT_FOUND,
    loadComponent: () =>
      import('./not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: Pages.NOT_FOUND,
  },
];
