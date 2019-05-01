import { NgModule } from '@angular/core';

import { TutorinterviewComponent }from './tutorinterview.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const tutorinterviewRoutes: Routes = [
  { path: '', component: TutorinterviewComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(tutorinterviewRoutes),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [
    TutorinterviewComponent
  ]
})
export class TutorinterviewModule {}
