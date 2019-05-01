import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UploadbookComponent} from './uploadbook.component';

const uploadbookRoutes: Routes = [
  { path: '', component: UploadbookComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(uploadbookRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    UploadbookComponent,
  ]
})
export class UploadbookModule {}
