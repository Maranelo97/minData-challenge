import { AnimationStrategy, AnimationOptions } from '../types/animations.types';
import { gsap } from 'gsap';

export class StaggerCardsStrategy implements AnimationStrategy {
  execute(elements: HTMLElement | HTMLElement[], options?: AnimationOptions): void {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: options?.duration || 0.8,
        stagger: options?.stagger || 0.1,
        ease: options?.ease || 'expo.out',
        onComplete: options?.onComplete,
      },
    );
  }
}
