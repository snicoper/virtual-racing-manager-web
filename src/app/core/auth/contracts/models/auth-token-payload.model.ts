import { JwtPayload } from 'jwt-decode';

export interface AuthTokenPayload extends JwtPayload {
  sub: string;
  email: string;
  roles: string[];
  permissions: string[];
}
