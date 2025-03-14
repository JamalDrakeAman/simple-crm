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

import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';

import { inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FirestoreServiceService } from '../shared/service/firestore-service.service';


@Component({
  selector: 'app-dialog-add-user',
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  userData = inject(FirestoreServiceService);

  user = new User();
  birthDate: Date = new Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  async saveUser() {
    // Geburtsdatum in Timestamp umwandeln
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);

    this.loading = true;
    try {
      const docRef = await addDoc(this.userData.itemCollection, this.user.toJSON());
      console.log('User added with ID:', docRef.id);
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user:', error);
    }

    this.loading = false;
  }

}
