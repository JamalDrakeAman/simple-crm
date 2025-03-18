import { Component, inject, Input } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-grid',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './day-grid.component.html',
  styleUrl: './day-grid.component.scss'
})
export class DayGridComponent {

  theme = inject(ThemeService);

  @Input() index = 0;

  @Input() dayName = ''

  @Input() dayNumber = 0;

  @Input() isToday = false;

}
