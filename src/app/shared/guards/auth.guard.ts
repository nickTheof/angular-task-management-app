import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.token();

  if (token && !authService.isTokenExpired(token)) {
    return true;
  }

  authService.clearCredentials();
  router.navigate(['/auth/login'], { replaceUrl: true });
  return false;
};

export const authGuardChild: CanActivateFn = authGuard;
