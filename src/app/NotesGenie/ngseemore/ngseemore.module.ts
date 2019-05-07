import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RatingModule} from "ng2-rating";
import { NgseemoreComponent }   from './ngseemore.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CountdownModule} from "ng2-countdown-timer";

const ngseemoreRoutes: Routes = [
  { path: '', component: NgseemoreComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ngseemoreRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RatingModule,
    CountdownModule
  ],
  declarations: [
    NgseemoreComponent,
  ]
})
export class NgseemoreModule {}
