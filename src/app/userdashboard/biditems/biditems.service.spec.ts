import { TestBed, inject } from '@angular/core/testing';

import { BiditemsService } from './biditems.service';

describe('BiditemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiditemsService]
    });
  });

  it('should be created', inject([BiditemsService], (service: BiditemsService) => {
    expect(service).toBeTruthy();
  }));
});
