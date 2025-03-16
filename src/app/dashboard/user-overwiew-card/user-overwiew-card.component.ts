import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-user-overwiew-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './user-overwiew-card.component.html',
  styleUrl: './user-overwiew-card.component.scss'
})
export class UserOverwiewCardComponent {

  // isDarkMode = false;

  theme = inject(ThemeService);

  @Input() title = '';

  @Input() count = 0;

  constructor() {

  }

}
