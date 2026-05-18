import { HttpStatusCode } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormState } from '../../form-state.model';

@Component({
  selector: 'vrm-field-error',
  imports: [],
  templateUrl: './field-error.html',
  styleUrl: './field-error.scss',
})
export class FieldError {
  private readonly translate = inject(TranslateService);

  readonly formState = input.required<FormState>();
  readonly fieldName = input.required<string>();
  readonly labelKey = input.required<string>();
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

    return (
      this.formState()
        .problemDetails()
        ?.errors?.[this.fieldName()]?.map((error) => this.translate.instant(`apiError.${error}`)) ??
      []
    );
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
      return this.translate.instant('validation.required', {
        field: this.translate.instant(this.labelKey()),
      });
    }

    if (control.hasError('email')) {
      return this.translate.instant('validation.email', {
        field: this.translate.instant(this.labelKey()),
      });
    }

    if (control.hasError('noPasswordMatch')) {
      return this.translate.instant('validation.passwordMismatch');
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;

      return this.translate.instant('validation.minlength', {
        field: this.translate.instant(this.labelKey()),
        requiredLength: requiredLength,
      });
    }

    return null;
  }
}
