import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedcategorylistComponent } from './nestedcategorylist.component';

describe('NestedcategorylistComponent', () => {
  let component: NestedcategorylistComponent;
  let fixture: ComponentFixture<NestedcategorylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedcategorylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedcategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
