import { NgModule } from '@angular/core';

import { FcdetailComponent }   from './fcdetail.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RatingModule} from 'ng2-rating';
const fcdetailRoutes: Routes = [
  { path: '', component: FcdetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(fcdetailRoutes),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    RatingModule
  ],
  declarations: [
    FcdetailComponent,
  ]
})
export class FcdetailModule {}
