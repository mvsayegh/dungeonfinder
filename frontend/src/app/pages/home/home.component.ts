import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { TablesHomeComponent } from './components/tables-home/tables-home.component';
import { HowToWorksComponent } from './components/how-to-works/how-to-works.component';
import { AllStatsComponent } from './components/all-stats/all-stats.component';
import { CtaHomeComponent } from './components/cta-home/cta-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroHeaderComponent,
    TablesHomeComponent,
    HowToWorksComponent,
    AllStatsComponent,
    CtaHomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
