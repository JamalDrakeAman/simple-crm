import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user.class';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { inject } from '@angular/core';
import { FirestoreServiceService } from '../shared/service/firestore-service.service';
import { doc, setDoc } from "firebase/firestore";

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    MatProgressBarModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  loading = false;
  user: User;
  userId: string;
  // birthDate: Date;

  userData = inject(FirestoreServiceService);


  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
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
