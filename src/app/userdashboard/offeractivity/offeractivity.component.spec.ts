import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferactivityComponent } from './offeractivity.component';

describe('OfferactivityComponent', () => {
  let component: OfferactivityComponent;
  let fixture: ComponentFixture<OfferactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
