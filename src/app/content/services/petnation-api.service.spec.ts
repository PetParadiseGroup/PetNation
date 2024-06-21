import { TestBed } from '@angular/core/testing';

import { PetnationApiService } from './petnation-api.service';

describe('PetnationApiService', () => {
  let service: PetnationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetnationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
