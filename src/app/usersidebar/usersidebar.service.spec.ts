import { TestBed, inject } from '@angular/core/testing';

import { UsersidebarService } from './usersidebar.service';

describe('UsersidebarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersidebarService]
    });
  });

  it('should be created', inject([UsersidebarService], (service: UsersidebarService) => {
    expect(service).toBeTruthy();
  }));
});
