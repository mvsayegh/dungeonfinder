import { Component } from '@angular/core';
import { ButtonComponent } from '@components/shared';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'app-hero-header',
  standalone: true,
  imports: [SharedModule, ButtonComponent],
  templateUrl: './hero-header.component.html',
  styleUrl: './hero-header.component.scss',
})
export class HeroHeaderComponent {}
