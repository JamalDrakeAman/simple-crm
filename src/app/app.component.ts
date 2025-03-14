import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink,
    MatSlideToggleModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'simple-crm';

  isDarkMode = false;

  ngOnInit(): void {
    // Überprüfe den gespeicherten Modus im localStorage
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
    // this.applyDarkMode(this.isDarkMode);
  }


  toggleDarkMode(checked: boolean): void {
    this.isDarkMode = checked;
    // this.applyDarkMode(this.isDarkMode);
    // Speichere den Zustand im localStorage
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    console.log(this.isDarkMode);
    
  }

  // private applyDarkMode(isDarkMode: boolean): void {
  //   if (isDarkMode) {
  //     document.body.classList.remove('light-mode');
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     document.body.classList.remove('dark-mode');
  //     document.body.classList.add('light-mode');
  //   }
  //   console.log(this.isDarkMode);
    
  // }

}
