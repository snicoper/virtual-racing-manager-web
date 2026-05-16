import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SiteUrls } from '../../navigation/site-urls';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authState.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree([SiteUrls.auth.login]);
};
