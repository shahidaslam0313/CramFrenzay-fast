import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickModule } from 'ngx-slick';
import { TeachersComponent }   from './teachers.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import {RatingModule} from "ng2-rating";
import {CountdownModule} from "ng2-countdown-timer";
const teachersRoutes: Routes = [
  { path: '', component: TeachersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(teachersRoutes),
    MaterialModule,
    CommonModule,
    SlickModule,
    FormsModule, ReactiveFormsModule,
    RatingModule,
    CountdownModule
  ],
  declarations: [
    TeachersComponent,
  ]
})
export class TeachersModule {}
