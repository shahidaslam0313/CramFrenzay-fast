import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingscholarshipComponent } from './upcomingscholarship.component';

describe('UpcomingscholarshipComponent', () => {
  let component: UpcomingscholarshipComponent;
  let fixture: ComponentFixture<UpcomingscholarshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingscholarshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingscholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
