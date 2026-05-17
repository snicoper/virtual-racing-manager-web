import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../../../core/http/api-base.service';
import { NoContent } from '../../../core/http/no-content.type';
import { ApiUrls } from '../../../core/navigation/api-urls';
import { buildApiUrl } from '../../../core/navigation/url.utils';
import { ForgotPasswordRequest } from '../pages/forgot-password/forgot-password.request';
import { RegisterRequest } from '../pages/register/register.request';
import { RegisterResponse } from '../pages/register/register.response';
import { ResendVerifyEmail } from '../pages/resend-verify-email/resend-verify-email';
import { VerifyEmailRequest } from '../pages/verify-email/verify-email.request';
import { ResetPasswordRequest } from '../pages/reset-password/reset-password.request';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends ApiBaseService {
  /** Register a new user. */
  register(request: RegisterRequest): Observable<RegisterResponse> {
    const endpoint = buildApiUrl(ApiUrls.auth.register);

    return this.post<RegisterRequest, RegisterResponse>(request, endpoint);
  }

  /** Verify a user's email address. */
  verifyEmail(request: VerifyEmailRequest): Observable<NoContent> {
    const endpoint = buildApiUrl(ApiUrls.auth.verifyEmail);

    return this.post<VerifyEmailRequest, NoContent>(request, endpoint);
  }

  /** Resend a verification email to a user. */
  resendVerifyEmail(request: ResendVerifyEmail): Observable<NoContent> {
    const endpoint = buildApiUrl(ApiUrls.auth.resendVerifyEmail);

    return this.post<ResendVerifyEmail, NoContent>(request, endpoint);
  }

  /** Forgot password */
  forgotPassword(request: ForgotPasswordRequest): Observable<NoContent> {
    const endpoint = buildApiUrl(ApiUrls.auth.forgotPassword);

    return this.post<ForgotPasswordRequest, NoContent>(request, endpoint);
  }

  /** Reset password */
  resetPassword(request: ResetPasswordRequest): Observable<NoContent> {
    const endpoint = buildApiUrl(ApiUrls.auth.resetPassword);

    return this.post<ResetPasswordRequest, NoContent>(request, endpoint);
  }
}
