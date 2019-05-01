import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorregistrationComponent } from './tutorregistration.component';

describe('TutorregistrationComponent', () => {
  let component: TutorregistrationComponent;
  let fixture: ComponentFixture<TutorregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
