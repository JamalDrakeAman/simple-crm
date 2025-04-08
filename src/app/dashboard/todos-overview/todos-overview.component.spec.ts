import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosOverviewComponent } from './todos-overview.component';
import { FirestoreServiceService } from '../../shared/services/firestore-service.service';
import { Firestore } from '@angular/fire/firestore';


describe('TodosOverviewComponent', () => {
  let component: TodosOverviewComponent;
  let fixture: ComponentFixture<TodosOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosOverviewComponent],
      imports: [],
      providers: [
        FirestoreServiceService,
        { provide: Firestore, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodosOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
