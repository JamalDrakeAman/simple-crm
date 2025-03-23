import { Component, inject, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { CommonModule } from '@angular/common';

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

  theme = inject(ThemeService);

  @Input() task!: { id: number, title: string, description: string, completed: boolean };

  @ViewChild('descriptionContainer', { static: false }) descriptionContainer!: ElementRef;

  isExpanded = false;
  showExpandButton = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleTaskCompletion(task: any) {
    task.completed = !task.completed;
  }

  ngAfterViewInit() {
    this.checkDescriptionOverflow();
  }

  checkDescriptionOverflow() {
    const container = this.descriptionContainer.nativeElement;
    this.showExpandButton = container.scrollHeight > container.clientHeight;
  }


}
