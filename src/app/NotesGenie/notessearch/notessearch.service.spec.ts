import { TestBed, inject } from '@angular/core/testing';

import { NotessearchService } from './notessearch.service';

describe('NotessearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotessearchService]
    });
  });

  it('should be created', inject([NotessearchService], (service: NotessearchService) => {
    expect(service).toBeTruthy();
  }));
});
