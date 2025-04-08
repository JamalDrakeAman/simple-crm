import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { ActivatedRoute } from '@angular/router';


describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, ActivatedRoute],
      providers: [
        FirestoreServiceService,
        { provide: Firestore, useValue: {} },
        
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
