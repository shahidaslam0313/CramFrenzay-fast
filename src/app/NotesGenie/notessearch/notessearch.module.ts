import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { NotessearchComponent } from './notessearch.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const notessearch: Routes = [
  { path: '', component: NotessearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(notessearch),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    NotessearchComponent,
  ]
})
export class NotessearchModule {}
