import { Injectable, ElementRef, signal } from '@angular/core';
import { Chart, ChartConfiguration, registerables, RadialLinearScale } from 'chart.js';
import { Powerstats } from '../../../core/models/frontend/IHeroFront';

Chart.register(...registerables);

@Injectable({ providedIn: 'root' })
export class HeroChartService {
  private chart: Chart | null = null;
  public isDragging = false;
  private isUpdating = false;
  public activeStats = signal<Powerstats | null>(null);

  public renderRadar(
    canvas: ElementRef<HTMLCanvasElement>,
    stats: Powerstats,
    isGood: boolean,
    editable: boolean,
  ): void {
    const ctx = canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config = this.createChartConfig(ctx, stats, isGood, editable);

    if (this.chart) this.chart.destroy();
    this.chart = new Chart(ctx, config);
  }

  private createChartConfig(
    ctx: CanvasRenderingContext2D,
    stats: Powerstats,
    isGood: boolean,
    editable: boolean,
  ): ChartConfiguration<'radar'> {
    const colors = this.getThemeColors(isGood);
    const gradient = this.createGradient(ctx, colors.accent);

    return {
      type: 'radar',
      data: {
        labels: ['INTEL', 'STR', 'SPD', 'DUR', 'PWR', 'COM'],
        datasets: [
          {
            ...this.getDatasetStyles(colors.primary, gradient, editable),
            data: [
              stats.intelligence,
              stats.strength,
              stats.speed,
              stats.durability,
              stats.power,
              stats.combat,
            ],
          },
        ],
      },
      options: {
        ...this.getSharedOptions(editable, colors.primary),
        plugins: {
          legend: { display: false },
          tooltip: this.getTooltipConfig(editable, colors.primary),
        },
      },
      plugins: [this.createDragPlugin(editable)],
    };
  }

  private getThemeColors(isGood: boolean) {
    return {
      primary: isGood ? '#00f2ff' : '#f43f5e',
      accent: isGood ? 'rgba(0, 242, 255, 0.2)' : 'rgba(244, 63, 94, 0.2)',
    };
  }

  private createGradient(ctx: CanvasRenderingContext2D, accentColor: string) {
    const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 150);
    gradient.addColorStop(0, accentColor);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    return gradient;
  }

  private getDatasetStyles(primary: string, gradient: CanvasGradient, editable: boolean) {
    return {
      label: 'Power Level',
      backgroundColor: gradient,
      borderColor: primary,
      borderWidth: 3,
      pointBackgroundColor: primary,
      pointBorderColor: '#fff',
      pointRadius: editable ? 6 : 4,
      pointHitRadius: editable ? 25 : 15,
      fill: true,
    };
  }

  private getSharedOptions(
    editable: boolean,
    primary: string,
  ): ChartConfiguration<'radar'>['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: editable ? false : { duration: 1000, easing: 'easeOutQuart' },
      events: editable
        ? ['mousedown', 'mousemove', 'mouseup', 'mouseout']
        : ['mousemove', 'mouseout', 'touchstart', 'touchmove'],
      interaction: {
        mode: editable ? 'nearest' : 'index',
        intersect: editable,
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          pointLabels: {
            color: '#849495',
            font: { family: 'Space Grotesk', size: 10, weight: 'bold' },
          },
          ticks: { display: false },
        },
      },
    };
  }

  private getTooltipConfig(editable: boolean, primary: string) {
    return {
      enabled: !editable,
      backgroundColor: 'rgba(13, 17, 23, 0.9)',
      borderColor: primary,
      borderWidth: 1,
      titleFont: { family: 'Space Grotesk' },
      bodyFont: { family: 'Space Grotesk' },
    };
  }

  private createDragPlugin(editable: boolean): any {
    return {
      id: 'vndDragPlugin',
      afterEvent: (chart: any, args: any) => {
        if (!editable || this.isUpdating) return;
        this.handleDragEvent(chart, args.event);
      },
    };
  }

  private handleDragEvent(chart: any, event: any) {
    const nativeEv = event.native as MouseEvent;

    if (event.type === 'mousedown') {
      const points = chart.getElementsAtEventForMode(
        nativeEv,
        'nearest',
        { intersect: false },
        false,
      );
      if (points.length) {
        this.isDragging = true;
        chart.activePointIndex = points[0].index;
      }
    }

    if (event.type === 'mousemove' && this.isDragging) {
      this.updatePointValue(chart, event);
    }

    if (event.type === 'mouseup' || event.type === 'mouseout') {
      this.isDragging = false;
    }
  }

  private updatePointValue(chart: any, event: any) {
    const index = chart.activePointIndex;
    const scale = chart.scales['r'] as RadialLinearScale;

    const dx = event.x - scale.xCenter;
    const dy = event.y - scale.yCenter;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const newValue = Math.max(0, Math.min(100, Math.round(distance / (scale.drawingArea / 100))));

    this.isUpdating = true;
    chart.data.datasets[0].data[index] = newValue;
    chart.update('none');
    this.isUpdating = false;

    // Notificar cambio
    const d = chart.data.datasets[0].data as number[];
    this.activeStats.set({
      intelligence: d[0],
      strength: d[1],
      speed: d[2],
      durability: d[3],
      power: d[4],
      combat: d[5],
    });
  }

  public updateOrRender(
    canvas: ElementRef<HTMLCanvasElement>,
    stats: Powerstats,
    isGood: boolean,
    editable: boolean, // <-- Añadido aquí también
  ) {
    if (this.isDragging) return;

    if (this.chart) {
      this.isUpdating = true;
      this.chart.data.datasets[0].data = [
        stats.intelligence,
        stats.strength,
        stats.speed,
        stats.durability,
        stats.power,
        stats.combat,
      ];
      // Si cambia el modo de edición, destruimos y recreamos para actualizar plugins/tooltips
      // Esto solo pasa cuando entras/sales de edición, no afecta el drag
      this.renderRadar(canvas, stats, isGood, editable);
      this.isUpdating = false;
    } else {
      this.renderRadar(canvas, stats, isGood, editable);
    }
  }

  public destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
