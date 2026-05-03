import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input } from '@angular/core';
import { Hero, Powerstats } from '../../../../../core/models/frontend/IHeroFront';
import { toSignal } from '@angular/core/rxjs-interop';
import { HERO_EDIT_CONFIG } from '../../../../../shared/components/dynamic-form/form-blueprints/hero-edit.config';
import { FormBuilderService } from '../../../../../shared/components/dynamic-form/FormBuilderService';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroChart } from '../../../../../shared/components/HeroChart/HeroChart';
@Component({
  selector: 'app-hero-edit',
  imports: [ ReactiveFormsModule, HeroChart],
  templateUrl: './HeroEdit.html',
  styleUrl: './HeroEdit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEdit {
  private cdr = inject(ChangeDetectorRef);
  public readonly mode = input<string>();
  private builder = inject(FormBuilderService);
  private lastUpdate = 0;

  // Recibimos el héroe desde el Drawer Service
  hero = input.required<Hero>();

  formStructure = this.builder.buildForm(HERO_EDIT_CONFIG);
  get editForm() { return this.formStructure.instance; }

  constructor() {
    // Sincronizamos el Héroe con el Formulario al cargar
    effect(() => {
      const h = this.hero();
      if (h) {
        // Usamos untracked o simplemente patchValue inicial
        this.editForm.patchValue({
          name: h.name,
          alignment: h.alignment,
          ...h.powerstats
        });
      }
    });
  }

  // Preview para el gráfico en tiempo real basado en el formulario
  private formValues = toSignal(this.editForm.valueChanges, { 
    initialValue: this.editForm.value 
  });

  public liveHeroPreview = computed<Hero>(() => {
    const val = this.formValues();
    return {
      ...this.hero(),
      name: val.name,
      alignment: val.alignment,
      powerstats: {
        intelligence: Number(val.intelligence ?? 0),
        strength: Number(val.strength ?? 0),
        speed: Number(val.speed ?? 0),
        durability: Number(val.durability ?? 0),
        power: Number(val.power ?? 0),
        combat: Number(val.combat ?? 0),
      }
    } as Hero;
  });

  public isGoodAlignment = computed(() => this.formValues().alignment === 'good');

  /**
   * ACTUALIZACIÓN DESDE EL RADAR
   * Este método recibe los datos cuando arrastras los puntos en el Canvas
   */
handleRadarChange(newStats: Powerstats) {
    const now = Date.now();
    if (now - this.lastUpdate > 16) {

      // 1. Actualizamos el formulario
      this.editForm.patchValue(newStats, { emitEvent: false });
      
      
      // 3. CRÍTICO PARA ZONELESS: Avisar a Angular que verifique este componente y sus hijos
      this.cdr.detectChanges(); 
      
      this.lastUpdate = now;
    }
  }

  onUpdate() {
    if (this.editForm.valid) {
      console.log('RE-WRITING NEURAL DATA...', this.editForm.getRawValue());
      // Aquí iría tu llamada al servicio: this.heroService.update(...)
    }
  }
}