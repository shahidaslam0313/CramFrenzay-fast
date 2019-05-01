import { TestBed, inject } from '@angular/core/testing';

import { AddeventsService } from './addevents.service';

describe('AddeventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddeventsService]
    });
  });

  it('should be created', inject([AddeventsService], (service: AddeventsService) => {
    expect(service).toBeTruthy();
  }));
});
