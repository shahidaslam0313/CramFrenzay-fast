import { NgModule } from '@angular/core';

import { InstituteeventsComponent } from './instituteevents.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app.module';

const instituteeventsRoutes: Routes = [
  { path: '', component: InstituteeventsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(instituteeventsRoutes),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,


  ],
  declarations: [
    InstituteeventsComponent
  ]
})
export class InstituteeventsModule {}
