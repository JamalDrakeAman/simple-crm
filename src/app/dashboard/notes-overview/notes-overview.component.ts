import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { onSnapshot, Timestamp } from '@firebase/firestore';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { NoteOverview } from '../../shared/interfaces/note-overview.interface';

@Component({
  selector: 'app-notes-overview',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notes-overview.component.html',
  styleUrl: './notes-overview.component.scss'
})
export class NotesOverviewComponent implements OnInit {

  theme = inject(ThemeService);

  noteData = inject(FirestoreServiceService);

  noteTasks: any[] = [];

  private unsubscribe!: () => void;


  constructor() {

  }

  ngOnInit(): void {
    this.unsubscribe = onSnapshot(this.noteData.notesCollection, (snapshot) => {
      this.noteTasks = snapshot.docs.map((doc) => {
        const data = doc.data() as NoteOverview;
        data.id = doc.id; // Füge die Dokument-ID hinzu

        // Konvertiere das Timestamp-Objekt in ein Date-Objekt
        if (data.timestamp instanceof Timestamp) {
          data.timestamp = data.timestamp.toDate();
        }

        return data;
      });
      console.log('notes array', this.noteTasks);
    });
  }


  ngOnDestroy(): void {
    // Beende das Abonnement, wenn die Komponente zerstört wird
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

}
