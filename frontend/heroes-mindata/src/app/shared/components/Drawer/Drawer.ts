import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { HeroChartService } from '../HeroChart/HeroChartService';
import { DrawwerService } from './DrawerService';
import { HeroCreate } from '../../../features/Heroes/components/HeroDrawers/HeroCreate/HeroCreate';
import { HeroEdit } from '../../../features/Heroes/components/HeroDrawers/HeroEdit/HeroEdit';
import { HeroDetails } from '../../../features/Heroes/components/HeroDrawers/HeroDetails/HeroDetails';

@Component({
  selector: 'app-drawer',
  imports: [HeroCreate, HeroEdit, HeroDetails],
  templateUrl: './Drawer.html',
  styleUrl: './Drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer {
  public drawerService = inject(DrawwerService);
}
