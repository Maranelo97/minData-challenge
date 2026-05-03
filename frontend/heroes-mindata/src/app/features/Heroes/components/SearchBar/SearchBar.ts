import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DrawwerService } from '../../../../shared/components/Drawer/DrawerService';
import { HeroesService } from '../../services/HeroesService';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './SearchBar.html',
  styleUrl: './SearchBar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  private drawerService = inject(DrawwerService);
public heroesService = inject(HeroesService);
  // Signal local para controlar la visibilidad del dropdown
  public showPredict = signal<boolean>(false);

  public onSearch(term: string): void {
    this.showPredict.set(term.length >= 2); // Solo mostrar si hay texto suficiente
    this.heroesService.updateSearch(term);
  }

  public selectHero(name: string): void {
    this.heroesService.updateSearch(name);
    this.showPredict.set(false);
  }

  public onBlur(): void {
    setTimeout(() => this.showPredict.set(false), 200);
  }
  public openCreate(): void {
    this.drawerService.open({
      mode: 'CREATE',
      title: 'Initialize_Unit',
      subtitle: 'New Vanguard Entry',
      width: 'lg'
    });
  }
}
