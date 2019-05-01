import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedcateroyComponent } from './nestedcateroy.component';

describe('NestedcateroyComponent', () => {
  let component: NestedcateroyComponent;
  let fixture: ComponentFixture<NestedcateroyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedcateroyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedcateroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
