import { TestBed, inject } from '@angular/core/testing';

import { FlashsearchService } from './flashsearch.service';

describe('FlashsearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashsearchService]
    });
  });

  it('should be created', inject([FlashsearchService], (service: FlashsearchService) => {
    expect(service).toBeTruthy();
  }));
});
