import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  imports: [],
  templateUrl: './SideNav.html',
  styleUrl: './SideNav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav { }
