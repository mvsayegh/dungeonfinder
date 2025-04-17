import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../authentication/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  _storageService = inject(StorageService);
  _router = inject(Router);

  canActivate(): boolean {
    if (this._storageService.isLoggedIn()) {
      this._router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
