// features/heroes/blueprints/hero-create.config.ts
import { Validators } from '@angular/forms';
import { DynamicFormConfig } from '../../types/FormConfig.types';

export const HERO_CREATE_CONFIG: DynamicFormConfig = {
  id: 'hero-creation-matrix',
  title: 'INITIALIZE_NEW_UNIT',
  fields: [
    {
      name: 'name',
      label: 'Unit_Codename',
      type: 'text',
      placeholder: 'E.G. NEON_KNIGHT',
      validators: [Validators.required, Validators.minLength(3)],
    },
    {
      name: 'fullName',
      label: 'Civilian_Identity',
      type: 'text',
      placeholder: 'REAL NAME (IF KNOWN)',
    },
    {
      name: 'alignment',
      label: 'Moral_Alignment',
      type: 'select', // Tu form dinámico debería soportar selects
      initialValue: 'good',
      options: [
        { label: 'VANGUARD (GOOD)', value: 'good' },
        { label: 'ROGUE (BAD)', value: 'bad' },
        { label: 'NEUTRAL (NEUTRAL)', value: 'neutral' },
      ],
    },
    // Powerstats - Las manejamos como campos individuales
    {
      name: 'intelligence',
      label: 'INT',
      type: 'number',
      initialValue: 50,
      validators: [Validators.min(0), Validators.max(100)],
    },
    {
      name: 'strength',
      label: 'STR',
      type: 'number',
      initialValue: 50,
      validators: [Validators.min(0), Validators.max(100)],
    },
    {
      name: 'speed',
      label: 'SPD',
      type: 'number',
      initialValue: 50,
      validators: [Validators.min(0), Validators.max(100)],
    },
    {
      name: 'durability',
      label: 'DUR',
      type: 'number',
      initialValue: 50,
      validators: [Validators.min(0), Validators.max(100)],
    },
    {
      name: 'power',
      label: 'PWR',
      type: 'number',
      initialValue: 50,
      validators: [Validators.min(0), Validators.max(100)],
    },
    {
      name: 'combat',
      label: 'CBT',
      type: 'number',
      initialValue: 50,
      validators: [Validators.min(0), Validators.max(100)],
    },
  ],
  actions: [{ label: 'ENLIST UNIT', type: 'submit', style: 'primary' }],
};
