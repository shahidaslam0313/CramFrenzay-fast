import { TestBed, inject } from '@angular/core/testing';

import { BidHistoryService } from './bid-history.service';

describe('BidHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BidHistoryService]
    });
  });

  it('should be created', inject([BidHistoryService], (service: BidHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
