import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const isAbsoluteUrl = request.url.startsWith('http');
  const isFrontendAsset = request.url.startsWith('/i18n/');

  if (isFrontendAsset) {
    return next(request);
  }

  const authService = inject(AuthService);
  const token = authService.getToken();

  const apiRequest = request.clone({
    url: isAbsoluteUrl ? request.url : `${environment.apiUrl}${request.url}`,
    setHeaders: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return next(apiRequest);
};
