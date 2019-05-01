import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from './dashboard.component';
import {MaterialModule} from '../../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const dashboardComponent: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardComponent),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: []
})
export class DashboardModule { }
