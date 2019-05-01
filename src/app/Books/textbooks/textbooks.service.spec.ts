import { TestBed, inject } from '@angular/core/testing';

import { TextbooksService } from './textbooks.service';

describe('TextbooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextbooksService]
    });
  });

  it('should be created', inject([TextbooksService], (service: TextbooksService) => {
    expect(service).toBeTruthy();
  }));
});
