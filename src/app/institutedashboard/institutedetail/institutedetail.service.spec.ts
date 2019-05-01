import { TestBed, inject } from '@angular/core/testing';

import { InstitutedetailService } from './institutedetail.service';

describe('InstitutedetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitutedetailService]
    });
  });

  it('should be created', inject([InstitutedetailService], (service: InstitutedetailService) => {
    expect(service).toBeTruthy();
  }));
});
