import { Routes } from '@angular/router';
import { HOME_ROUTES } from '@pages/home';
import { NOT_FOUND_ROUTES } from '@pages/not-found';

export const routes: Routes = [...HOME_ROUTES, ...NOT_FOUND_ROUTES];
