import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ThemeService } from './shared/services/theme.service';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


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

  theme = inject(ThemeService);

  activeRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Überwache Änderungen der Route
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) // Nur NavigationEnd-Ereignisse berücksichtigen
      )
      .subscribe(() => {
        // Hole die aktuelle Route
        this.activeRoute = this.router.url;
        console.log('current rout', this.activeRoute);
      });
  }

  ngOnInit(): void {
    console.log('current rout', this.activeRoute);
    
  }

}
