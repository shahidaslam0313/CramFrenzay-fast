import { NgModule } from '@angular/core';

import { FlashcardComponent } from './flashcard.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app.module';

const flashcardRoutes: Routes = [
  { path: '', component: FlashcardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(flashcardRoutes),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,


  ],
  declarations: [
    FlashcardComponent
  ]
})
export class FlashcardModule {}
