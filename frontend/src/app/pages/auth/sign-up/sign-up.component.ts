import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [PrimeNgModule, RouterModule],
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
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  showTermsAndConditions() {
    this.termsAndConditionsVisible = true;
  }

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      const body = this.registerForm.value;
      this.http.post('auth/register', body).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Check your email to verify your account!',
          });
          this.loading = false;
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message || 'Registration failed.',
          });
          this.loading = false;
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill out all required fields correctly.',
      });
    }
  }
}
