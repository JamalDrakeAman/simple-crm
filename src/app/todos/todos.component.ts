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
    MatDialogModule,
    AddTaskDialogComponent
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

  theme = inject(ThemeService);
  todoData = inject(FirestoreServiceService);
  calendar = inject(CalendarService);

  selectedDay: Date | null = null; // Speichert das ausgewählte Datum
  todoTasks: any[] = []; // Alle Todos
  filteredTasks: any[] = []; // Gefilterte Todos für den ausgewählten Tag

  private unsubscribe!: () => void;

  constructor(public dialog: MatDialog) { }

  // Beispiel-Todos mit Timestamp
  ngOnInit(): void {

    this.unsubscribe = onSnapshot(this.todoData.todosCollection, (snapshot) => {
      this.todoTasks = snapshot.docs.map((doc) => {
        const data = doc.data() as Todo;
        data.id = doc.id; // Füge die Dokument-ID hinzu
        // Konvertiere das Timestamp-Objekt in ein Date-Objekt

        // Konvertiere das Timestamp-Objekt in ein Date-Objekt
        if (data.timestamp instanceof Timestamp) {
          data.timestamp = data.timestamp.toDate();
        }
  
        return data;
      });
      console.log('Aktuelle Benutzer:', this.todoTasks);
    });


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


  openDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: { selectedDay: this.selectedDay }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoTasks.push(result);
        this.filteredTasks = this.getTodosForDay(this.selectedDay!);
      }
    });
  }


  ngOnDestroy(): void {
    // Beende das Abonnement, wenn die Komponente zerstört wird
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


}
