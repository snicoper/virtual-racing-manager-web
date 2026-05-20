import { DateTime } from 'luxon';

export interface CurrentUserResponse {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: DateTime;
  updatedAt: DateTime;
}
