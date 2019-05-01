import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IntellectualPropertyComponent} from './intellectual-property.component';

const intellectualPropertyRoutes: Routes = [
  { path: '', component: IntellectualPropertyComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(intellectualPropertyRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    IntellectualPropertyComponent,
  ]
})
export class IntellectualPropertyModule {}
