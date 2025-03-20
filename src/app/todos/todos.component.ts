import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../shared/services/calendar.service';
import { DateGridComponent } from './date-grid/date-grid.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    DateGridComponent,
    TodoTaskComponent
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

  theme = inject(ThemeService);

  calendar = inject(CalendarService);

  selectedDay: Date | null = null; // Speichert das ausgewählte Datum
  todoTasks: any[] = []; // Alle Todos
  filteredTasks: any[] = []; // Gefilterte Todos für den ausgewählten Tag

  // Beispiel-Todos mit Timestamp
  ngOnInit(): void {
    this.todoTasks = [
      {
        id: 1,
        title: 'Meeting vorbereiten',
        description: 'Präsentation für das Team-Meeting fertigstellen.',
        timestamp: new Date(2025, 2, 1) // 1. März 2025
      },
      {
        id: 2,
        title: 'Einkaufen gehen',
        description: 'Milch, Brot und Eier kaufen.',
        timestamp: new Date(2025, 2, 6) // 6. März 2025
      },
      {
        id: 3,
        title: 'Sport treiben',
        description: 'Joggen im Park um 18 Uhr.',
        timestamp: new Date(2025, 2, 5) // 5. März 2025
      }
    ];
    

    // Standardmäßig den heutigen Tag auswählen
    const today = new Date();
    this.selectDay(today);
  }

  // Tag auswählen und Todos filtern
  selectDay(date: Date): void {
    this.selectedDay = date;
    this.filteredTasks = this.getTodosForDay(date);
  }

  // Todos für den ausgewählten Tag filtern
  getTodosForDay(date: Date): any[] {
    console.log('Ausgewähltes Datum:', date); // Debugging
    const filtered = this.todoTasks.filter(task => {
      const taskDate = new Date(task.timestamp);
      console.log('Task-Datum:', taskDate); // Debugging
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });
    console.log('Gefilterte Tasks:', filtered); // Debugging
    return filtered;
  }

  // Monat wechseln
  changeMonth(offset: number): void {
    this.calendar.changeMonth(offset);
    const year = this.calendar.currentDate.getFullYear();
    const month = this.calendar.currentDate.getMonth();
    const day = this.selectedDay ? this.selectedDay.getDate() : 1; // Behalte den ausgewählten Tag bei
    this.selectDay(new Date(year, month, day));
  }


  isSelectedDay(day: number): boolean {
    if (!this.selectedDay) return false;
    const year = this.calendar.currentDate.getFullYear();
    const month = this.calendar.currentDate.getMonth();
    return (
      this.selectedDay.getFullYear() === year &&
      this.selectedDay.getMonth() === month &&
      this.selectedDay.getDate() === day
    );
  }


  selectDayFromGrid(day: number): void {
    const year = this.calendar.currentDate.getFullYear();
    const month = this.calendar.currentDate.getMonth();
    const selectedDate = new Date(year, month, day);
    console.log('Ausgewähltes Datum aus Grid:', selectedDate); // Debugging
    this.selectDay(selectedDate);
  }
}
