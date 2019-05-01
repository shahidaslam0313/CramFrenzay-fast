import { NgModule } from '@angular/core';

import { TutorregistrationComponent }from './tutorregistration.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const tutorregistrationRoutes: Routes = [
  { path: '', component: TutorregistrationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(tutorregistrationRoutes),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [
    TutorregistrationComponent
  ]
})
export class TutorregistrationModule {}
