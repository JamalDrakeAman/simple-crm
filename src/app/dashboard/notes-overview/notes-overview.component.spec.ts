import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesOverviewComponent } from './notes-overview.component';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { Firestore } from '@angular/fire/firestore';

describe('NotesOverviewComponent', () => {
  let component: NotesOverviewComponent;
  let fixture: ComponentFixture<NotesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesOverviewComponent],
      providers: [
        FirestoreServiceService,
        { provide: Firestore, useValue: {} } // 👉 einfacher Mock
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
