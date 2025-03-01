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

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { 
    this.user = new User();
  }

  user: User;
  loading = false;

  saveUser() {

  }

}
