import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/AuthService';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './SideNav.html',
  styleUrl: './SideNav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav {
  private authService = inject(AuthService)
  public isCollapsed = signal<boolean>(true);

  public toggleSideNav(): void {
    this.isCollapsed.update(state => !state);
  }

  public logout(): void {
      this.authService.logout();
  }
}