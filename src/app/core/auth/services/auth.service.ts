import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import {
  catchError,
  finalize,
  firstValueFrom,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BrowserStorageKey } from '../../browser-storage/browser-storage-key.enum';
import { BrowserStorageService } from '../../browser-storage/browser-storage.service';
import { SiteUrls } from '../../navigation/site-urls';
import { CurrentProfileStateService } from '../../states/current-profile/current-profile-state.service';
import { AuthState } from '../contracts/models/auth-state.model';
import { AuthTokenPayload } from '../contracts/models/auth-token-payload.model';
import { CurrentUserState } from '../contracts/models/current-user-state.model';
import { CurrentUser } from '../contracts/models/current-user.model';
import { LoginRequest } from '../contracts/requests/login.request';
import { RefreshTokenRequest } from '../contracts/requests/refresh-token.request';
import { CurrentUserResponse } from '../contracts/responses/current-user.response';
import { LoginResponse } from '../contracts/responses/login.response';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApiService = inject(AuthApiService);
  private readonly browserStorageService = inject(BrowserStorageService);
  private readonly router = inject(Router);
  private readonly currentProfileStateService = inject(CurrentProfileStateService);

  private readonly currentUser = signal<CurrentUser | null>(null);
  private readonly isLoading = signal(false);
  private readonly accessToken = signal<string | null>(null);
  private readonly refreshToken = signal<string | null>(null);
  private readonly decodedToken = signal<AuthTokenPayload | null>(null);

  readonly authState: AuthState = {
    isLoading: this.isLoading.asReadonly(),
    isLoggedIn: computed(() => !!this.accessToken() && !this.isExpired()),
  };

  readonly state: CurrentUserState = {
    user: this.currentUser.asReadonly(),
    hasUser: computed(() => !!this.currentUser()),
  };

  async initialize(): Promise<void> {
    const hasSession = this.restoreAuthState();

    if (!hasSession) {
      return;
    }

    try {
      if (this.isExpired()) {
        await firstValueFrom(this.tryRefreshToken());
      }

      await firstValueFrom(this.loadCurrentUser());
      await firstValueFrom(this.currentProfileStateService.load());
    } catch {
      this.clearSession();
    }
  }

  login(request: LoginRequest): Observable<void> {
    this.isLoading.set(true);

    return this.authApiService.login(request).pipe(
      switchMap((response) => {
        this.setSession(response);

        return this.loadCurrentUser();
      }),
      switchMap(() => this.currentProfileStateService.load()),
      map(() => void 0),
      finalize(() => this.isLoading.set(false)),
    );
  }

  loadCurrentUser(): Observable<CurrentUser> {
    return this.authApiService.getCurrentUser().pipe(
      map((response) => this.mapCurrentUser(response)),
      tap((currentUser) => this.currentUser.set(currentUser)),
    );
  }

  getRefreshToken(): string | null {
    return this.refreshToken();
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

  private restoreAuthState(): boolean {
    const storedAccessToken = this.browserStorageService.get(BrowserStorageKey.AccessToken);
    const storedRefreshToken = this.browserStorageService.get(BrowserStorageKey.RefreshToken);

    if (!storedAccessToken || !storedRefreshToken) {
      return false;
    }

    const decodedToken = this.decodeToken(storedAccessToken);

    if (!decodedToken) {
      this.clearSession();

      return false;
    }

    this.accessToken.set(storedAccessToken);
    this.refreshToken.set(storedRefreshToken);
    this.decodedToken.set(decodedToken);

    return true;
  }

  private clearSession(): void {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.decodedToken.set(null);
    this.isLoading.set(false);
    this.currentUser.set(null);

    this.browserStorageService.remove(BrowserStorageKey.AccessToken);
    this.browserStorageService.remove(BrowserStorageKey.RefreshToken);

    this.currentProfileStateService.clear();
  }

  private isExpired(): boolean {
    const exp = this.decodedToken()?.exp;

    if (!exp) {
      return true;
    }

    return Math.floor(Date.now() / 1000) >= exp;
  }

  private mapCurrentUser(response: CurrentUserResponse): CurrentUser {
    return {
      id: response.id,
      email: response.email,
      isActive: response.isActive,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,

      roles: this.decodedToken()?.roles ?? [],
      permissions: this.decodedToken()?.permissions ?? [],
    };
  }

  private decodeToken(token: string): AuthTokenPayload | null {
    try {
      return jwtDecode<AuthTokenPayload>(token);
    } catch {
      return null;
    }
  }
}
