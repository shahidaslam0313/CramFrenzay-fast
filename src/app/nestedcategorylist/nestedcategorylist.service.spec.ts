import { TestBed } from '@angular/core/testing';

import { NestedcategorylistService } from './nestedcategorylist.service';

describe('NestedcategorylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NestedcategorylistService = TestBed.get(NestedcategorylistService);
    expect(service).toBeTruthy();
  });
});
