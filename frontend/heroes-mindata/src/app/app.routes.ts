import { Router, Routes } from '@angular/router';
import { authGuard } from './core/guard/Auth-guard';
import { inject } from '@angular/core';
import { AuthService } from './core/services/AuthService';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // Le asignamos el componente de Login como "fallback", 
    // pero el canActivate decidirá el destino real.
    loadComponent: () => import('./features/Login/Login').then((m) => m.Login),
    canActivate: [
      () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        return authService.isAuthenticated()
          ? router.parseUrl('/heroes')
          : router.parseUrl('/login');
      },
    ],
  },
  {
    path: 'login',
    canActivate: [
      () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        // Si ya hay token, no mostramos el login, vamos a heroes
        return authService.isAuthenticated() ? router.parseUrl('/heroes') : true;
      }
    ],
    loadComponent: () => import('./features/Login/Login').then((m) => m.Login),
  },
  {
    path: 'heroes',
    loadComponent: () => import('./features/Heroes/Heroes').then((m) => m.Heroes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];