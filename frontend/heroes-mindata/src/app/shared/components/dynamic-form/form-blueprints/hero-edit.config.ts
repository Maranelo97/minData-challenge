
import { Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../types/FormConfig.types';

export const HERO_EDIT_CONFIG: DynamicFormConfig = {
  id: 'hero-modification-protocol',
  title: 'MOD_UNIT_DATA',
  fields: [
    {
      name: 'name',
      label: 'Unit_Codename',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'alignment',
      label: 'Moral_Alignment',
      type: 'select',
      options: [
        { label: 'VANGUARD (GOOD)', value: 'good' },
        { label: 'ROGUE (BAD)', value: 'bad' },
        { label: 'NEUTRAL (NEUTRAL)', value: 'neutral' }
      ]
    },
    // Powerstats - Estos serán los "draggables" en el futuro
    { name: 'intelligence', label: 'INT', type: 'number', validators: [Validators.min(0), Validators.max(100)] },
    { name: 'strength', label: 'STR', type: 'number', validators: [Validators.min(0), Validators.max(100)] },
    { name: 'speed', label: 'SPD', type: 'number', validators: [Validators.min(0), Validators.max(100)] },
    { name: 'durability', label: 'DUR', type: 'number', validators: [Validators.min(0), Validators.max(100)] },
    { name: 'power', label: 'PWR', type: 'number', validators: [Validators.min(0), Validators.max(100)] },
    { name: 'combat', label: 'CBT', type: 'number', validators: [Validators.min(0), Validators.max(100)] },
  ],
  actions: [
    { label: 'UPDATE NEURAL DATA', type: 'submit', style: 'primary' }
  ],
};