import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FirestoreServiceService } from '../shared/service/firestore-service.service';
import { doc, onSnapshot } from "firebase/firestore";
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  userData = inject(FirestoreServiceService);

  private unsub!: () => void;
  users: User[] = [];

  constructor() {
    console.log(this.userData);

  }

  ngOnInit(): void {
  this.unsub = onSnapshot(this.userData.itemCollection, (snapshot) => {
      this.users = snapshot.docs.map((doc) => {
        const data = doc.data() as User;
        // data.id = doc.id; // Füge die Dokument-ID hinzu
        return data;
      });
      console.log('Aktuelle Benutzer:', this.users);
    });
  }

  ngOnDestroy(): void {
    // Beende das Abonnement, wenn die Komponente zerstört wird
    if (this.unsub) {
      this.unsub();
    }
  }


}
