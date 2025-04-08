import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCustomerComponent } from './dialog-add-customer.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogAddCustomerComponent', () => {
  let component: DialogAddCustomerComponent;
  let fixture: ComponentFixture<DialogAddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddCustomerComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
