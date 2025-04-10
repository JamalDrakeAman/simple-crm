import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayGridComponent } from './day-grid.component';

describe('DayGridComponent', () => {
  let component: DayGridComponent;
  let fixture: ComponentFixture<DayGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
