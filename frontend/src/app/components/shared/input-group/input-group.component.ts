import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonSeverity, InputKeyFilter } from '@core/models';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputComponent } from '../input';
import { InputGroupAddonComponent } from './input-group-addon';

@Component({
  selector: 'app-input-group',
  standalone: true,
  imports: [InputGroupModule, InputComponent, InputGroupAddonComponent, NgIf],
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent {
  addonType = input<'icon' | 'button'>('icon');
  addonPosition = input<'before' | 'after'>('before');
  addonIconPosition = input<'left' | 'right'>('left');
  addonIcon = input<string>('');
  addonLabel = input<string>('');
  loading = input<boolean>(false);
  label = input<string>('');
  labelPosition = input<'over' | 'in' | 'on'>('over');
  placeholder = input<string>('');
  type = input<string>('text');
  mask = input<string>('');
  keyFilter = input<InputKeyFilter>();
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  variant = input<'filled' | 'outlined'>('outlined');
  severity = input<ButtonSeverity>('primary');

  addonButtonClick = output<void>();

  handleAddonButtonClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.addonButtonClick.emit();
    }
  }
}
