import { TestBed, inject } from '@angular/core/testing';

import { AddscholarshipService } from './addscholarship.service';

describe('AddscholarshipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddscholarshipService]
    });
  });

  it('should be created', inject([AddscholarshipService], (service: AddscholarshipService) => {
    expect(service).toBeTruthy();
  }));
});
