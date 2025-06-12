import { TestBed } from '@angular/core/testing';

import { UiCardResponsesService } from './ui-card-responses.service';

describe('UiCardResponsesService', () => {
  let service: UiCardResponsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiCardResponsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
