import { Signal } from '@angular/core';
import { CurrentUser } from './current-user.model';

export interface CurrentUserState {
  user: Signal<CurrentUser | null>;
  hasUser: Signal<boolean>;
}
