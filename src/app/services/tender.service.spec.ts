import { TestBed } from '@angular/core/testing';

import { TenderService } from './tender.model';

describe('TenderService', () => {
  let service: TenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
