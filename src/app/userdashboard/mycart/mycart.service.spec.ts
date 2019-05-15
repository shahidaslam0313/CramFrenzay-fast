import { TestBed } from '@angular/core/testing';

import { MycartService } from './mycart.service';

describe('MycartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MycartService = TestBed.get(MycartService);
    expect(service).toBeTruthy();
  });
});
