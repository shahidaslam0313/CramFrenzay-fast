import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BecomepartnerComponent} from './becomepartner.component';

const becomepartnerRoutes: Routes = [
  { path: '', component: BecomepartnerComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(becomepartnerRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    BecomepartnerComponent,
  ]
})
export class BecomepartnerModule {}
