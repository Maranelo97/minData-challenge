import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Hero } from '../../../../../core/models/frontend/IHeroFront';
import { HeroChart } from '../../../../../shared/components/HeroChart/HeroChart';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [HeroChart],
  templateUrl: './HeroDetails.html',
  styleUrl: './HeroDetails.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroDetails {
  hero = input.required<Hero>();
}
