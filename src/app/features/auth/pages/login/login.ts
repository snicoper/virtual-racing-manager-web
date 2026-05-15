import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { NonFieldErrors } from '../../../../shared/forms/errors/non-field-errors/non-field-errors';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { FormInput } from '../../../../shared/forms/inputs/form-input/form-input';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';

@Component({
  selector: 'vrm-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, FormInput, NonFieldErrors],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);

  protected readonly formInputTypes = FormInputType;
  protected readonly iconPositions = FormIconPosition;
  protected readonly siteName = AppEnvironment.SiteName;

  readonly formState: FormState = {
    form: this.fb.group({}),
    apiError: undefined,
    isSubmitted: false,
    isLoading: false,
  };

  ngOnInit(): void {
    this.buildForm();
  }

  protected handleSubmit(): void {
    this.formState.isSubmitted = true;

    if (this.formState.form.invalid) {
      this.formState.form.markAllAsTouched();

      return;
    }

    // prueba backend 400
    this.formState.apiError = {
      title: 'Bad Request',
      detail: 'Username or password is incorrect',
      status: 409,
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      code: 'validation_failed',
      errors: {
        email: ['email must be an email'],
        username: ['username must match /^[a-z0-9_]+$/ regular expression'],
        password: ['password must be longer than or equal to 8 characters'],
        confirmPassword: ['confirmPassword must be longer than or equal to 8 characters'],
      },
    };
  }

  private buildForm(): void {
    this.formState.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
