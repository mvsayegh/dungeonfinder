/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  input,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { InputKeyFilter } from '@core/models';
import { FloatLabel } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    InputText,
    InputNumber,
    InputMask,
    Password,
    FloatLabel,
    KeyFilter,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor, Validator {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  required = input<boolean>(false);
  labelPosition = input<'over' | 'in' | 'on'>('over');
  variant = input<'filled' | 'outlined'>('outlined');
  mask = input<string>('');
  keyFilter = input<InputKeyFilter>();

  @Input()
  disabled = false;

  value: string = '';
  touched = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required() && !this.value.trim()) {
      return { required: true };
    }
    return null;
  }

  onInput(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
  }
  onBlur(): void {
    this.onTouched();
    this.touched = true;
  }
}
