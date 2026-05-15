import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const apiRequest = request.clone({
    url: request.url.startsWith('http') ? request.url : `${environment.apiUrl}${request.url}`,
  });

  return next(apiRequest);
};
