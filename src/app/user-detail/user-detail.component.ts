import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

import { inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, getDoc, doc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  firestore = inject(Firestore);
  itemCollection = collection(this.firestore, 'users');

  userId: string = '';
  user: User = new User();


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }


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
      this.user = new User(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  editUserDetail() {
   const dialog = this.dialog.open(DialogEditUserComponent);
   dialog.componentInstance.user = this.user;
  }


  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.user;
  }





}
