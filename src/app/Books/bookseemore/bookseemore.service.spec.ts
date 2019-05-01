import { TestBed, inject } from '@angular/core/testing';

import { BookseemoreService} from './bookseemore.service';

describe('BookeemoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookseemoreService]
    });
  });

  it('should be created', inject([BookseemoreService], (service: BookseemoreService) => {
    expect(service).toBeTruthy();
  }));
});
