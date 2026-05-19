export interface CurrentUser {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  roles: string[];
  permissions: string[];
}
