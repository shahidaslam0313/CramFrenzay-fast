import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RatingModule} from 'ng2-rating';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlashcardSubcategoryComponent} from './flashcard-subcategory.component';

const cardsubcategoryRoutes: Routes = [
  { path: '', component: FlashcardSubcategoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(cardsubcategoryRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RatingModule
  ],
  declarations: [
    FlashcardSubcategoryComponent,
  ]
})
export class cardsubcategoryModule {}
