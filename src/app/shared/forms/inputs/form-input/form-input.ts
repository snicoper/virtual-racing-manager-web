/* eslint-disable  @typescript-eslint/no-empty-function */
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FieldError } from '../../errors/field-error/field-error';
import { FormState } from '../../errors/field-error/form-state.model';
import { FormIconPosition } from '../../types/form-icon-position.enum';
import { FormInputType } from './form-input.type';

@Component({
  selector: 'vrm-form-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIcon, FieldError],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInput),
      multi: true,
    },
  ],
})
export class FormInput implements ControlValueAccessor {
  readonly formState = input.required<FormState>();
  readonly fieldName = input.required<string>();
  readonly label = input.required<string>();

  readonly readonly = input(false);
  readonly formInputType = input(FormInputType.Text);
  readonly placeholder = input('');
  readonly icon = input('');
  readonly formIconPosition = input(FormIconPosition.prefix);

  readonly value = signal('');
  readonly isDisabled = signal(false);
  readonly iconPositions = FormIconPosition;

  private static nextId = 0;
  readonly id = `input-field-${(FormInput.nextId += 1)}`;

  private onChange: (value: string) => void = () => {};
  private onTouch: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onChangeValue(value: string): void {
    this.value.set(value);

    this.clearFieldBadRequestError();

    this.onChange(value);
    this.onTouch();
  }

  private clearFieldBadRequestError(): void {
    const errors = this.formState().badRequest?.errors;

    if (!errors?.[this.fieldName()]) {
      return;
    }

    delete errors[this.fieldName()];
  }
}
