import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const apiRequest = request.clone({
    url: request.url.startsWith('http') ? request.url : `${environment.apiUrl}${request.url}`,
    setHeaders: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return next(apiRequest);
};
