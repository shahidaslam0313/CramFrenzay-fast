import { NgModule } from '@angular/core';

import { TutorComponent }from './tutor.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '../../loader/loader.module';

const tutorRoutes: Routes = [
  { path: '', component: TutorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(tutorRoutes),
    CommonModule,
    FormsModule,
    LoaderModule,

    ReactiveFormsModule
  ],
  declarations: [
    TutorComponent
  ]
})
export class TutorModule {}
