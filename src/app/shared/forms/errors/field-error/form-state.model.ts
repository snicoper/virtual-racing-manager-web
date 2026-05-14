import { FormGroup } from '@angular/forms';
import { BadRequest } from '../../../../core/http/models/bad-request.model';

export interface FormState<TForm extends FormGroup = FormGroup> {
  form: TForm;
  badRequest?: BadRequest;
  isSubmitted: boolean;
  isLoading: boolean;
}
