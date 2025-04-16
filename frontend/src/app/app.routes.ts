import { Routes } from '@angular/router';
import { Notfound } from './pages/notfound/notfound';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/component/app.layout').then(m => m.AppLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      },
    ],
  },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
];
