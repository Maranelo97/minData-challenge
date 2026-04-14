import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { HeroChartService } from '../HeroChart/HeroChartService';
import { DrawwerService } from './DrawerService';
import { HeroCreate } from '../../../features/Heroes/components/HeroCreate/HeroCreate';
import { HeroEdit } from '../../../features/Heroes/components/HeroEdit/HeroEdit';
import { HeroDetails } from '../../../features/Heroes/components/HeroDetails/HeroDetails';

@Component({
  selector: 'app-drawer',
  imports: [HeroCreate, HeroEdit, HeroDetails],
  templateUrl: './Drawer.html',
  styleUrl: './Drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer { 
@ViewChild('radarCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  
  public drawerService = inject(DrawwerService);
  private chartService = inject(HeroChartService);

  constructor() {
    effect(() => {
      const hero = this.drawerService.hero();
      if (hero && this.canvas) {
        setTimeout(() => {
          this.chartService.renderRadar(
            this.canvas, 
            hero.powerstats, 
            hero.alignment === 'good'
          );
        }, 100);
      }
    });
  }

}
