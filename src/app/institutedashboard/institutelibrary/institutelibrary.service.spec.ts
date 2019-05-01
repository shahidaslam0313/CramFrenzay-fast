import { TestBed, inject } from '@angular/core/testing';

import { InstitutelibraryService } from './institutelibrary.service';

describe('InstitutelibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitutelibraryService]
    });
  });

  it('should be created', inject([InstitutelibraryService], (service: InstitutelibraryService) => {
    expect(service).toBeTruthy();
  }));
});
