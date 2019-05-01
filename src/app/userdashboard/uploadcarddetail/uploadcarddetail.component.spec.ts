import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcarddetailComponent } from './uploadcarddetail.component';

describe('UploadcarddetailComponent', () => {
  let component: UploadcarddetailComponent;
  let fixture: ComponentFixture<UploadcarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadcarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadcarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
