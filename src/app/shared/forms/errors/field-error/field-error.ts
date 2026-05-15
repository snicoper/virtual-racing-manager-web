import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormState } from './form-state.model';

@Component({
  selector: 'vrm-field-error',
  imports: [],
  templateUrl: './field-error.html',
  styleUrl: './field-error.scss',
})
export class FieldError {
  readonly formState = input.required<FormState>();
  readonly fieldName = input.required<string>();
  readonly fieldText = input('');
  readonly validateOnlyOnSubmit = input(false);

  protected errorMessage(): string | null {
    const control = this.getControl();
    const badRequestErrors = this.getBadRequestErrors();

    if (!this.shouldShowErrors(control, badRequestErrors)) {
      return null;
    }

    return badRequestErrors[0] ?? this.getErrorMessageOrNull(control);
  }

  private getBadRequestErrors(): string[] {
    return this.formState().badRequest?.errors?.[this.fieldName()] ?? [];
  }

  private shouldShowErrors(control: AbstractControl, badRequestErrors: string[]): boolean {
    if (badRequestErrors.length > 0) {
      return true;
    }

    if (this.validateOnlyOnSubmit()) {
      return this.formState().isSubmitted && control.invalid;
    }

    return control.invalid && (control.touched || control.dirty);
  }

  private getControl(): AbstractControl {
    const control = this.formState().form.get(this.fieldName());

    if (!control) {
      throw new Error(`Form control '${this.fieldName()}' does not exist.`);
    }

    return control;
  }

  private getErrorMessageOrNull(control: AbstractControl): string | null {
    if (control.hasError('required')) {
      return `${this.fieldText()} is required`;
    }

    if (control.hasError('email')) {
      return `${this.fieldText()} is not valid`;
    }

    return null;
  }
}
