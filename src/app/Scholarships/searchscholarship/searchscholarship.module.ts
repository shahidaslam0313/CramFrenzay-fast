import { NgModule } from '@angular/core';

import { SearchscholarshipComponent }from './searchscholarship.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const searchscholarshipRoutes: Routes = [
  { path: '', component: SearchscholarshipComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(searchscholarshipRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    SearchscholarshipComponent
  ]
})
export class SearchscholarshipModule {}
