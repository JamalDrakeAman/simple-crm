
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
import { FirestoreServiceService } from '../shared/services/firestore-service.service';


import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../shared/services/theme.service';

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

  customerData = inject(FirestoreServiceService);
  theme = inject(ThemeService);
  customers: Customer[] = [];

  private unsubscribe!: () => void;

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    this.unsubscribe = onSnapshot(this.customerData.customersCollection, (snapshot) => {
      this.customers = snapshot.docs.map((doc) => {
        const data = doc.data() as Customer;
        data.id = doc.id;
        return data;
      });
    });
  }


  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  openDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }


}
