import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { TablesHomeComponent } from './components/tables-home/tables-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroHeaderComponent, TablesHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
