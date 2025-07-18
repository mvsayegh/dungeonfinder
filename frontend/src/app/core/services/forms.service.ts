import { inject, Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  private readonly _fb = inject(FormBuilder);

  createConrol<T>(initialValue: T, valdators: ValidatorFn[]): FormControl<T> {
    return this._fb.nonNullable.control(initialValue, valdators);
  }

  createRequiredControl<T>(
    initialValue: T,
    valdators: ValidatorFn[],
  ): FormControl<T> {
    return this._fb.nonNullable.control(
      initialValue,
      valdators ? [...valdators, Validators.required] : [Validators.required],
    );
  }

  createArrayControl<T>(initialValue: T[]): FormArray {
    return this._fb.nonNullable.array(initialValue);
  }

  createGroup<T>(controls: { [key: string]: FormControl<T> }): FormGroup {
    return this._fb.nonNullable.group(controls);
  }

  getErrors(form: FormGroup): string[] {
    return Object.keys(form.controls)
      .filter((key) => form.get(key)?.invalid)
      .map((key) => {
        const errors = form.get(key)?.errors;
        return errors ? Object.keys(errors).join(', ') : '';
      });
  }
}
