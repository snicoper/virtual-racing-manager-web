import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../../http/api-base.service';
import { ApiUrls } from '../../navigation/api-urls';
import { buildApiUrl } from '../../navigation/url.utils';
import { LoginRequest } from '../contracts/requests/login.request';
import { RefreshTokenRequest } from '../contracts/requests/refresh-token.request';
import { LoginResponse } from '../contracts/responses/login.response';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends ApiBaseService {
  /** Login user. */
  login(request: LoginRequest): Observable<LoginResponse> {
    const endpoint = buildApiUrl(ApiUrls.auth.login);

    return this.post<LoginRequest, LoginResponse>(request, endpoint);
  }

  /** Refresh the token. */
  refreshToken(request: RefreshTokenRequest): Observable<LoginResponse> {
    const endpoint = buildApiUrl(ApiUrls.auth.refreshToken);

    return this.post<RefreshTokenRequest, LoginResponse>(request, endpoint);
  }
}
