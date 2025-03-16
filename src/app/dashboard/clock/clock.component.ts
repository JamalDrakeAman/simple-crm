import { Component, inject } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {

  clock = '00 : 00 : 00';
  hour = '';
  minute = '';
  second = '';

  theme = inject(ThemeService);

  constructor() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    console.log(this.doubleDigits(1));
    
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timeString = `${hours} : ${minutes} : ${seconds}`
    
    this.clock = timeString;

    this.hour = this.doubleDigits(hours);
    this.minute = this.doubleDigits(minutes);
    this.second = this.doubleDigits(seconds);
  }

  doubleDigits(zahl: number): string {
    return zahl < 10 ? `0${zahl}` : zahl.toString();
  }

}
