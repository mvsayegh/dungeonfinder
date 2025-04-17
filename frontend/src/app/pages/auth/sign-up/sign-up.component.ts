import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RpgLoadingComponent } from '../../../shared/components/loading.component';
import { AuthService, RegisterRequest } from '../../../core/authentication/authentication.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [PrimeNgModule, RpgLoadingComponent],
  providers: [MessageService],
})
export class SignUpComponent {
  loading?: boolean = false;
  termsAndConditionsVisible = false;

  // FormGroup para o registro de usuário
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.requiredTrue),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  showTermsAndConditions() {
    this.termsAndConditionsVisible = true;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Fields are required' });
      return;
    }
    this.loading = true;
    const body: RegisterRequest = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };
    this.authService
      .register(body)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: res => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            this.registerForm.disable();
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
            this.registerForm.reset();
          }
        },
        error: (err: HttpErrorResponse) => {
          const msg = err?.message || 'Occurred an unknown error!';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
          this.registerForm.reset();
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
