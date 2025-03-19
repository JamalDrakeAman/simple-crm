import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  currentDate: Date = new Date();
  daysInMonth: { day: number, dayName: string, isToday: boolean }[] = []; // Speichert Tag, Wochentag und ob heute
  monthNames: string[] = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  dayNames: string[] = [
    'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
  ];

  constructor() {
    this.updateDaysInMonth();
    console.log('Days in Month', this.daysInMonth);

  }

  getMonthName(): string {
    return this.monthNames[this.currentDate.getMonth()];
  }

  getYear(): number {
    return this.currentDate.getFullYear();
  }

  updateDaysInMonth(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date(); // Aktuelles Datum

    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dayName = this.getDayName(year, month, day);
      const isToday = this.isToday(year, month, day, today); // Prüfe, ob heute
      return { day, dayName, isToday };
    });
  }

  getDayName(year: number, month: number, day: number): string {
    const date = new Date(year, month, day);
    return this.dayNames[date.getDay()];
  }

  isToday(year: number, month: number, day: number, today: Date): boolean {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  }

  changeMonth(offset: number): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1);
    this.updateDaysInMonth();
  }
  
}
