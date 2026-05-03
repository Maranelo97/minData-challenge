import { Injectable } from '@angular/core';
import { AnimationType, AnimationStrategy, AnimationOptions } from '../types/animations.types';
import { StaggerCardsStrategy } from '../strategies/hero-cards-animation.strategy';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  // Mapa de estrategias (Registro)
  private strategies: Record<AnimationType, AnimationStrategy> = {
    STAGGER_CARDS: new StaggerCardsStrategy(),
    FADE_IN_UP: { execute: () => {} }, // Implementar luego
    GLITCH_REVEAL: { execute: () => {} }, // Implementar luego
    PARALLAX_SCROLL: { execute: () => {} },
  };

  /**
   * Puerta de llamada única
   */
  public play(
    type: AnimationType,
    element: HTMLElement | HTMLElement[],
    options?: AnimationOptions,
  ): void {
    const strategy = this.strategies[type];
    if (strategy) {
      strategy.execute(element, options);
    } else {
      console.warn(`Animation strategy ${type} not found.`);
    }
  }
}
