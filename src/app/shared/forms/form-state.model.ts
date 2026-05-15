import { FormGroup } from '@angular/forms';
import { ApiError } from '../../core/http/api-error.model';

export interface FormState<TForm extends FormGroup = FormGroup> {
  form: TForm;
  apiError?: ApiError;
  isSubmitted: boolean;
  isLoading: boolean;
}
