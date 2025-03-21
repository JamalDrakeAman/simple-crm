import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { Todo } from '../../../models/todo.class';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {

  todoData = inject(FirestoreServiceService);

  loading = false;
  todo = new Todo();


  task: any = {
    title: '',
    description: '',
    priority: 'medium',
    timestamp: null
  };

  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task.timestamp = data.selectedDay; // Setze das ausgewählte Datum

    this.todo.priority = 'medium';
    this.todo.completed = false;
    this.todo.timestamp = data.selectedDay;
    console.log('Stamp', this.task.timestamp);

  }

  // saveTask(): void {
  //   this.dialogRef.close(this.task);
  // }

  async saveTask() {

    this.loading = true;
    try {
      // Konvertiere das ausgewählte Datum in ein Firebase Timestamp-Objekt
      this.todo.timestamp = Timestamp.fromDate(this.task.timestamp);

      const docRef = await addDoc(this.todoData.todosCollection, this.todo.toJSON());
      console.log('Todo added with ID:', docRef.id);
      this.dialogRef.close(this.todo);
    } catch (error) {
      console.error('Error adding user:', error);
    }

    this.loading = false;

  }


}
