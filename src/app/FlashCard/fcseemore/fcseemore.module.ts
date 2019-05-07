import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FcseemoreComponent }   from './fcseemore.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RatingModule} from 'ng2-rating';
import {CountdownModule} from "ng2-countdown-timer";

const fcseemoreRoutes: Routes = [
  { path: '', component: FcseemoreComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(fcseemoreRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RatingModule,
    CountdownModule
  ],
  declarations: [
    FcseemoreComponent,
  ]
})
export class FcseemoreModule {}
