import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGridComponent } from './date-grid.component';

describe('DateGridComponent', () => {
  let component: DateGridComponent;
  let fixture: ComponentFixture<DateGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
