import { NgModule } from '@angular/core';
import {RatingModule} from "ng2-rating";
import { CategoryWiseNotesComponent } from './category-wise-notes.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const categorywisenotesRoutes: Routes = [
  { path: '', component: CategoryWiseNotesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(categorywisenotesRoutes),
    CommonModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoryWiseNotesComponent
  ]
})
export class CategoryWiseNotesModule {}
