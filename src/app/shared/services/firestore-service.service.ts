import { Injectable } from '@angular/core';

import { inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, getDoc, doc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor() { }

  firestore = inject(Firestore);
  db = this.firestore

  usersCollection = collection(this.firestore, 'users');

  customersCollection = collection(this.firestore, 'customers');

  todosCollection = collection(this.firestore, 'todos');

}
