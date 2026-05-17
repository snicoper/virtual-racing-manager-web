import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { SnackBarService } from '../../../../core/services/snackbar.service';
import { BtnLoading } from '../../../../shared/components/buttons/btn-loading/btn-loading';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { FormInput } from '../../../../shared/forms/inputs/form-input/form-input';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';
import { passwordMustMatchValidator } from '../../../../shared/forms/validators/password-must-match.validator';
import { AuthApiService } from '../../services/auth-api.service';
import { ResetPasswordRequest } from './reset-password.request';

@Component({
  selector: 'vrm-reset-password',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, FormInput, BtnLoading],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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
    const resetPasswordRequest: ResetPasswordRequest = this.formState.form.getRawValue();
    resetPasswordRequest.token = this.route.snapshot.queryParamMap.get('token') ?? '';

    if (!resetPasswordRequest.token) {
      this.snackBarService.error('Invalid or expired token');

      return;
    }

    this.authApiService
      .resetPassword(resetPasswordRequest)
      .pipe(finalize(() => this.formState.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.formState.form.reset();
          this.snackBarService.success('Password has been reset successfully');
          this.router.navigate([SiteUrls.auth.login]);
        },
        error: () => {
          this.snackBarService.error('Invalid or expired token');
        },
      });
  }

  private buildForm(): void {
    this.formState.form = this.fb.nonNullable.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [passwordMustMatchValidator('password', 'confirmPassword')],
      },
    );
  }
}
