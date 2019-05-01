import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RatingModule} from "ng2-rating";
import { SubcategoryComponent }   from './subcategory.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {SubcategoryComponent} from "../subcategory/subcategory.component";

const subcategoryRoutes: Routes = [
  { path: '', component: SubcategoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(subcategoryRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RatingModule
  ],
  declarations: [
    SubcategoryComponent,
  ]
})
export class SubcategoryModule {}
