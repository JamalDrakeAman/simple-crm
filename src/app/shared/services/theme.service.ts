import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkMode = false;

  constructor() { 
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
  }

  toggleDarkMode(checked: boolean): void {
    this.isDarkMode = checked;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    console.log(this.isDarkMode);
  }

  darkMode = signal(false);

  toggle(){
    this.darkMode.set(!this.darkMode())
    localStorage.setItem('theme', JSON.stringify(this.darkMode()));
    console.log(this.darkMode());
  }



}
