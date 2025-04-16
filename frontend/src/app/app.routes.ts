import { Routes } from '@angular/router';
import { Notfound } from './pages/notfound/notfound';

export const appRoutes: Routes = [
  {
    path: 'signin',
    loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then(m => m.SignInComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/sign-up/sign-up.component').then(m => m.SignUpComponent),
  },
  {
    path: 'verify-email/:token',
    loadComponent: () => import('./pages/auth/verify-email/verify-email.component').then(m => m.VerifyEmailComponent),
  },
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
