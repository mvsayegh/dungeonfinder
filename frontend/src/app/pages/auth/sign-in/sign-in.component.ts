import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../../core/authentication/storage.service';
import { AuthService, LoginRequest } from '../../../core/authentication/authentication.service';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { RpgLoadingComponent } from '../../../shared/components/loading.component';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [PrimeNgModule, RpgLoadingComponent],
  providers: [MessageService],
})
export class SignInComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loading = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      console.log(this.storageService.isLoggedIn());
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Fields are required' });
      return;
    }
    this.loading = true;
    const body: LoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.authService
      .login(body)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: res => {
          this.storageService.setToken(res.response.token);
          this.storageService.setUser(res.response.user);
          this.messageService.add({ severity: 'success', summary: 'Login successful' });
          this.router.navigate(['/']); //to-do: redirect correto, verificar com o UX.
        },
        error: (err: HttpErrorResponse) => {
          const msg = err?.message || 'Occurred an unknown error!';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
          this.loginForm.get('password')?.reset();
        },
      });
  }
}
