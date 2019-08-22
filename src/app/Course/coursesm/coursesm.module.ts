import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesmComponent }   from './coursesm.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";
import {RatingModule} from 'ng2-rating';
import {CountdownModule} from "ng2-countdown-timer";

const coursesmRoutes: Routes = [
  { path: '', component: CoursesmComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coursesmRoutes),
    CommonModule,
    MaterialModule,
    RatingModule,
    CountdownModule,
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [
    CoursesmComponent,
  ]
})
export class CoursesmModule {}
