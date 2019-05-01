import { NgModule } from '@angular/core';

import { InstituteComponent }   from './institute.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";

const instituteRoutes: Routes = [
  { path: '', component: InstituteComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(instituteRoutes),
    CommonModule,
    MaterialModule
  ],
  declarations: [
    InstituteComponent,
  ]
})
export class InstituteModule {}
