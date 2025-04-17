import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    const token = this._route.snapshot.paramMap.get('token');
    if (token) {
      this._http.get(`auth/verify-email?token=${token}`).subscribe({
        next: res => {
          console.log(res);
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Success! Email verified successfully.',
          });
          setTimeout(() => this._router.navigate(['/signin']), 3000);
        },
        error: (err: HttpErrorResponse) => {
          const msg = err?.message || 'Occurred an unknown error!';
          this._messageService.add({ severity: 'error', summary: 'Error', detail: msg });
          setTimeout(() => this._router.navigate(['/signup']), 3000);
        },
      });
    }
  }
}
