import { TestBed, inject } from '@angular/core/testing';

import { MycourceService } from './mycource.service';

describe('MycourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MycourceService]
    });
  });

  it('should be created', inject([MycourceService], (service: MycourceService) => {
    expect(service).toBeTruthy();
  }));
});
