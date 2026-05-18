import { HttpStatusCode } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Alert } from '../../../components/alert/alert';
import { FormState } from '../../form-state.model';

@Component({
  selector: 'vrm-non-field-errors',
  imports: [Alert],
  templateUrl: './non-field-errors.html',
  styleUrl: './non-field-errors.scss',
})
export class NonFieldErrors {
  private readonly translate = inject(TranslateService);

  readonly formState = input.required<FormState>();

  protected errorMessage(): string | null {
    const error = this.formState().problemDetails();

    if (!error || error.status !== HttpStatusCode.Conflict) {
      return null;
    }

    if (error.code) {
      return this.translate.instant(`apiError.${error.code}`);
    }

    return error.detail ?? error.title ?? null;
  }
}
