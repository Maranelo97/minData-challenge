import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroesService } from './services/HeroesService';
import { CommonModule } from '@angular/common';
import { HeroCard } from '../../shared/components/HeroCard/HeroCard';
import { ScrollingModule } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-heroes',
  imports: [CommonModule, ScrollingModule, HeroCard],
  templateUrl: './Heroes.html',
  styleUrl: './Heroes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Heroes {
  public heroesService = inject(HeroesService);

  // Seleccionamos los signals del servicio
  public heroes = this.heroesService.heroes;
  public isLoading = this.heroesService.isLoading;

  // TrackBy para optimizar el re-renderizado
  trackByHeroId(index: number, hero: any): string {
    return hero.id;
  }
}
