import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosOverviewComponent } from './todos-overview.component';

describe('TodosOverviewComponent', () => {
  let component: TodosOverviewComponent;
  let fixture: ComponentFixture<TodosOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosOverviewComponent]
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
