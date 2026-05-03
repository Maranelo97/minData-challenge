import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Drawer } from './shared/components/Drawer/Drawer';
import { LayoutService } from './core/services/LayoutService';
import { SideNav } from './shared/components/SideNav/SideNav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Drawer, SideNav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public layoutService = inject(LayoutService);
  protected readonly title = signal('heroes-mindata');
}
