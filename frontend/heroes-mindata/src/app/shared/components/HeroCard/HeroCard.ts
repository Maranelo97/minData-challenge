import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Hero } from '../../../core/models/frontend/IHeroFront';
import { UpperCasePipe, NgIf } from '@angular/common';
import { GlassParallaxDirective } from '../../directives/GlassParallax';

@Component({
  selector: 'app-hero-card',
  imports: [GlassParallaxDirective],
  templateUrl: './HeroCard.html',
  styleUrl: './HeroCard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeroCard {
  hero = input.required<Hero>();
}
