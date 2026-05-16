import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { logError, logInfo, logWarning } from '../errors/logger/logger';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          logWarning('API authentication error', error);
          break;
        case HttpStatusCode.BadRequest:
          logWarning('API validation error', error);
          break;
        case HttpStatusCode.Conflict:
          logWarning('API validation/business error', error);
          break;
        case HttpStatusCode.NoContent:
          logInfo('API returned no content', error);
          break;
        case HttpStatusCode.Forbidden:
          logWarning('API access forbidden', error);
          break;
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
