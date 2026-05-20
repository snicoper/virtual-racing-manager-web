import { DateTime } from 'luxon';

export interface CurrentUser {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: DateTime;
  updatedAt: DateTime;

  roles: string[];
  permissions: string[];
}
