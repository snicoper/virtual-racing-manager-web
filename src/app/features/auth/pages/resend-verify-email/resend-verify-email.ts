import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { SnackBarService } from '../../../../core/services/snackbar.service';
import { BtnLoading } from '../../../../shared/components/buttons/btn-loading/btn-loading';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { createFormState, resetFormState } from '../../../../shared/forms/form-utils';
import { FormInput } from '../../../../shared/forms/inputs/form-input/form-input';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'vrm-resend-verify-email',
  imports: [RouterLink, ReactiveFormsModule, MatCardModule, FormInput, BtnLoading],
  templateUrl: './resend-verify-email.html',
  styleUrl: './resend-verify-email.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendVerifyEmail implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  protected readonly formState: FormState = createFormState(this.fb.nonNullable.group({}));

  protected readonly siteUrls = SiteUrls;
  protected readonly formInputTypes = FormInputType;
  protected readonly iconPositions = FormIconPosition;
  protected readonly siteName = AppEnvironment.SiteName;

  ngOnInit(): void {
    this.buildForm();
  }

  handleSubmit(): void {
    this.formState.isSubmitted.set(true);

    if (this.formState.form.invalid) {
      this.formState.form.markAllAsTouched();

      return;
    }

    this.formState.isLoading.set(true);
    const resendVerifyEmailRequest = this.formState.form.getRawValue();

    this.authApiService
      .resendVerifyEmail(resendVerifyEmailRequest)
      .pipe(finalize(() => this.formState.isLoading.set(false)))
      .subscribe({
        next: () => {
          resetFormState(this.formState.form);
          this.snackBarService.success(
            'Verification email has been sent, please check your inbox.',
          );
          this.router.navigate([SiteUrls.auth.login]);
        },
        error: (error: HttpErrorResponse) => {
          this.formState.problemDetails.set(error.error);
        },
      });
  }

  private buildForm(): void {
    this.formState.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
