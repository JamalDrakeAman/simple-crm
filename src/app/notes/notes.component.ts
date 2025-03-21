import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { NoteComponent } from './note/note.component';
import { FirestoreServiceService } from '../shared/services/firestore-service.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    NoteComponent,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  theme = inject(ThemeService);

  noteData = inject(FirestoreServiceService);


  constructor(public dialog: MatDialog) { }


  notes = [
    {
      id: 0,
      noteTitle: 'Note Title',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum cum aliquid excepturi saepe, mollitia quo iure nobis officia, porro libero voluptatibus. Suscipit sed deleniti nulla. Hic corporis quos nam culpa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum cum aliquid excepturi saepe, mollitia quo iure nobis officia, porro libero voluptatibus. Suscipit sed deleniti nulla. Hic corporis quos nam culpa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum cum aliquid excepturi saepe, mollitia quo iure nobis officia, porro libero voluptatibus. Suscipit sed deleniti nulla.'
    },
    {
      id: 1,
      noteTitle: 'Note Title 2',
      description: 'Die zweite beschreibung auf der Note',

    },
    {
      id: 2,
      noteTitle: 'Note Title 3',
      description: 'Die dritte beschreibung auf der Note',
    }
  ];



  openDialog() {
    this.dialog.open(AddNoteDialogComponent);
  }

}
