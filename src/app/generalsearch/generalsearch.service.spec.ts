import { TestBed, inject } from '@angular/core/testing';

import { GeneralsearchService } from './generalsearch.service';

describe('GeneralsearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralsearchService]
    });
  });

  it('should be created', inject([GeneralsearchService], (service: GeneralsearchService) => {
    expect(service).toBeTruthy();
  }));
});
