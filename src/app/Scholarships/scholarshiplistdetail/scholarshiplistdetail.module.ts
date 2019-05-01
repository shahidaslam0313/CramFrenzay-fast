import { NgModule } from '@angular/core';

import { ScholarshiplistdetailComponent }from './scholarshiplistdetail.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const scholarshiplistdetailRoutes: Routes = [
  { path: '', component: ScholarshiplistdetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(scholarshiplistdetailRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    ScholarshiplistdetailComponent
  ]
})
export class ScholarshiplistdetailModule {}
