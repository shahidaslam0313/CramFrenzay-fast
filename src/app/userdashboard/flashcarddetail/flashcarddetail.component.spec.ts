import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcarddetailComponent } from './flashcarddetail.component';

describe('FlashcarddetailComponent', () => {
  let component: FlashcarddetailComponent;
  let fixture: ComponentFixture<FlashcarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
