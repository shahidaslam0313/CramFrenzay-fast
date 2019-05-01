import { TestBed, inject } from '@angular/core/testing';

import { CarddetailService } from './carddetail.service';

describe('CarddetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarddetailService]
    });
  });

  it('should be created', inject([CarddetailService], (service: CarddetailService) => {
    expect(service).toBeTruthy();
  }));
});
