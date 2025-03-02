import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogRef
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { inject } from '@angular/core';
import { FirestoreServiceService } from '../firestore-service.service';
import { doc, setDoc } from "firebase/firestore";

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatFormFieldModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {

  userData = inject(FirestoreServiceService);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
    this.user = new User();
    this.userId = '';
  }

  user: User;
  userId: string;
  loading = false;

  async saveUser() {
    this.loading = true;
    console.log(this.userId);
    console.log(this.user.toJSON());
    

    try {
      if (!this.userId || '') {
        throw new Error("Benutzer-ID ist nicht definiert.");
      }

      // const userRef = doc(this.userData.itemCollection, this.userId);

      // await setDoc(userRef, this.user.toJSON()); 

      await setDoc(doc(this.userData.db, "users", this.userId), this.user.toJSON());
      console.log("Benutzer erfolgreich aktualisiert!");

      this.dialogRef.close(); 
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Benutzers: ", error);
    } finally {
      this.loading = false;
    }
  }



}
