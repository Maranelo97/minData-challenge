import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private router = inject(Router);
  public showHUD = signal<boolean>(true);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const isLogin = event.urlAfterRedirects.includes('/login');
      this.showHUD.set(!isLogin);
    });
  }
}