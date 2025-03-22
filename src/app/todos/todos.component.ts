import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../shared/services/calendar.service';
import { DateGridComponent } from './date-grid/date-grid.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';

import { onSnapshot } from "firebase/firestore";
import { FirestoreServiceService } from '../shared/services/firestore-service.service';
import { Todo } from '../../models/todo.class';

import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    DateGridComponent,
    TodoTaskComponent,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

  theme = inject(ThemeService);
  todoData = inject(FirestoreServiceService);
  calendar = inject(CalendarService);


  selectedDay: Date | null = null;
  todoTasks: any[] = [];
  filteredTasks: any[] = [];
  private unsubscribe!: () => void;


  /**
   * Initializes the component and subscribes to Firestore updates.
   * @param dialog - Angular Material Dialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) {
    this.unsubscribe = onSnapshot(this.todoData.todosCollection, (snapshot) => {
      this.todoTasks = snapshot.docs.map((doc) => {
        const data = doc.data() as Todo;
        data.id = doc.id; // Add the document ID to the task
        // Convert Firestore Timestamp to JavaScript Date
        if (data.timestamp instanceof Timestamp) {
          data.timestamp = data.timestamp.toDate();
        }
        return data;
      });

      // After data is loaded, filter tasks for the current day
      const today = new Date();
      this.selectDay(today);
    });

    // Select today's date by default
    const today = new Date();
    this.selectDay(today);
  }


  /**
   * Selects a specific day and filters tasks for that day.
   * @param date - The date to select.
   */
  selectDay(date: Date): void {
    this.selectedDay = date;
    this.filteredTasks = this.getTodosForDay(date);
  }


  /**
   * Filters tasks for a specific day.
   * @param date - The date to filter tasks for.
   * @returns An array of tasks due on the specified date.
   */
  getTodosForDay(date: Date): any[] {
    const filtered = this.todoTasks.filter(task => {
      const taskDate = new Date(task.timestamp);
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });
    return filtered;
  }


  /**
   * Changes the current month by a given offset.
   * @param offset - The number of months to change (e.g., 1 for next month, -1 for previous month).
   */
  changeMonth(offset: number): void {
    this.calendar.changeMonth(offset);
    const year = this.calendar.currentDate.getFullYear();
    const month = this.calendar.currentDate.getMonth();
    const day = this.selectedDay ? this.selectedDay.getDate() : 1;
    this.selectDay(new Date(year, month, day));
  }


  /**
   * Checks if a specific day is currently selected.
   * @param day - The day to check.
   * @returns True if the day is selected, otherwise false.
   */
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


  /**
   * Selects a day from the date grid.
   * @param day - The day to select.
   */
  selectDayFromGrid(day: number): void {
    const year = this.calendar.currentDate.getFullYear();
    const month = this.calendar.currentDate.getMonth();
    const selectedDate = new Date(year, month, day);
    this.selectDay(selectedDate);
  }


  /**
  * Opens a dialog to add a new task.
  */
  openDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: { selectedDay: this.selectedDay }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoTasks.push(result);
        if (this.selectedDay) {
          this.filteredTasks = this.getTodosForDay(this.selectedDay);
        }
      }
    });
  }


  /**
   * Lifecycle hook called before the component is destroyed.
   * Unsubscribes from Firestore updates to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


}
