import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptofferComponent } from './acceptoffer.component';

describe('AcceptofferComponent', () => {
  let component: AcceptofferComponent;
  let fixture: ComponentFixture<AcceptofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
