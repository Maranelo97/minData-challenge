import { Injectable, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, registerables, Tooltip } from 'chart.js';
import { Powerstats } from '../../../core/models/frontend/IHeroFront';

Chart.register(...registerables);

@Injectable({providedIn: 'root'})
export class HeroChartService {
private chart: Chart | null = null;

  public renderRadar(canvas: ElementRef<HTMLCanvasElement>, stats: Powerstats, isGood: boolean): void {
    const ctx = canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Colores basados en el alineamiento (Cyan para Vanguard, Rose para Rogue)
    const primaryColor = isGood ? '#00f2ff' : '#f43f5e';
    const accentColor = isGood ? 'rgba(0, 242, 255, 0.2)' : 'rgba(244, 63, 94, 0.2)';

    // Gradiente para el área del radar
    const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 150);
    gradient.addColorStop(0, accentColor);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data: {
        labels: ['INTEL', 'STR', 'SPD', 'DUR', 'PWR', 'COM'],
        datasets: [{
          label: 'Power Level', // Nombre que aparecerá en el tooltip
          data: [stats.intelligence, stats.strength, stats.speed, stats.durability, stats.power, stats.combat],
          backgroundColor: gradient,
          borderColor: primaryColor,
          borderWidth: 3,
          pointBackgroundColor: primaryColor,
          pointBorderColor: '#fff',
          pointHoverRadius: 6, // Un poco más grande al hacer hover
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: primaryColor,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          r: {
            min: 0, // Asegura que el radar siempre tenga la misma escala
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: {
              color: '#849495',
              font: { family: 'Space Grotesk', size: 10, weight: 'bold' }
            },
            ticks: { display: false, count: 5 }
          }
        },
        plugins: {
          legend: { display: false },
          // CONFIGURACIÓN DEL TOOLTIP
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(13, 17, 23, 0.9)', // Fondo ultra oscuro
            titleFont: { family: 'Space Grotesk', size: 12, weight: 'bold' },
            bodyFont: { family: 'Space Grotesk', size: 14 },
            padding: 12,
            cornerRadius: 4,
            borderColor: primaryColor, // Borde del color del bando
            borderWidth: 1,
            displayColors: false, // Quitamos el cuadradito de color
            callbacks: {
              // Personalizamos el texto para que parezca una lectura de sistema
              label: (context) => ` > STATUS: ${context.formattedValue}%`
            }
          }
        }
      }
    };

    if (this.chart) this.chart.destroy();
    this.chart = new Chart(ctx, config);
  }
}
