import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
  untracked, // Importante para evitar bucles
} from '@angular/core';
import { Hero, Powerstats } from '../../../core/models/frontend/IHeroFront';
import { HeroChartService } from './HeroChartService';

@Component({
  selector: 'app-hero-chart',
  standalone: true, // Asegúrate de tenerlo si usas imports
  imports: [],
  templateUrl: './HeroChart.html',
  styleUrl: './HeroChart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroChart implements OnDestroy {
  @ViewChild('radarCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  hero = input.required<Hero>();
  isGood = input.required<boolean>();
  @Output() statsChange = new EventEmitter<Powerstats>();
  editable = input<boolean>(false);
  private chartService = inject(HeroChartService);

  constructor() {
    // Escuchar cambios del Drag
    effect(() => {
      const stats = this.chartService.activeStats();
      // Solo emitimos si estamos en modo editable
      if (stats && this.editable()) {
        untracked(() => this.statsChange.emit(stats));
      }
    });

    // Renderizar / Actualizar
    effect(() => {
      this.chartService.updateOrRender(
        this.canvas,
        this.hero().powerstats,
        this.isGood(),
        this.editable(), // Pasamos el modo actual
      );
    });
  }

  ngOnDestroy() {
    this.chartService.destroyChart();
  }
}
