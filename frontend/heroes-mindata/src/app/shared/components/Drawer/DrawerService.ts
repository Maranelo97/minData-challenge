import { Injectable, signal, computed } from '@angular/core';
import { Hero } from '../../../core/models/frontend/IHeroFront';
import { DrawerOptions, DrawerMode } from '../models/types/Drawer.types';

@Injectable({ providedIn: 'root' })
export class DrawwerService {
  private _options = signal<DrawerOptions | null>(null);
  public isOpen = signal<boolean>(false);
  public options = computed(() => this._options());

  public currentMode = computed(() => this._options()?.mode);
  // Estado privado del Hero
  private _selectedHero = signal<Hero | null>(null);

  // Estado de visibilidad

  // Exposición pública de la data
  public hero = computed(() => this._selectedHero());

  public open(options: DrawerOptions): void {
    this._options.set(options);
    this.isOpen.set(true);
  }

  public close(): void {
    this.isOpen.set(false);
    // Limpiamos después de la animación de cierre para evitar saltos visuales
    setTimeout(() => this._options.set(null), 500);
  }
}
