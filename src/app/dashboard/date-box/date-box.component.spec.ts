import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateBoxComponent } from './date-box.component';
import { ActivatedRoute } from '@angular/router';

describe('DateBoxComponent', () => {
  let component: DateBoxComponent;
  let fixture: ComponentFixture<DateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateBoxComponent,ActivatedRoute],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
