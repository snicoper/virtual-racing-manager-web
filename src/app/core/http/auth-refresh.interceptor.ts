import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { SiteUrls } from '../navigation/site-urls';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authRefreshInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== HttpStatusCode.Unauthorized) {
        return throwError(() => error);
      }

      if (!authService.getRefreshToken()) {
        authService.logout();

        return throwError(() => error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.tryRefreshToken().pipe(
          switchMap((newToken) => {
            isRefreshing = false;
            refreshTokenSubject.next(newToken);

            return next(addTokenToRequest(request, newToken ?? ''));
          }),
          catchError((refreshError) => {
            isRefreshing = false;

            authService.logout();
            router.navigate([SiteUrls.auth.login]);

            return throwError(() => refreshError);
          }),
        );
      }

      return refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next(addTokenToRequest(request, token!))),
      );
    }),
  );
};

function addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
