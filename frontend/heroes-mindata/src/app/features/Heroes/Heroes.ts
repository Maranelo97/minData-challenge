import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HeroGrid } from "./components/HeroGrid/HeroGrid";

@Component({
  selector: 'app-heroes',
  imports: [CommonModule, ScrollingModule, HeroGrid],
  templateUrl: './Heroes.html',
  styleUrl: './Heroes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Heroes {
}