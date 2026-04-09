import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appGlassParallax]',
  standalone: true
})
export class GlassParallaxDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const el = this.el.nativeElement;
    const { left, top, width, height } = el.getBoundingClientRect();
    
    // Calcular el centro de la card
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calcular la distancia del mouse al centro (-1 a 1)
    const mouseX = (e.clientX - centerX) / (width / 2);
    const mouseY = (e.clientY - centerY) / (height / 2);

    // Grados de rotación (máximo 15 grados para que sea sutil)
    const rotateX = mouseY * -15; 
    const rotateY = mouseX * 15;

    // Aplicar la transformación 3D
    this.renderer.setStyle(el, 'transform', 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );

    // Efecto de brillo (Glare) - Movemos un gradiente radial
    const glareX = (mouseX + 1) * 50; // Convertir a porcentaje 0-100
    const glareY = (mouseY + 1) * 50;
    
    this.renderer.setStyle(el, 'background', 
      `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 80%), #1c2026`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const el = this.el.nativeElement;
    // Resetear posición suavemente
    this.renderer.setStyle(el, 'transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    this.renderer.setStyle(el, 'transition', 'all 0.5s ease');
    this.renderer.setStyle(el, 'background', '#1c2026');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    // Quitar transición durante el movimiento para que sea instantáneo y fluido
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
  }
}