import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { NullContent } from '../../http/null-content.type';
import { CurrentProfileApiService } from './current-profile-api.service';
import { CurrentUserProfile } from './current-profile.model';
import { CurrentProfileState } from './current-profile-state.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentProfileStateService {
  private readonly currentProfileApiService = inject(CurrentProfileApiService);

  private readonly profile = signal<CurrentUserProfile | NullContent>(null);
  private readonly isLoading = signal(false);

  readonly state: CurrentProfileState = {
    profile: this.profile.asReadonly(),
    hasProfile: computed(() => !!this.profile()),
    isLoading: this.isLoading.asReadonly(),
  };

  load(): Observable<CurrentUserProfile | NullContent> {
    this.isLoading.set(true);

    return this.currentProfileApiService.me().pipe(
      tap((profile) => this.profile.set(profile)),
      finalize(() => this.isLoading.set(false)),
    );
  }

  clear(): void {
    this.profile.set(null);
    this.isLoading.set(false);
  }

  set(profile: CurrentUserProfile | NullContent): void {
    this.profile.set(profile);
  }
}
