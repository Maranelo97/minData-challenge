import { Hero } from "../../../../core/models/frontend/IHeroFront";

export type DrawerMode = 'DETAILS' | 'CREATE' | 'EDIT' | 'SETTINGS';

// Drawer.types.ts
export type DrawerOptions = 
  | { mode: 'DETAILS'; title: string; subtitle?: string; data: Hero } 
  | { mode: 'EDIT'; title: string; subtitle?: string; data: Hero }    
  | { mode: 'CREATE'; title: string; subtitle?: string; data?: null } 
  | { mode: 'SETTINGS'; title: string; subtitle?: string; data?: any };