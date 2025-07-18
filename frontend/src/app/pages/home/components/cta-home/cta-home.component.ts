import { Component } from '@angular/core';
import { ButtonComponent } from '@components/shared';

@Component({
  selector: 'app-cta-home',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './cta-home.component.html',
  styleUrl: './cta-home.component.scss',
})
export class CtaHomeComponent {
  onRegister() {}
}
