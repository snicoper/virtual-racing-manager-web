import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { SiteUrls } from '../../navigation/site-urls';
import { LoginRequest } from '../contracts/requests/login.request';
import { RefreshTokenRequest } from '../contracts/requests/refresh-token.request';
import { LoginResponse } from '../contracts/responses/login.response';
import { AuthApiService } from './auth-api.service';
import { BrowserStorageKey } from '../../browser-storage/browser-storage-key.enum';
import { BrowserStorageService } from '../../browser-storage/browser-storage.service';
import { AuthState } from '../contracts/states/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApiService = inject(AuthApiService);
  private readonly browserStorageService = inject(BrowserStorageService);
  private readonly router = inject(Router);

  private readonly isLoading = signal(false);
  private readonly accessToken = signal<string | null>(null);
  private readonly refreshToken = signal<string | null>(null);
  private readonly decodedToken = signal<JwtPayload | null>(null);

  readonly authState: AuthState = {
    isLoading: this.isLoading.asReadonly(),
    isLoggedIn: computed(() => !!this.accessToken() && !this.isExpired()),
  };

  initialize(): void {
    this.restoreAuthState();
  }

  login(request: LoginRequest): Observable<boolean> {
    this.isLoading.set(true);

    return this.authApiService.login(request).pipe(
      map((response) => {
        this.setSession(response);
        this.isLoading.set(false);

        return true;
      }),
      catchError((error) => {
        this.isLoading.set(false);

        return throwError(() => error);
      }),
    );
  }

  tryRefreshToken(): Observable<string | null> {
    const currentRefreshToken = this.refreshToken();

    if (!currentRefreshToken) {
      return of(null);
    }

    const request: RefreshTokenRequest = {
      refreshToken: currentRefreshToken,
    };

    return this.authApiService.refreshToken(request).pipe(
      map((response) => {
        this.setSession(response);

        return response.accessToken;
      }),
      catchError((error) => {
        this.clearSession();

        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    this.clearSession();
    this.router.navigate([SiteUrls.auth.login]);
  }

  getToken(): string | null {
    return this.accessToken();
  }

  private setSession(response: LoginResponse): void {
    const decodedToken = this.decodeToken(response.accessToken);

    if (!decodedToken) {
      this.clearSession();

      return;
    }

    this.accessToken.set(response.accessToken);
    this.refreshToken.set(response.refreshToken);
    this.decodedToken.set(decodedToken);

    this.browserStorageService.set(BrowserStorageKey.AccessToken, response.accessToken);
    this.browserStorageService.set(BrowserStorageKey.RefreshToken, response.refreshToken);
  }

  private restoreAuthState(): void {
    const storedAccessToken = this.browserStorageService.get(BrowserStorageKey.AccessToken);
    const storedRefreshToken = this.browserStorageService.get(BrowserStorageKey.RefreshToken);

    if (!storedAccessToken || !storedRefreshToken) {
      return;
    }

    const decodedToken = this.decodeToken(storedAccessToken);

    if (!decodedToken) {
      this.clearSession();

      return;
    }

    this.accessToken.set(storedAccessToken);
    this.refreshToken.set(storedRefreshToken);
    this.decodedToken.set(decodedToken);

    if (this.isExpired()) {
      this.clearSession();
    }
  }

  private clearSession(): void {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.decodedToken.set(null);
    this.isLoading.set(false);

    this.browserStorageService.remove(BrowserStorageKey.AccessToken);
    this.browserStorageService.remove(BrowserStorageKey.RefreshToken);
  }

  private isExpired(): boolean {
    const exp = this.decodedToken()?.exp;

    if (!exp) {
      return true;
    }

    return Math.floor(Date.now() / 1000) >= exp;
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }
}
