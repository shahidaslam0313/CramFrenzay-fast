import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutedetailComponent } from './institutedetail.component';

describe('InstitutedetailComponent', () => {
  let component: InstitutedetailComponent;
  let fixture: ComponentFixture<InstitutedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
