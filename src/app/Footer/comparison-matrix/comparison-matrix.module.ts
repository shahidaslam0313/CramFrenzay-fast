import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { ComparisonMatrixComponent } from './comparison-matrix.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const comparisonMatrixRoutes: Routes = [
  { path: '', component: ComparisonMatrixComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(comparisonMatrixRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    ComparisonMatrixComponent,
  ]
})
export class ComparisonMatrixModule {}
