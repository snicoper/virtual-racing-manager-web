import { WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProblemDetailsResponse } from '../../core/http/problem-detailt.response';

export interface FormState<TForm extends FormGroup = FormGroup> {
  form: TForm;
  problemDetails: WritableSignal<ProblemDetailsResponse | null>;
  isSubmitted: WritableSignal<boolean>;
  isLoading: WritableSignal<boolean>;
}
