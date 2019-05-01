import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FlashcarddetailComponent }   from './flashcarddetail.component';
import {RouterModule, Routes} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../app.module';
const flashcarddetailRoutes: Routes = [
  { path: '', component: FlashcarddetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(flashcarddetailRoutes),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    FlashcarddetailComponent
  ]
})
export class FlashcarddetailModule {}
