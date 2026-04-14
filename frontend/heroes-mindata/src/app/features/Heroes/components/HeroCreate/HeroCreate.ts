import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-create',
  imports: [],
  templateUrl: './HeroCreate.html',
  styleUrl: './HeroCreate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCreate {
  public readonly mode = input<string>();
}
