import { Injectable } from '@angular/core';
import { Powerstats } from '../../../core/models/frontend/IHeroFront';
import { MaxStatResult, StatLabel } from '../models/IHeroCard';

@Injectable({ providedIn: 'root' })
export class HeroCardService {
  private readonly VALID_STATS = [
    'intelligence',
    'strength',
    'speed',
    'durability',
    'power',
    'combat',
  ];

  calculateMaxStat(stats: Powerstats | undefined): MaxStatResult {
    const defaultStat: MaxStatResult = { label: 'NEURAL', value: 0 };

    if (!stats) return defaultStat;

    const entries = Object.entries(stats).filter(
      ([key, value]) => this.VALID_STATS.includes(key.toLowerCase()) && typeof value === 'number',
    );

    if (entries.length === 0) return defaultStat;

    const maxEntry = entries.reduce((prev, current) =>
      (current[1] as number) > (prev[1] as number) ? current : prev,
    );

    return {
      label: maxEntry[0].toUpperCase() as StatLabel,
      value: maxEntry[1] as number,
    };
  }
  getAlignment(alignment: string | undefined): boolean {
    return alignment?.toLowerCase() === 'good';
  }
}
