import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { RpgLoadingComponent } from '../../../shared/components/loading.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [PrimeNgModule, RouterModule, RpgLoadingComponent],
  styleUrls: ['./sign-in.component.scss'],
  providers: [MessageService],
})
export class SignInComponent {
  loading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  login() {
    if (this.loginForm.valid) {
      this.loading = true; // Ativa o loading
      const body = this.loginForm.value;
      this.http
        .post<any>('auth/login', body, {
          headers: { 'Content-Type': 'application/json' },
        })
        .subscribe({
          next: res => {
            const token = res?.token.token;
            if (token) {
              localStorage.setItem('token', token);
              this.router.navigate(['/']); // Redireciona após login
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid login response.' });
            }
            this.loading = false; // Desativa o loading
          },
          error: err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'Login failed.' });
            this.loading = false; // Desativa o loading
          },
        });
    }
  }
}
