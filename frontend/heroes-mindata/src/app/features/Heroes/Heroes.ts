import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { HeroesService } from './services/HeroesService';
import { CommonModule } from '@angular/common';
import { HeroCard } from '../../shared/components/HeroCard/HeroCard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SearchBar } from './components/SearchBar/SearchBar';

@Component({
  selector: 'app-heroes',
  imports: [CommonModule, ScrollingModule, HeroCard, SearchBar],
  templateUrl: './Heroes.html',
  styleUrl: './Heroes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Heroes {
  public heroesService = inject(HeroesService);

  // Mantenemos los originales
  public heroes = this.heroesService.heroes;
  public isLoading = this.heroesService.isLoading;

  // Mostramos solo los primeros 30 para avanzar rápido
  public limitedHeroes = computed(() => this.heroes().slice(0, 30));

  trackByHeroId(index: number, hero: any): string {
    return hero.id;
  }
}