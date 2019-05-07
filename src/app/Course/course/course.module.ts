import { NgModule } from '@angular/core';
import {RatingModule} from "ng2-rating";
import { CourseComponent } from './course.component';
import {RouterModule, Routes} from "@angular/router";
import { CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoaderModule} from '../../loader/loader.module';
import {SlickModule} from 'ngx-slick';
import {CountdownModule} from "ng2-countdown-timer";
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
    CountdownModule,
    FormsModule, ReactiveFormsModule,
    SlickModule
  ],
  declarations: [
    CourseComponent
  ]
})
export class CourseModule {}
