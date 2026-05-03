import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilderService } from '../../../../../shared/components/dynamic-form/FormBuilderService';
import { HERO_CREATE_CONFIG } from '../../../../../shared/components/dynamic-form/form-blueprints/hero-create.config';
import { HeroChart } from '../../../../../shared/components/HeroChart/HeroChart';
import { Hero, Powerstats } from '../../../../../core/models/frontend/IHeroFront';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-create',
  imports: [HeroChart,ReactiveFormsModule],
  templateUrl: './HeroCreate.html',
  styleUrl: './HeroCreate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCreate {
    private cdr = inject(ChangeDetectorRef);
      private lastUpdate = 0;
  public readonly mode = input<string>();
private builder = inject(FormBuilderService);

  // 1. Construimos la estructura siguiendo tu patrón del Login
  formStructure = this.builder.buildForm(HERO_CREATE_CONFIG);
  get heroForm() { return this.formStructure.instance; }

  // 2. Escuchamos los cambios para el Radar Chart
  private formValues = toSignal(this.heroForm.valueChanges, { 
    initialValue: this.heroForm.value 
  });

  // 3. Mapeamos al objeto Hero que pide el Chart
  public liveHeroPreview = computed<Hero>(() => {
    const val = this.formValues();
    return {
      id: 'PREVIEW',
      name: val.name || 'NEW_UNIT',
      alignment: val.alignment,
      powerstats: {
        intelligence: Number(val.intelligence || 0),
        strength: Number(val.strength || 0),
        speed: Number(val.speed || 0),
        durability: Number(val.durability || 0),
        power: Number(val.power || 0),
        combat: Number(val.combat || 0),
      }
    } as Hero;
  });

  public isGoodAlignment = computed(() => this.formValues().alignment === 'good');

  handleRadarChange(newStats: Powerstats) {
      const now = Date.now();
      if (now - this.lastUpdate > 16) {
  
        // 1. Actualizamos el formulario
        this.heroForm.patchValue(newStats, { emitEvent: false });
        
        
        // 3. CRÍTICO PARA ZONELESS: Avisar a Angular que verifique este componente y sus hijos
        this.cdr.detectChanges(); 
        
        this.lastUpdate = now;
      }
    }

  onSubmit() {
    if (this.heroForm.invalid) return;
    console.log('ENLISTING UNIT...', this.heroForm.getRawValue());
  }
}
