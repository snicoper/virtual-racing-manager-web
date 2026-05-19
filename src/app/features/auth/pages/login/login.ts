import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { LoginRequest } from '../../../../core/auth/contracts/requests/login.request';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { BtnLoading } from '../../../../shared/components/buttons/btn-loading/btn-loading';
import { NonFieldErrors } from '../../../../shared/forms/errors/non-field-errors/non-field-errors';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { createFormState, resetFormState } from '../../../../shared/forms/form-utils';
import { FormInput } from '../../../../shared/forms/inputs/form-input/form-input';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';
import { emailValidator } from '../../../../shared/forms/validators/email.validator';

@Component({
  selector: 'vrm-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    TranslatePipe,
    FormInput,
    NonFieldErrors,
    BtnLoading,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isEmailNotVerifiedError = computed(
    () => this.formState.problemDetails()?.code === 'email_not_verified',
  );

  protected readonly formState: FormState = createFormState(this.fb.nonNullable.group({}));
  protected readonly formInputTypes = FormInputType;
  protected readonly iconPositions = FormIconPosition;
  protected readonly siteName = AppEnvironment.SiteName;
  protected readonly siteUrls = SiteUrls;

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
    const loginRequest: LoginRequest = this.formState.form.getRawValue();

    this.authService
      .login(loginRequest)
      .pipe(finalize(() => this.formState.isLoading.set(false)))
      .subscribe({
        next: () => {
          resetFormState(this.formState.form);
          this.router.navigate([SiteUrls.userProfiles.profile]);
        },
        error: (error) => {
          this.formState.problemDetails.set(error.error);
        },
      });
  }

  private buildForm(): void {
    this.formState.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required]],
    });
  }
}
