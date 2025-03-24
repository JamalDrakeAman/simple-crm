import { Component, inject } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-date-box',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.scss'
})
export class DateBoxComponent {

  dateParts: { weekday: string, month: string, day: string, year: string };

  theme = inject(ThemeService);

  constructor() {
    const today = new Date();
    this.dateParts = this.formatDate(today);
  }


  formatDate(date: Date): { weekday: string, month: string, day: string, year: string } {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('de-DE', options);
    const parts = formattedDate.split(' ');
    const weekday = parts[0].replace(',', ''); 
    const day = parts[1].replace('.', ''); 
    const month = parts[2];
    const year = parts[3];

    return {
      weekday: weekday, // Wochentag (z. B. "Donnerstag")
      month: month,     // Monat (z. B. "Oktober")
      day: day,         // Tag (z. B. "5")
      year: year        // Jahr (z. B. "2023")
    };
  }


}
