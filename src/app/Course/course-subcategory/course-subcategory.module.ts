import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RatingModule} from 'ng2-rating';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CourseSubcategoryComponent} from './course-subcategory.component';

const coursecategoryRoutes: Routes = [
  { path: '', component: CourseSubcategoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coursecategoryRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RatingModule
  ],
  declarations: [
    CourseSubcategoryComponent,
  ]
})
export class coursecategoryModule {}
