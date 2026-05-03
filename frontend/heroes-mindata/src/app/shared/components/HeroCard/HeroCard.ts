import { ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import { Hero } from '../../../core/models/frontend/IHeroFront';
import { HeroCardService } from './HeroCardService';
import { GlassParallaxDirective } from '../../directives/GlassParallax';
import { IHeroCardView } from '../models/IHeroCard';
import { DrawwerService } from '../Drawer/DrawerService';


@Component({
  selector: 'app-hero-card',
  imports: [GlassParallaxDirective],
  templateUrl: './HeroCard.html',
  styleUrl: './HeroCard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeroCard {
  private readonly drawerService = inject(DrawwerService);
  private readonly service = inject(HeroCardService);

  public readonly hero = input.required<Hero>();

  public readonly view = computed<IHeroCardView>(() => {
    const h = this.hero();
    const maxStat = this.service.calculateMaxStat(h.powerstats);
    const isGood = this.service.getAlignment(h.alignment);

    return {
      id: h.id,
      name: h.name,
      imageUrl: h.imageMd || 'assets/images/placeholder-hero.jpg',
      isGood: isGood,
      alignmentLabel: isGood ? 'VANGUARD ACTIVE' : 'ROGUE SIGNAL',
      mainStat: {
        label: maxStat.label,
        value: maxStat.value,
        percentage: `${maxStat.value}%`,
      },
      secondaryStats: {
        str: h.powerstats?.strength ?? 0,
        spd: h.powerstats?.speed ?? 0,
        pwr: h.powerstats?.power ?? 0,
      },
    };
  });

  public openDetails(): void {
    this.drawerService.open({
      mode: 'DETAILS',
      title: 'Intel Unit',
      subtitle: 'Hero Profile Matrix',
      data: this.hero(),
    });
  }

    public openEdit(): void {
    this.drawerService.open({
      mode: 'EDIT',
      title: 'Edit Hero',
      subtitle: 'Hero Profile Editor',
      data: this.hero(),
    });
  }
}
