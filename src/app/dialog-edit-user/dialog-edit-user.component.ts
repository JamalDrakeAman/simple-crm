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

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    MatProgressBarModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.user = new User();
  }
  
  loading = false;
  user: User;


  saveUser() {

  }

}
