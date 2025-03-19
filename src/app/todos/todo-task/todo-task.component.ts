import { Component, inject } from '@angular/core';
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

}
