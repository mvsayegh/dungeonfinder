import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardAction } from '@core/models';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from '../button';
import { ImageComponent } from '../image';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonComponent, ImageComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  width = input<string>('25rem');
  headerSrc = input<string>('');
  headerWidth = input<string>('200');
  headerHeight = input<string>('100');
  titleLabel = input<string>('');
  subtitleLabel = input<string>('');
  description = input<string>('');
  actions = input<CardAction[]>([]);
}
