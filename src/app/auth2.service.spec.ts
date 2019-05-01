import { TestBed, inject } from '@angular/core/testing';

import { Auth2Service } from './auth2.service';

describe('Auth2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth2Service]
    });
  });

  it('should be created', inject([Auth2Service], (service: Auth2Service) => {
    expect(service).toBeTruthy();
  }));
});
