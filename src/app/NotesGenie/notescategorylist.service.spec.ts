import { TestBed } from '@angular/core/testing';

import { NotescategorylistService } from './notescategorylist.service';

describe('NotescategorylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotescategorylistService = TestBed.get(NotescategorylistService);
    expect(service).toBeTruthy();
  });
});
