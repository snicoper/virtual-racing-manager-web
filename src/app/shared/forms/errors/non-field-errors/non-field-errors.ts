import { Component, computed, input } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { FormState } from '../field-error/form-state.model';

@Component({
  selector: 'vrm-non-field-errors',
  imports: [MatError],
  templateUrl: './non-field-errors.html',
})
export class NonFieldErrors {
  readonly formState = input.required<FormState>();

  protected readonly errorMessage = computed(() => {
    const error = this.formState().badRequest;

    if (!error) {
      return null;
    }

    if (error.errors && Object.keys(error.errors).length > 0) {
      return null;
    }

    return error.detail ?? error.title ?? null;
  });
}
