import { HttpStatusCode } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { FormState } from '../../form-state.model';
import { Alert } from '../../../components/alert/alert';

@Component({
  selector: 'vrm-non-field-errors',
  imports: [Alert],
  templateUrl: './non-field-errors.html',
  styleUrl: './non-field-errors.scss',
})
export class NonFieldErrors {
  readonly formState = input.required<FormState>();

  protected errorMessage(): string | null {
    const error = this.formState().problemDetails;

    if (!error || error.status !== HttpStatusCode.Conflict) {
      return null;
    }

    return error.detail ?? error.title ?? null;
  }
}
