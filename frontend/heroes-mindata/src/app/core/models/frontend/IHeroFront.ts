export interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export interface Hero {
  id: string;
  externalId: number;
  name: string;
  slug: string;
  gender?: string;
  race?: string;
  fullName?: string;
  publisher?: string;
  alignment?: string;
  imageSm?: string;
  imageMd?: string;
  powerstats?: Powerstats;
}