import { NgModule } from '@angular/core';

import { SeemorempComponent }from './seemoremp.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RatingModule} from "ng2-rating";
import {CountdownModule} from "ng2-countdown-timer";
const seemorempRoutes: Routes = [
  { path: '', component: SeemorempComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(seemorempRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RatingModule,
    CountdownModule
  ],
  declarations: [
    SeemorempComponent
  ]
})
export class SeemorempModule {}
