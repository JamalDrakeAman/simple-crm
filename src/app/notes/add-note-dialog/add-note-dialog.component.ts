import { Component, inject } from '@angular/core';
import { Note } from '../../../models/note.class';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc } from '@angular/fire/firestore';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note-dialog',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.scss'
})
export class AddNoteDialogComponent {

  noteData = inject(FirestoreServiceService);

  note = new Note();
  loading = false;


  constructor(public dialogRef: MatDialogRef<AddNoteDialogComponent>) { }



  async saveNote() {
    this.loading = true;
    try {
      const docRef = await addDoc(this.noteData.notesCollection, this.note.toJSON());
      console.log('Note added with ID:', docRef.id);
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding note:', error);
    }

    this.loading = false;
  }

}
