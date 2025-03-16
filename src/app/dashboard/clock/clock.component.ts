import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {

  clock = '00 : 00 : 00';

  hour = '';

  minute = '';

  second = '';


  constructor() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timeString = `${hours} : ${minutes} : ${seconds}`

    this.clock = timeString;

    this.hour = `${hours}`;
    this.minute = `${minutes}`;
    this.second = `${seconds}`;
  }

}
