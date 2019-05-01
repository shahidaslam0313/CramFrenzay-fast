import { TestBed, inject } from '@angular/core/testing';

import { TutorregistrationService } from './tutorregistration.service';

describe('TutorregistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorregistrationService]
    });
  });

  it('should be created', inject([TutorregistrationService], (service: TutorregistrationService) => {
    expect(service).toBeTruthy();
  }));
});
