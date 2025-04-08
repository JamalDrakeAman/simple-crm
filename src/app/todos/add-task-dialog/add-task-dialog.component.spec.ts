import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskDialogComponent } from './add-task-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { Firestore } from '@angular/fire/firestore';

describe('AddTaskDialogComponent', () => {
  let component: AddTaskDialogComponent;
  let fixture: ComponentFixture<AddTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskDialogComponent],
      providers: [
        FirestoreServiceService,
        { provide: Firestore, useValue: {} },
        MatDialogRef
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
