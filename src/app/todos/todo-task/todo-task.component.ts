import { Component, inject, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { CommonModule } from '@angular/common';


import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { doc, setDoc } from "firebase/firestore";

@Component({
  selector: 'app-todo-task',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './todo-task.component.html',
  styleUrl: './todo-task.component.scss'
})
export class TodoTaskComponent {

  todoTaskData = inject(FirestoreServiceService);

  theme = inject(ThemeService);

  @Input() task!: {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    timestamp: Date,
    priority: string


  };

  @ViewChild('descriptionContainer', { static: false }) descriptionContainer!: ElementRef;

  isExpanded = false;
  showExpandButton = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleTaskCompletion(task: any) {
    task.completed = !task.completed;
    this.writeTaskData()

    console.log('task', task);
    console.log('task id', task.id);

  }

  ngAfterViewInit() {
    this.checkDescriptionOverflow();
  }

  checkDescriptionOverflow() {
    const container = this.descriptionContainer.nativeElement;
    this.showExpandButton = container.scrollHeight > container.clientHeight;
  }


  async writeTaskData() {

    // const db = getFirestore();

    const db = this.todoTaskData.db

    await setDoc(doc(db, "todos/" + this.task.id), {
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      timestamp: this.task.timestamp,
      completed: this.task.completed
    });
  }


}


// title: this.task.title,
//   description: this.task.description,
//     priority: this.task.priority,
//       timestamp: this.task.timestamp,
//         completed: this.task.completed