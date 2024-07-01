import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  const authRequest =
    isLoggedIn &&
    req.clone({
      setHeaders: { Authorization: `Bearer ${authService.getJwtToken}` },
    });
  return next(authRequest || req);
};
