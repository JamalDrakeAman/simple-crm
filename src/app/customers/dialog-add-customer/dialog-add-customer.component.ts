import { Component } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogRef
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Customer } from '../../../models/customer.class';
import { FormsModule } from '@angular/forms';

import { inject } from '@angular/core';
import { addDoc } from '@angular/fire/firestore';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';

@Component({
  selector: 'app-dialog-add-customer',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-add-customer.component.html',
  styleUrl: './dialog-add-customer.component.scss'
})
export class DialogAddCustomerComponent {


  userData = inject(FirestoreServiceService);

  customer = new Customer();
  birthDate: Date = new Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddCustomerComponent>) { }

  async saveUser() {
    // Geburtsdatum in Timestamp umwandeln
    this.customer.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.customer);

    this.loading = true;
    try {
      const docRef = await addDoc(this.userData.customersCollection, this.customer.toJSON());
      console.log('User added with ID:', docRef.id);
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user:', error);
    }

    this.loading = false;
  }
}
