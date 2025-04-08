import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTaskComponent } from './todo-task.component';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { Firestore } from '@angular/fire/firestore';

describe('TodoTaskComponent', () => {
  let component: TodoTaskComponent;
  let fixture: ComponentFixture<TodoTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTaskComponent],
      providers: [
        FirestoreServiceService,
        { provide: Firestore, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
