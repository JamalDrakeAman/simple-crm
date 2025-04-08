import { TestBed } from '@angular/core/testing';
import { FirestoreServiceService } from './firestore-service.service';
import { Firestore } from '@angular/fire/firestore';



describe('FirestoreServiceService', () => {
  let service: FirestoreServiceService;



  const firestoreMock = jasmine.createSpyObj('Firestore', [
    'collection', 'doc', 'addDoc', 'getDocs', 'setDoc', 'updateDoc', 'deleteDoc'
  ]);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirestoreServiceService,
        { provide: Firestore, useValue: firestoreMock }
      ]
    });
    service = TestBed.inject(FirestoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
