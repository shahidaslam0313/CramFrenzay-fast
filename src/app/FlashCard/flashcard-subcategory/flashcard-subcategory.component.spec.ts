import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSubcategoryComponent } from './flashcard-subcategory.component';

describe('FlashcardSubcategoryComponent', () => {
  let component: FlashcardSubcategoryComponent;
  let fixture: ComponentFixture<FlashcardSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
