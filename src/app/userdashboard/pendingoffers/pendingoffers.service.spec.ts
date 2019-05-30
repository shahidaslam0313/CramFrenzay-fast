import { TestBed } from '@angular/core/testing';

import { PendingoffersService } from './pendingoffers.service';

describe('PendingoffersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingoffersService = TestBed.get(PendingoffersService);
    expect(service).toBeTruthy();
  });
});
