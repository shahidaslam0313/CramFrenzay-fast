import { TestBed, inject } from '@angular/core/testing';

import { UpcomingscholarshipService } from './upcomingscholarship.service';

describe('UpcomingscholarshipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpcomingscholarshipService]
    });
  });

  it('should be created', inject([UpcomingscholarshipService], (service: UpcomingscholarshipService) => {
    expect(service).toBeTruthy();
  }));
});
