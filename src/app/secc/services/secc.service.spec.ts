import { TestBed } from '@angular/core/testing';

import { SeccService } from './secc.service';

describe('SeccService', () => {
  let service: SeccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
