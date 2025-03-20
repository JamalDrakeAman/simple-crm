import { Component, inject, Input, Output, EventEmitter} from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-grid',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './date-grid.component.html',
  styleUrl: './date-grid.component.scss'
})
export class DateGridComponent {

  theme = inject(ThemeService);

  @Input() index = 0;

  @Input() dayName = ''

  @Input() dayNumber = 0;

  @Input() isToday = false;

  @Input() isSelected = false; // Neu: Gibt an, ob der Tag ausgewählt ist


  @Output() daySelected = new EventEmitter<number>();

  selectDay(): void {
    this.daySelected.emit(this.dayNumber); // Emittiere den ausgewählten Tag
  }


}
