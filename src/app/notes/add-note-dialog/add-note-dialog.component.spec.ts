import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteDialogComponent } from './add-note-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('AddNoteDialogComponent', () => {
  let component: AddNoteDialogComponent;
  let fixture: ComponentFixture<AddNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoteDialogComponent],
      providers: [MatDialogRef]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
