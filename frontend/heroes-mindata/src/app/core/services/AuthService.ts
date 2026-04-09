import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthResponse, LoginCredentials } from '../models/backend/Auth';
import { isPlatformBrowser } from '@angular/common';
import { BrowserService } from './browserService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = 'http://localhost:3000/api/auth';
  private readonly TOKEN_KEY = 'tokenHeroes';
  private platformId = inject(PLATFORM_ID);
  private browser = inject(BrowserService);
  // El estado de la sesión como un Signal
  // Intentamos recuperar el token al iniciar
  private _token = signal<string | null>(this.browser.getLocalStorage(this.TOKEN_KEY));

  // Computed signal para saber si estamos autenticados (solo lectura)
  public isAuthenticated = computed(() => !!this._token());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedToken = localStorage.getItem('tokenHeroes');
      this._token.set(savedToken);
    }
  }

  login(credentials: LoginCredentials) {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((response) => {
        this._token.set(response.token);
        // Guardado seguro sin IFs manuales
        this.browser.setLocalStorage(this.TOKEN_KEY, response.token);
        this.browser.setLocalStorage('userHeroes', JSON.stringify(response.user));

        this.router.navigate(['/heroes']);
      }),
    );
  }

  logout() {
    this._token.set(null);
    localStorage.removeItem('tokenHeroes');
    localStorage.removeItem('userHeroes');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }
}
