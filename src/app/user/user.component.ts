import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';

import { inject } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { onSnapshot } from "firebase/firestore";
import { FirestoreServiceService } from '../firestore-service.service';


import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

  userData = inject(FirestoreServiceService);
  users: User[] = [];

  private unsubscribe!: () => void;
  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    // onSnapshot für die Sammlung "users"
    this.unsubscribe = onSnapshot(this.userData.itemCollection, (snapshot) => {
      this.users = snapshot.docs.map((doc) => {
        const data = doc.data() as User;
        data.id = doc.id; // Füge die Dokument-ID hinzu
        return data;
      });
      console.log('Aktuelle Benutzer:', this.users);
    });
  }


  ngOnDestroy(): void {
    // Beende das Abonnement, wenn die Komponente zerstört wird
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
