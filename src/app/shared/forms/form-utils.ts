import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormState } from './form-state.model';

export function createFormState<T extends FormGroup>(form: T): FormState<T> {
  return {
    form,
    problemDetails: signal(null),
    isSubmitted: signal(false),
    isLoading: signal(false),
  };
}

export function resetFormState(form: FormGroup): void {
  Object.values(form.controls).forEach((control) => {
    control.markAsPristine();
    control.markAsUntouched();
  });
}
