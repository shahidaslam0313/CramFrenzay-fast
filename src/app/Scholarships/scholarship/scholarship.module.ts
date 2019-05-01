import { NgModule } from '@angular/core';

import { ScholarshipComponent }from './scholarship.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const scholarshipRoutes: Routes = [
  { path: '', component: ScholarshipComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(scholarshipRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    ScholarshipComponent
  ]
})
export class ScholarshipModule {}
