import { NgModule } from '@angular/core';

import { ScholarshiplistComponent }from './scholarshiplist.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const scholarshiplistRoutes: Routes = [
  { path: '', component: ScholarshiplistComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(scholarshiplistRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    ScholarshiplistComponent
  ]
})
export class ScholarshiplistModule {}
