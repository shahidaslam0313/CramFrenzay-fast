import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinlossComponent } from './winloss.component';

describe('WinlossComponent', () => {
  let component: WinlossComponent;
  let fixture: ComponentFixture<WinlossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinlossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinlossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
