import { Injectable } from '@angular/core';

/**
 * A service for managing calendar-related functionality.
 * This service provides methods to handle months, days, and navigation between months.
 */
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  currentDate: Date = new Date();

  /**
   * An array of objects representing the days in the current month.
   * Each object contains:
   * - `day`: The day of the month (1-31).
   * - `dayName`: The name of the day (e.g., "Monday").
   * - `isToday`: A boolean indicating whether the day is today.
   */
  daysInMonth: { day: number, dayName: string, isToday: boolean }[] = []; // Speichert Tag, Wochentag und ob heute
  monthNames: string[] = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  dayNames: string[] = [
    'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
  ];


  /**
   * Initializes the service and updates the days in the current month.
   */
  constructor() {
    this.updateDaysInMonth();
  }


  /**
   * Returns the name of the current month.
   * @returns The name of the current month (e.g., "Januar").
   */
  getMonthName(): string {
    return this.monthNames[this.currentDate.getMonth()];
  }


  /**
   * Returns the current year.
   * @returns The current year as a number (e.g., 2023).
   */
  getYear(): number {
    return this.currentDate.getFullYear();
  }


  /**
   * Updates the `daysInMonth` array with the days of the current month.
   * Each day includes its number, name, and whether it is today.
   */
  updateDaysInMonth(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date(); // Current date

    // Create an array of days for the current month
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1; // Day of the month (1-31)
      const dayName = this.getDayName(year, month, day); // Name of the day (e.g., "Monday")
      const isToday = this.isToday(year, month, day, today); // Check if the day is today
      return { day, dayName, isToday };
    });
  }


  /**
   * Returns the name of the day for a given date.
   * @param year - The year of the date.
   * @param month - The month of the date (0-11).
   * @param day - The day of the month (1-31).
   * @returns The name of the day (e.g., "Monday").
   */
  getDayName(year: number, month: number, day: number): string {
    const date = new Date(year, month, day);
    return this.dayNames[date.getDay()];
  }


  /**
   * Checks if a given date is today.
   * @param year - The year of the date.
   * @param month - The month of the date (0-11).
   * @param day - The day of the month (1-31).
   * @param today - The current date.
   * @returns True if the date is today, otherwise false.
   */
  isToday(year: number, month: number, day: number, today: Date): boolean {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  }

  
  /**
   * Changes the current month by a given offset.
   * @param offset - The number of months to change (e.g., 1 for next month, -1 for previous month).
   */
  changeMonth(offset: number): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1);
    this.updateDaysInMonth();
  }

}
