import { Component } from '@angular/core';

@Component({
  selector: 'app-date-box',
  standalone: true,
  imports: [],
  templateUrl: './date-box.component.html',
  styleUrl: './date-box.component.scss'
})
export class DateBoxComponent {

  dateParts: { weekday: string, month: string, day: string, year: string };

  constructor() {
    const today = new Date();
    this.dateParts = this.formatDate(today);

    console.log(this.dateParts);
  }

  formatDate(date: Date): { weekday: string, month: string, day: string, year: string } {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    // Datum formatieren
    const formattedDate = date.toLocaleDateString('de-DE', options);

    // Teile des formatierten Datums extrahieren
    const parts = formattedDate.split(' ');

    // Wochentag ist der erste Teil
    const weekday = parts[0].replace(',', ''); // Entferne das Komma

    // Tag ist der zweite Teil (z. B. "5.")
    const day = parts[1].replace('.', ''); // Entferne den Punkt

    // Monat ist der dritte Teil (z. B. "Oktober")
    const month = parts[2];

    // Jahr ist der vierte Teil (z. B. "2023")
    const year = parts[3];

    return {
      weekday: weekday, // Wochentag (z. B. "Donnerstag")
      month: month,     // Monat (z. B. "Oktober")
      day: day,         // Tag (z. B. "5")
      year: year        // Jahr (z. B. "2023")
    };
  }


}
