import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';

@Component({
  selector: 'app-verify-email',
  imports: [PrimeNgModule],
  template: `<p-toast></p-toast>`,
  providers: [MessageService],
})
export class VerifyEmailComponent implements OnInit {
  _route = inject(ActivatedRoute);
  _http = inject(HttpClient);
  _messageService = inject(MessageService);
  _router = inject(Router);

  ngOnInit(): void {
    const token = this._route.snapshot.paramMap.get('token'); // Alteração para pegar o token da URL
    if (token) {
      this._http.get(`auth/verify-email?token=${token}`).subscribe({
        next: () => {
          this._messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'E-mail verificado com sucesso! Você já pode fazer login.',
          });
          setTimeout(() => this._router.navigate(['/signin']), 3000);
        },
        error: () => {
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Token inválido ou expirado.',
          });
          setTimeout(() => this._router.navigate(['/signup']), 3000);
        },
      });
    }
  }
}
