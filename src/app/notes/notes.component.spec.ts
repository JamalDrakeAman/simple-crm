import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { FirestoreServiceService } from '../shared/services/firestore-service.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

class FirestoreServiceMock {
  notesCollection = { 
    // Simulieren einer Firestore Collection mit einem Observable
    valueChanges: () => of([
      { title: '1', description: 'Note 1', timestamp: 'Test content' }
    ]) 
  };
}

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesComponent],
      providers: [
        { provide: FirestoreServiceService, useClass: FirestoreServiceMock },  // Mock verwenden
        { provide: MatDialog, useValue: {} }  // Mock für MatDialog (falls Dialog verwendet wird)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
