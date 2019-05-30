import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingoffersComponent } from './pendingoffers.component';

describe('PendingoffersComponent', () => {
  let component: PendingoffersComponent;
  let fixture: ComponentFixture<PendingoffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingoffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
