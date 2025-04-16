import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';

@Component({
  selector: 'app-sign-in',
  imports: [PrimeNgModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  email?: string = '';
  password?: string = '';
  checked?: boolean = false;
}
