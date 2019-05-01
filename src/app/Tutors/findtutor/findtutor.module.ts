import { NgModule } from '@angular/core';

import { FindtutorComponent }from './findtutor.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const findtutorRoutes: Routes = [
  { path: '', component: FindtutorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(findtutorRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    FindtutorComponent
  ]
})
export class FindtutorModule {}
