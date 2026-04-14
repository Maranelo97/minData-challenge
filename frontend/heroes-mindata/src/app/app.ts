import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Drawer } from './shared/components/Drawer/Drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Drawer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('heroes-mindata');
}
