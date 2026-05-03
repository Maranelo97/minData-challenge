import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/AuthService';
import { catchError, throwError } from 'rxjs';

export const heroesAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.getToken() && authService.isTokenExpired()) {
    authService.logout();
    return throwError(() => new Error('Session Expired'));
  }

  const token = authService.getToken();
  let clonedRequest = req;

  if (token) {
    clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.warn('AUTH_PROTOCOL_FAILURE: Invalidating session...');
        authService.logout();
      }
      return throwError(() => error);
    }),
  );
};
