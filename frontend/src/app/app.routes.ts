import { Routes } from '@angular/router';
import { Notfound } from './pages/notfound/notfound';
import { AuthGuard } from './core/guards/auth.guard';

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
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'tables',
        loadComponent: () => import('./pages/tables/pages/create-table.page').then(m => m.CreateTablePage),
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
];
