import { NgModule } from '@angular/core';

import { CategoriesComponent }   from './categories.component';
import {RouterModule, Routes} from "@angular/router";
import { CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const categoriesRoutes: Routes = [
  { path: '', component: CategoriesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(categoriesRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    CategoriesComponent
  ]
})
export class CategoriesModule {}
