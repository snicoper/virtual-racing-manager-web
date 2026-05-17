import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { BtnLoading } from '../../../../shared/components/buttons/btn-loading/btn-loading';
import { NonFieldErrors } from '../../../../shared/forms/errors/non-field-errors/non-field-errors';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { FormInput } from '../../../../shared/forms/inputs/form-input/form-input';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';
import { passwordMustMatchValidator } from '../../../../shared/forms/validators/password-must-match.validator';
import { AuthApiService } from '../../services/auth-api.service';
import { RegisterRequest } from './register.request';

@Component({
  selector: 'vrm-register',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, NonFieldErrors, FormInput, BtnLoading],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);

  protected readonly formInputTypes = FormInputType;
  protected readonly iconPositions = FormIconPosition;
  protected readonly siteName = AppEnvironment.SiteName;
  protected readonly siteUrls = SiteUrls;

  protected readonly formState: FormState = {
    form: this.fb.group({}),
    problemDetails: signal(null),
    isSubmitted: signal(false),
    isLoading: signal(false),
  };

  ngOnInit(): void {
    this.buildForm();
  }

  protected handleSubmit(): void {
    this.formState.problemDetails.set(null);
    this.formState.isSubmitted.set(true);

    if (this.formState.form.invalid) {
      this.formState.form.markAllAsTouched();

      return;
    }

    this.formState.isLoading.set(true);
    const registerRequest: RegisterRequest = this.formState.form.getRawValue();

    this.authApiService
      .register(registerRequest)
      .pipe(finalize(() => this.formState.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.formState.problemDetails.set(null);
          this.formState.form.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.formState.problemDetails.set(error.error);
        },
      });
  }

  private buildForm(): void {
    this.formState.form = this.fb.nonNullable.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [passwordMustMatchValidator('password', 'confirmPassword')],
      },
    );
  }
}
