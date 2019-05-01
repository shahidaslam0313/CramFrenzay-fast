import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubcategoryComponent } from './course-subcategory.component';

describe('CourseSubcategoryComponent', () => {
  let component: CourseSubcategoryComponent;
  let fixture: ComponentFixture<CourseSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
