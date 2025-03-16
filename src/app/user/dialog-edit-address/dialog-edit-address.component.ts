import { Component } from '@angular/core';
import { User } from '../../../models/user.class';
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
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
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

  user: User;
  userId: string;
  loading = false;

  userData = inject(FirestoreServiceService);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
    this.user = new User();
    this.userId = '';
  }


  async saveUser() {
    this.loading = true;
    try {
      if (!this.userId || '') {
        throw new Error("Benutzer-ID ist nicht definiert.");
      }
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
