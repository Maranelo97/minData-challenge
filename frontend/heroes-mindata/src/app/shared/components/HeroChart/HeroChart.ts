import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import { Hero } from '../../../core/models/frontend/IHeroFront';
import { HeroChartService } from './HeroChartService';

@Component({
  selector: 'app-hero-chart',
  imports: [],
  templateUrl: './HeroChart.html',
  styleUrl: './HeroChart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroChart {
  @ViewChild('radarCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  hero = input.required<Hero>();
  isGood = input.required<boolean>();

  private chartService = inject(HeroChartService);

  constructor() {
    effect(() => {
      this.chartService.renderRadar(this.canvas, this.hero().powerstats, this.isGood());
    });
  }
}
