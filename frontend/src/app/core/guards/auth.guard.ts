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
    // Verifica se o usuário está logado
    if (this._storageService.isLoggedIn()) {
      // Se estiver logado, permite o acesso
      return true;
    } else {
      // Se não estiver logado, redireciona para a página de login
      this._router.navigate(['/signin']);
      return false;
    }
  }
}
