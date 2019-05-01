import { TestBed, inject } from '@angular/core/testing';

import { WinlossService } from './winloss.service';

describe('WinlossService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinlossService]
    });
  });

  it('should be created', inject([WinlossService], (service: WinlossService) => {
    expect(service).toBeTruthy();
  }));
});
