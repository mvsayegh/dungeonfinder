import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LongClickDirective } from '@core/directives';
import { ButtonSeverity } from '@core/models';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [Button, LongClickDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  label = input.required<string>();
  icon = input<string>('');
  iconPosition = input<'left' | 'right' | 'top' | 'bottom'>('left');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  link = input<boolean>(false);
  outlined = input<boolean>(false);
  severity = input<ButtonSeverity>('primary');
  longClickDuration = input<number>(500);

  onClick = output<void>();

  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit();
    }
  }

  handleLongClick(): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit();
    }
  }
}
