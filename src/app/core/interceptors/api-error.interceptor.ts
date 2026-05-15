import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { logError, logWarning } from '../errors/logger/logger';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case HttpStatusCode.BadRequest:
        case HttpStatusCode.Conflict:
          logWarning('API validation/business error', error);
          break;

        case HttpStatusCode.Forbidden:
        case HttpStatusCode.NotFound:
          logWarning('API access/resource error', error);
          break;

        default:
          logError('Unexpected API error', error);
      }

      return throwError(() => error);
    }),
  );
};
