import { TestBed, inject } from '@angular/core/testing';

import { FlashcardetailService } from './flashcardetail.service';

describe('FlashcardetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashcardetailService]
    });
  });

  it('should be created', inject([FlashcardetailService], (service: FlashcardetailService) => {
    expect(service).toBeTruthy();
  }));
});
