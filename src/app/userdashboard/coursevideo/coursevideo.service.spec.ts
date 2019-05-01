import { TestBed, inject } from '@angular/core/testing';

import { CoursevideoService } from './coursevideo.service';

describe('CoursevideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursevideoService]
    });
  });

  it('should be created', inject([CoursevideoService], (service: CoursevideoService) => {
    expect(service).toBeTruthy();
  }));
});
