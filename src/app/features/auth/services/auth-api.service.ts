import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../../../core/http/api-base.service';
import { ApiUrls } from '../../../core/navigation/api-urls';
import { buildApiUrl } from '../../../core/navigation/url.utils';
import { RegisterRequest } from '../contracts/requests/register.request';
import { RegisterResponse } from '../contracts/responses/register.response';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends ApiBaseService {
  /** Register a new user. */
  register(request: RegisterRequest): Observable<RegisterResponse> {
    const endpoint = buildApiUrl(ApiUrls.auth.register);

    return this.post<RegisterRequest, RegisterResponse>(request, endpoint);
  }
}
