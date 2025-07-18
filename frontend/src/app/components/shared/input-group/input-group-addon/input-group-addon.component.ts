import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonComponent } from '@components/shared';
import { ButtonSeverity } from '@core/models';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-input-group-addon',
  standalone: true,
  imports: [InputGroupAddonModule, ButtonComponent],
  templateUrl: './input-group-addon.component.html',
  styleUrl: './input-group-addon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupAddonComponent {
  type = input.required<'icon' | 'button'>();
  icon = input<string>('');
  buttonLabel = input<string>('');
  buttonIcon = input<string>('');
  buttonIconPosition = input<'left' | 'right'>('left');
  buttonSeverity = input<ButtonSeverity>('primary');
  buttonDisabled = input<boolean>(false);
  buttonLoading = input<boolean>(false);
  disabled = input<boolean>(false);

  buttonClick = output<void>();

  handleButtonClick(): void {
    if (!this.disabled() && !this.buttonDisabled() && !this.buttonLoading()) {
      this.buttonClick.emit();
    }
  }
}
