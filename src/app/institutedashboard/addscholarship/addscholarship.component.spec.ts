import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscholarshipComponent } from './addscholarship.component';

describe('AddscholarshipComponent', () => {
  let component: AddscholarshipComponent;
  let fixture: ComponentFixture<AddscholarshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddscholarshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddscholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
