import { Signal } from '@angular/core';
import { CurrentUserResponse } from '../responses/current-user.response';

export interface CurrentUserState {
  user: Signal<CurrentUserResponse | null>;
  hasUser: Signal<boolean>;
}
