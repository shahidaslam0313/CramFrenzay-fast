import { TestBed, inject } from '@angular/core/testing';

import { SearchbooksService } from './searchbooks.service';

describe('SearchbooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchbooksService]
    });
  });

  it('should be created', inject([SearchbooksService], (service: SearchbooksService) => {
    expect(service).toBeTruthy();
  }));
});
