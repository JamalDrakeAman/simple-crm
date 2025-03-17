import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-day-grid',
  standalone: true,
  imports: [],
  templateUrl: './day-grid.component.html',
  styleUrl: './day-grid.component.scss'
})
export class DayGridComponent {

  @Input() index = 0;

}
