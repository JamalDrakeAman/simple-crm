import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../shared/services/theme.service';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {

  theme = inject(ThemeService);


  weatherData: any;
  city = 'Berlin,DE'; // Stadtname

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
      }
    );
  }

}
