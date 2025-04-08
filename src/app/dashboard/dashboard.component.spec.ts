import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { FirestoreServiceService } from '../shared/services/firestore-service.service';
import { MatCardModule } from '@angular/material/card';
import { Firestore } from '@angular/fire/firestore';

class FirestoreServiceMock {
  usersCollection = {
    onSnapshot: (callback: Function) => {
      const snapshot = {
        docs: [
          {
            data: () => ({
              uid: '1',
              displayName: 'Test User'
            })
          }
        ]
      };
      callback(snapshot);
      return () => { }; // Rückgabewert für unsubscribe
    }
  };

  customersCollection = {
    onSnapshot: (callback: Function) => {
      const snapshot = {
        docs: [
          {
            data: () => ({
              id: '1',
              name: 'Test Customer'
            })
          }
        ]
      };
      callback(snapshot);
      return () => { }; // Rückgabewert für unsubscribe
    }
  };
}


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, MatCardModule],
      providers: [
        FirestoreServiceService,
        { provide: Firestore, useValue: {} } // 👉 einfacher Mock
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
