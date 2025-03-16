
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from './dialog-add-customer/dialog-add-customer.component';
import { Customer } from '../../models/customer.class';
import { MatCardModule } from '@angular/material/card';

import { inject } from '@angular/core';
import { onSnapshot } from "firebase/firestore";
import { FirestoreServiceService } from '../shared/service/firestore-service.service';


import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  isDarkMode = false;


  userData = inject(FirestoreServiceService);
  customers: Customer[] = [];

  private unsubscribe!: () => void;
  constructor(public dialog: MatDialog) {
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
    console.log('darkMode', this.isDarkMode);
  }


  ngOnInit(): void {
    // onSnapshot für die Sammlung "users"
    this.unsubscribe = onSnapshot(this.userData.customersCollection, (snapshot) => {
      this.customers = snapshot.docs.map((doc) => {
        const data = doc.data() as Customer;
        data.id = doc.id; // Füge die Dokument-ID hinzu
        return data;
      });
      console.log('Aktuelle Benutzer:', this.customers);
    });
  }


  ngOnDestroy(): void {
    // Beende das Abonnement, wenn die Komponente zerstört wird
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  openDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }
}
