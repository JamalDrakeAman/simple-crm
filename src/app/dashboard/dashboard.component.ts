import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FirestoreServiceService } from '../shared/services/firestore-service.service';
import { doc, onSnapshot } from "firebase/firestore";
import { User } from '@angular/fire/auth';
import { Customer } from '../../models/customer.class';
import { CommonModule } from '@angular/common';
import { ClockComponent } from "./clock/clock.component";
import { UserOverwiewCardComponent } from "./user-overwiew-card/user-overwiew-card.component";
import { WeatherComponent } from "./weather/weather.component";
import { DateBoxComponent } from "./date-box/date-box.component";
import { ThemeService } from '../shared/services/theme.service';
import { TodosOverviewComponent } from './todos-overview/todos-overview.component';
import { RouterLink } from '@angular/router';
import { NotesOverviewComponent } from "./notes-overview/notes-overview.component";
import { RevenueChartComponent } from "./revenue-chart/revenue-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ClockComponent,
    UserOverwiewCardComponent,
    WeatherComponent,
    DateBoxComponent,
    TodosOverviewComponent,
    RouterLink,
    NotesOverviewComponent,
    RevenueChartComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userData = inject(FirestoreServiceService);

  private unsubUsers!: () => void;
  private unsubCust!: () => void;

  users: User[] = [];
  customer: Customer[] = [];

  // isDarkMode = false;

  theme = inject(ThemeService);


  constructor() {
    // console.log(this.userData);
    // const savedMode = localStorage.getItem('darkMode');
    // this.isDarkMode = savedMode === 'true';
    // console.log('darkMode',this.isDarkMode);
  }


  ngOnInit(): void {

    this.unsubUsers = onSnapshot(this.userData.usersCollection, (snapshot) => {
      this.users = snapshot.docs.map((doc) => {
        const data = doc.data() as User;
        // data.id = doc.id; // Füge die Dokument-ID hinzu
        return data;
      });
      console.log('Aktuelle Benutzer:', this.users);
    });


    this.unsubCust = onSnapshot(this.userData.customersCollection, (snapshot) => {
      this.customer = snapshot.docs.map((doc) => {
        const data = doc.data() as Customer;
        // data.id = doc.id; // Füge die Dokument-ID hinzu
        return data;
      });
      console.log('Aktuelle Kunden:', this.customer);
    });

  }


  ngOnDestroy(): void {
    // Beende das Abonnement, wenn die Komponente zerstört wird
    if (this.unsubUsers) {
      this.unsubUsers();
    }

    if (this.unsubCust) {
      this.unsubCust();
    }
  }



}
