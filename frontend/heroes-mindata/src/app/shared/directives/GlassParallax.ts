import { Directive, ElementRef, HostListener, OnInit, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appGlassParallax]',
  standalone: true
})
export class GlassParallaxDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private glareElement!: HTMLElement;

  ngOnInit() {
    // Creamos una capa de brillo interna para no destruir el background original
    this.glareElement = this.renderer.createElement('div');
    this.renderer.addClass(this.glareElement, 'glare-layer');
    this.renderer.appendChild(this.el.nativeElement, this.glareElement);
    
    // Estilos iniciales para el contenedor
    this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const el = this.el.nativeElement;
    const { left, top, width, height } = el.getBoundingClientRect();
    
    const mouseX = (e.clientX - (left + width / 2)) / (width / 2);
    const mouseY = (e.clientY - (top + height / 2)) / (height / 2);

    // Reducimos a 6 grados máximo para que sea sutil y elegante
    const rotateX = mouseY * -6; 
    const rotateY = mouseX * 6;

    this.renderer.setStyle(el, 'transform', 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );

    // Movemos el brillo en la capa separada
    const glareX = (mouseX + 1) * 50;
    const glareY = (mouseY + 1) * 50;
    
    this.renderer.setStyle(this.glareElement, 'background', 
      `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 70%)`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const el = this.el.nativeElement;
    // Transición lenta para el retorno al estado inicial
    this.renderer.setStyle(el, 'transition', 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)');
    this.renderer.setStyle(el, 'transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    this.renderer.setStyle(this.glareElement, 'opacity', '0');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    // Al entrar, usamos una transición muy corta para evitar el "salto"
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
    this.renderer.setStyle(this.glareElement, 'opacity', '1');
  }
}