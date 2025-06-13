import { TestBed } from '@angular/core/testing';

import { PaginationFilterService } from './pagination-filter.service';

describe('PaginationFilterService', () => {
  let service: PaginationFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
