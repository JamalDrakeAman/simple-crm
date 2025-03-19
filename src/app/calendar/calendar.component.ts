import { Component, inject } from '@angular/core';
import { DayGridComponent } from "./day-grid/day-grid.component";
import { CommonModule } from '@angular/common';
import { CalendarService } from '../shared/services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    DayGridComponent,
    CommonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  calendar = inject(CalendarService);

  constructor() { }

}
