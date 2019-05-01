import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutelibraryComponent } from './institutelibrary.component';

describe('InstitutelibraryComponent', () => {
  let component: InstitutelibraryComponent;
  let fixture: ComponentFixture<InstitutelibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutelibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutelibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
