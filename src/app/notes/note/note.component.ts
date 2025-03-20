import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  theme = inject(ThemeService);

  @Input() title = ''

  @Input() noteDescription = ''

}
