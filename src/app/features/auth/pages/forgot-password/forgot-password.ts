import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { SnackBarService } from '../../../../core/services/snackbar.service';
import { BtnLoading } from '../../../../shared/components/buttons/btn-loading/btn-loading';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { FormInput } from '../../../../shared/forms/inputs/form-input/form-input';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';
import { AuthApiService } from '../../services/auth-api.service';
import { ForgotPasswordRequest } from './forgot-password.request';

@Component({
  selector: 'vrm-forgot-password',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, FormInput, BtnLoading],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly snackBarService = inject(SnackBarService);

  protected readonly formState: FormState = {
    form: this.fb.group({}),
    problemDetails: signal(null),
    isSubmitted: signal(false),
    isLoading: signal(false),
  };

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
    const forgotPasswordRequest: ForgotPasswordRequest = this.formState.form.getRawValue();

    this.authApiService
      .forgotPassword(forgotPasswordRequest)
      .pipe(finalize(() => this.formState.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.formState.form.reset();
          this.snackBarService.success(
            'Password reset instructions have been sent, please check your inbox.',
          );
        },
        error: (error: HttpErrorResponse) => {
          this.formState.problemDetails.set(error.error);
          this.snackBarService.error('Failed to send password reset instructions.');
        },
      });
  }

  protected buildForm(): void {
    this.formState.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
