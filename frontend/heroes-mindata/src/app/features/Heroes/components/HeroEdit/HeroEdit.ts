import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Hero } from '../../../../core/models/frontend/IHeroFront';
@Component({
  selector: 'app-hero-edit',
  imports: [],
  templateUrl: './HeroEdit.html',
  styleUrl: './HeroEdit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEdit {
  public readonly hero = input<Hero | undefined>();
  public readonly mode = input<string>();
}
  