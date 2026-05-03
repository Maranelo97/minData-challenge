export type AnimationType = 'FADE_IN_UP' | 'GLITCH_REVEAL' | 'STAGGER_CARDS' | 'PARALLAX_SCROLL';

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  onComplete?: () => void;
}

export interface AnimationStrategy {
  execute(element: HTMLElement | HTMLElement[], options?: AnimationOptions): void;
}
