import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero-grid',
  imports: [],
  templateUrl: './HeroGrid.html',
  styleUrl: './HeroGrid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroGrid { }
