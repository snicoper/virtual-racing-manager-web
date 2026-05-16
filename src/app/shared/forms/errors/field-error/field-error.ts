import { HttpStatusCode } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormState } from '../../form-state.model';

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
    const apiErrors = this.getApiErrors();

    if (!this.shouldShowErrors(control, apiErrors)) {
      return null;
    }

    return apiErrors[0] ?? this.getErrorMessageOrNull(control);
  }

  private getApiErrors(): string[] {
    if (this.formState().problemDetails()?.status !== HttpStatusCode.BadRequest) {
      return [];
    }

    return this.formState().problemDetails()?.errors?.[this.fieldName()] ?? [];
  }

  private shouldShowErrors(control: AbstractControl, apiErrors: string[]): boolean {
    if (apiErrors.length > 0) {
      return true;
    }

    if (this.validateOnlyOnSubmit()) {
      return this.formState().isSubmitted() && control.invalid;
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

    if (control.hasError('noPasswordMatch')) {
      return `Passwords do not match`;
    }

    return null;
  }
}
