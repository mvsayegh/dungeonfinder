/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  input,
  output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SelectOption } from '@core/models';
import { TranslateModule } from '@ngx-translate/core';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [Select, FloatLabel, FormsModule, TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  options = input.required<SelectOption[]>();
  placeholder = input<string>('select.placeholder');
  label = input<string>('');
  labelPosition = input<'over' | 'in' | 'on'>('over');
  showCheck = input<boolean>(true);
  showClear = input<boolean>(true);
  editable = input<boolean>(false);
  filter = input<boolean>(false);
  filterBy = input<string>('label');
  loading = input<boolean>(false);
  virtualScroll = input<boolean>(false);
  variant = input<'filled' | 'outlined'>('outlined');

  selectionChange = output<SelectOption>();

  @Input()
  disabled = false;

  selectedOption: SelectOption | null = null;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedOption = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(event: any): void {
    this.selectedOption = event.value;

    if (this.selectedOption) {
      this.onChange(this.selectedOption);
      this.selectionChange.emit(this.selectedOption);
    }
  }
}
