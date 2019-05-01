import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { CoursesearchComponent } from './coursesearch.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const coursesearch: Routes = [
  { path: '', component: CoursesearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coursesearch),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    CoursesearchComponent,
  ]
})
export class CoursesearchModule {}
