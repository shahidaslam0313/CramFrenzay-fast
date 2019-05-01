import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiditemsComponent } from './biditems.component';

describe('BiditemsComponent', () => {
  let component: BiditemsComponent;
  let fixture: ComponentFixture<BiditemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiditemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
