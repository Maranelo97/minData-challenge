import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChildren,
} from '@angular/core';
import { AnimationService } from '../../../../core/animations/services/AnimationService';
import { HeroCard } from '../../../../shared/components/HeroCard/HeroCard';
import { HeroesService } from '../../services/HeroesService';
import { SearchBar } from '../SearchBar/SearchBar';
import { Paginator } from '../../../../shared/components/Paginator/Paginator';

@Component({
  selector: 'app-hero-grid',
  imports: [SearchBar, HeroCard, Paginator],
  templateUrl: './HeroGrid.html',
  styleUrl: './HeroGrid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroGrid {
  public heroesService = inject(HeroesService);
  private animationService = inject(AnimationService);
  private cardElements = viewChildren(HeroCard, { read: ElementRef });
  public heroes = this.heroesService.heroes;
  public isLoading = this.heroesService.isLoading;

  constructor() {
   effect(() => {
  const cards = this.cardElements(); // Solo habrá máximo 25
  if (cards.length > 0) {
    // Animación limpia porque el DOM es pequeño
    this.animationService.play('STAGGER_CARDS', cards.map(c => c.nativeElement));
  }
});
  }

  trackByHeroId(index: number, hero: any): string {
    return hero.id;
  }
}
