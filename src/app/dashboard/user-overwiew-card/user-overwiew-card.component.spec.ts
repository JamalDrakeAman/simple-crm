import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverwiewCardComponent } from './user-overwiew-card.component';

describe('UserOverwiewCardComponent', () => {
  let component: UserOverwiewCardComponent;
  let fixture: ComponentFixture<UserOverwiewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOverwiewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOverwiewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
