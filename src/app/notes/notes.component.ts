import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    NoteComponent
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  theme = inject(ThemeService);


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

}
