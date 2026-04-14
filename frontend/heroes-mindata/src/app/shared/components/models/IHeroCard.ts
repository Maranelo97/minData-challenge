
export interface IHeroCardView {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly alignmentLabel: 'VANGUARD ACTIVE' | 'ROGUE SIGNAL';
  readonly isGood: boolean;
  readonly mainStat: {
    readonly label: string | StatLabel;
    readonly value: number;
    readonly percentage: string;
  };
  readonly secondaryStats: {
    readonly str: number;
    readonly spd: number;
    readonly pwr: number;
  };
}


export type StatLabel = 'INTELLIGENCE' | 'STRENGTH' | 'SPEED' | 'DURABILITY' | 'POWER' | 'COMBAT' | 'NEURAL';

export interface MaxStatResult {
  label: StatLabel;
  value: number;
}