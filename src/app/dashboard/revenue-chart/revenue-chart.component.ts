import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, LinearScale, ChartOptions, ChartConfiguration, LineController, LineElement, PointElement, BarController, BarElement, CategoryScale } from 'chart.js';


// Registriere die benötigten Komponenten
Chart.register(
  LineController, // Controller für Liniendiagramme
  LineElement,    // Elemente für Linien
  PointElement,   // Elemente für Punkte
  BarController,
  BarElement,
  CategoryScale,  // Skala für die Kategorien (x-Achse)
  LinearScale     // Skala für numerische Werte (y-Achse)
);


@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.scss',
})
export class RevenueChartComponent implements AfterViewInit {
  @ViewChild('revenueChart') revenueChart!: ElementRef<HTMLCanvasElement>;

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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        datasets: [{
          label: 'Revenue in €',
          data: [12000, 15000, 18000, 14000, 16000, 19000],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      } as ChartOptions, // Typisierung der Optionen
    };




    new Chart(ctx, chartConfig);
  }
}