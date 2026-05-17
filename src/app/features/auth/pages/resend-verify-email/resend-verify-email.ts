import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { BtnLoading } from '../../../../shared/components/buttons/btn-loading/btn-loading';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { FormInput } from '../../../../shared/forms/inputs/form-input/form-input';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';
import { AuthApiService } from '../../services/auth-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

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

  protected readonly formState: FormState = {
    form: this.fb.group({}),
    problemDetails: signal(null),
    isSubmitted: signal(false),
    isLoading: signal(false),
  };

  protected readonly siteUrls = SiteUrls;
  protected readonly formInputTypes = FormInputType;
  protected readonly iconPositions = FormIconPosition;

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
          this.formState.problemDetails.set(null);
          this.formState.form.reset();
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
