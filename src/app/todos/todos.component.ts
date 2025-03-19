import { Component, inject } from '@angular/core';
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
export class TodosComponent {

  theme = inject(ThemeService);

  calendar = inject(CalendarService);

}
