import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FirestoreServiceService } from '../shared/service/firestore-service.service';
import { doc, onSnapshot } from "firebase/firestore";
import { User } from '@angular/fire/auth';
import { Customer } from '../../models/customer.class';
import { CommonModule } from '@angular/common';
import { ClockComponent } from "./clock/clock.component";
import { UserOverwiewCardComponent } from "./user-overwiew-card/user-overwiew-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ClockComponent,
    UserOverwiewCardComponent
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

  isDarkMode = false;

  


  constructor() {
    console.log(this.userData);
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
    console.log('darkMode',this.isDarkMode);
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
