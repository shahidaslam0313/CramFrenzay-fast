import { NgModule } from '@angular/core';

import { ScholarshipdetailComponent }from './scholarshipdetail.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const scholarshipdetailRoutes: Routes = [
  { path: '', component: ScholarshipdetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(scholarshipdetailRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    ScholarshipdetailComponent
  ]
})
export class ScholarshipdetailModule {}
