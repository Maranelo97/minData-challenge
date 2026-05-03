import { Injectable, signal, computed } from '@angular/core';
import { Hero } from '../../../core/models/frontend/IHeroFront';
import { DrawerOptions } from '../types/Drawer.types';

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

  public widthClass = computed(() => {
    const size = this._options()?.width;
    switch (size) {
      case 'sm': return 'w-[400px]';
      case 'md': return 'w-[600px]';
      case 'lg': return 'w-[900px]'; // Ideal para tu Hero Create con Radar
      case 'full': return 'w-screen';
      default: return 'w-[450px]'; // Fallback original
    }
  });
}
