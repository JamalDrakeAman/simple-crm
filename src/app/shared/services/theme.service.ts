import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkMode = false;
  darkMode = signal(false);

  constructor() {
    const savedMode = localStorage.getItem('theme');
    this.darkMode.set(savedMode === 'true')
  }

  toggle() {
    this.darkMode.set(!this.darkMode())
    localStorage.setItem('theme', JSON.stringify(this.darkMode()));
    console.log(this.darkMode());
  }



  // toggleDarkMode(checked: boolean): void {
  //   this.isDarkMode = checked;
  //   localStorage.setItem('darkMode', this.isDarkMode.toString());
  //   console.log(this.isDarkMode);
  // }

}
