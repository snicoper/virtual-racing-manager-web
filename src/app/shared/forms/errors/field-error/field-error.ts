import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { FormState } from './form-state.model';

@Component({
  selector: 'vrm-field-error',
  imports: [MatError],
  templateUrl: './field-error.html',
})
export class FieldError {
  readonly formState = input.required<FormState>();
  readonly fieldName = input.required<string>();
  readonly fieldText = input('');
  readonly validateOnlyOnSubmit = input(false);

  protected readonly shouldShowErrors = computed(() => {
    const control = this.getControl();

    if (!control) {
      return false;
    }

    if (this.validateOnlyOnSubmit()) {
      return this.formState().isSubmitted && control.invalid;
    }

    return control.invalid && (control.touched || control.dirty);
  });

  protected readonly errorMessage = computed(() => {
    if (!this.shouldShowErrors()) {
      return null;
    }

    const control = this.getControl();

    if (!control?.errors) {
      return null;
    }

    if (control.hasError('required')) {
      return `${this.fieldText()} is required`;
    }

    if (control.hasError('email')) {
      return `${this.fieldText()} is not valid`;
    }

    return null;
  });

  private getControl(): AbstractControl {
    const control = this.formState().form.get(this.fieldName());

    if (!control) {
      throw new Error(`Form control '${this.fieldName()}' does not exist.`);
    }

    return control;
  }
}
