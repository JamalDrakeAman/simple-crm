import { Component, Inject } from '@angular/core';
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

  loading = false;

  task: any = {
    title: '',
    description: '',
    dueDate: null,
    priority: 'medium',
    category: 'work',
    status: 'todo',
    timestamp: null
  };


  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.task.timestamp = data.selectedDay; // Setze das ausgewählte Datum
  }

  saveTask(): void {
    this.dialogRef.close(this.task);
  }


}
