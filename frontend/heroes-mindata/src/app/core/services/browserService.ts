import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  private platformId = inject(PLATFORM_ID);

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Ejecuta una función callback solo si estamos en el navegador.
   * Útil para envolver lógica de storage o window.
   */
  runSafe(callback: () => void): void {
    if (this.isBrowser()) {
      callback();
    }
  }

  /**
   * Helper para obtener items del localStorage de forma segura
   */
  getLocalStorage(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setLocalStorage(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }
}
