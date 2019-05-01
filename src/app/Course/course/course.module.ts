import { NgModule } from '@angular/core';
import {RatingModule} from "ng2-rating";
import { CourseComponent } from './course.component';
import {RouterModule, Routes} from "@angular/router";
import { CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoaderModule} from '../../loader/loader.module';
import {SlickModule} from 'ngx-slick';
const courseRoutes: Routes = [
  { path: '', component: CourseComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(courseRoutes),
    MaterialModule,
    CommonModule,
    LoaderModule,
    RatingModule,

    FormsModule, ReactiveFormsModule,
    SlickModule
  ],
  declarations: [
    CourseComponent
  ]
})
export class CourseModule {}
