import { Signal } from '@angular/core';
import { NullContent } from '../../http/null-content.type';
import { CurrentUserProfile } from './current-profile.model';

export interface CurrentProfileState {
  profile: Signal<CurrentUserProfile | NullContent>;
  hasProfile: Signal<boolean>;
  isLoading: Signal<boolean>;
}
