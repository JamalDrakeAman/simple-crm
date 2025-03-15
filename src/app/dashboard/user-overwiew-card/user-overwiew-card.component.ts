import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

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

  isDarkMode = false;

  @Input() title = '';

  @Input() count = 0;

  constructor() {
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';

    console.log('darkMode', this.isDarkMode);
  }

}
