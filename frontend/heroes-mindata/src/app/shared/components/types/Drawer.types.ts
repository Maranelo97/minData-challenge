import { Hero } from '../../../core/models/frontend/IHeroFront';

export type DrawerMode = 'DETAILS' | 'CREATE' | 'EDIT' | 'SETTINGS';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export type DrawerOptions =
  | { mode: 'DETAILS'; title: string; subtitle?: string; data: Hero; width?: DrawerSize }
  | { mode: 'EDIT'; title: string; subtitle?: string; data: Hero; width?: DrawerSize }
  | { mode: 'CREATE'; title: string; subtitle?: string; data?: null; width?: DrawerSize }
  | { mode: 'SETTINGS'; title: string; subtitle?: string; data?: any; width?: DrawerSize };
