import { TestBed } from '@angular/core/testing';

import { FirestoreServiceService } from './shared/firestore-service.service';

describe('FirestoreServiceService', () => {
  let service: FirestoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
