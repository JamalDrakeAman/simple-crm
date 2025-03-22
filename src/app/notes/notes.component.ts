import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { NoteComponent } from './note/note.component';
import { FirestoreServiceService } from '../shared/services/firestore-service.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { Note } from '../../models/note.class';
import { onSnapshot } from '@firebase/firestore';

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
export class NotesComponent implements OnInit {

  theme = inject(ThemeService);

  noteData = inject(FirestoreServiceService);

  notes: Note[] = [];

  constructor(public dialog: MatDialog) { }

  private unsubscribe!: () => void;


  ngOnInit(): void {
    this.unsubscribe = onSnapshot(this.noteData.notesCollection, (snapshot) => {
      this.notes = snapshot.docs.map((doc) => {
        const data = doc.data() as Note;
        data.id = doc.id; // Füge die Dokument-ID hinzu
        return data;
      });
      console.log('Aktuelle Notes:', this.notes);
    });
  }

  ngOnDestroy(): void {
    // Beende das Abonnement, wenn die Komponente zerstört wird
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  openDialog() {
    this.dialog.open(AddNoteDialogComponent, {
      width: '600px', // Breite des Dialogs
      height: '400px', // Höhe des Dialogs
      maxWidth: '100vw', // Maximale Breite (100% der Viewport-Breite)
      maxHeight: '100vh', // Maximale Höhe (100% der Viewport-Höhe)
    });
  }


}
