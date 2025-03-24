import { Component, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { Chart, LinearScale, ChartOptions, ChartConfiguration, BarController, BarElement, CategoryScale } from 'chart.js';
import { ThemeService } from '../../shared/services/theme.service';
import { CommonModule } from '@angular/common';

// Registriere die benötigten Komponenten
Chart.register(
  BarController,
  BarElement,
  CategoryScale,  // Skala für die Kategorien (x-Achse)
  LinearScale     // Skala für numerische Werte (y-Achse)
);

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.scss',
})
export class RevenueChartComponent implements AfterViewInit {

  @ViewChild('revenueChart') revenueChart!: ElementRef<HTMLCanvasElement>;

  theme = inject(ThemeService);

  constructor() { }


  ngAfterViewInit(): void {
    this.createChart();
  }

  
  createChart(): void {
    const ctx = this.revenueChart.nativeElement.getContext('2d');
    if (!ctx) return;

    // Chart-Daten und Konfiguration
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'], // Monate
        datasets: [
          {
            label: 'Umsatz 2022', // Datensatz für das letzte Jahr
            data: [10000, 12000, 11000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000], // Daten für 2022
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Farbe für 2022
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Umsatz 2023', // Datensatz für dieses Jahr
            data: [12000, 15000, 18000, 14000, 16000, 19000, 20000, 21000, 22000, 23000, 24000, 25000], // Daten für 2023
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Farbe für 2023
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: '#ffffff', // Schriftfarbe der x-Achse
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Rasterfarbe der x-Achse
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#ffffff', // Schriftfarbe der y-Achse
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Rasterfarbe der y-Achse
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#ffffff', // Schriftfarbe der Legende
            },
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                // Zeigt den Monat im Tooltip-Titel an
                return `Monat: ${context[0].label}`;
              },
              label: (context) => {
                // Zeigt das Jahr und den Umsatz im Tooltip an
                const datasetLabel = context.dataset.label || ''; // Holt das Jahr aus dem dataset.label
                const value = context.raw as number; // Holt den Umsatzwert
                return `${datasetLabel}: ${value} €`;
              },
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Hintergrundfarbe des Tooltips
            titleColor: '#ffffff', // Schriftfarbe des Titels
            bodyColor: '#ffffff', // Schriftfarbe des Inhalts
          },
        },
      } as ChartOptions,
    };

    new Chart(ctx, chartConfig);
  }
}