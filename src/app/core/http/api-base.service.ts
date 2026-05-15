import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NoContent } from './no-content.type';

export abstract class ApiBaseService {
  protected readonly http = inject(HttpClient);

  protected get<TResponse>(url: string): Observable<TResponse> {
    return this.http.get<TResponse>(url);
  }

  protected post<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(url, request);
  }

  protected put<TRequest, TResponse>(
    url: string,
    request: TRequest,
  ): Observable<TResponse | NoContent> {
    return this.http
      .put<TResponse>(url, request, { observe: 'response' })
      .pipe(map((response) => this.mapResponseOrNoContent(response)));
  }

  protected patch<TRequest, TResponse>(
    url: string,
    request: TRequest,
  ): Observable<TResponse | NoContent> {
    return this.http
      .patch<TResponse>(url, request, { observe: 'response' })
      .pipe(map((response) => this.mapResponseOrNoContent(response)));
  }

  protected delete<TResponse>(url: string): Observable<TResponse | NoContent> {
    return this.http
      .delete<TResponse>(url, { observe: 'response' })
      .pipe(map((response) => this.mapResponseOrNoContent(response)));
  }

  private mapResponseOrNoContent<TResponse>(
    response: HttpResponse<TResponse>,
  ): TResponse | NoContent {
    if (response.status === HttpStatusCode.NoContent) {
      return null;
    }

    return response.body as TResponse;
  }
}
