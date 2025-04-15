import { Routes } from '@angular/router';
import { Notfound } from './pages/notfound/notfound';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent),
  },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
];
