import { NgModule } from '@angular/core';

import { TutorsearchComponent }from './tutorsearch.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

const tutorsearchRoutes: Routes = [
  { path: '', component: TutorsearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(tutorsearchRoutes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TutorsearchComponent
  ]
})
export class TutorsearchModule {}
