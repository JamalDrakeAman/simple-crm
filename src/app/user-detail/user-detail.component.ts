import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

import { inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, getDoc, doc } from '@angular/fire/firestore';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  firestore = inject(Firestore);
  itemCollection = collection(this.firestore, 'users');

  userId: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') ?? '';
      console.log('GOT ID', this.userId);
    })

    this.getUser()
  }


  async getUser() {
    const docRef = doc(this.itemCollection, this.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }







}
