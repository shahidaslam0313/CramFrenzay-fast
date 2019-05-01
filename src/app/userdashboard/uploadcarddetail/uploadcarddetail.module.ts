import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UploadcarddetailComponent} from './uploadcarddetail.component';

const uploadcarddetailRoutes: Routes = [
  { path: '', component: UploadcarddetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(uploadcarddetailRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    UploadcarddetailComponent,
  ]
})
export class UploadcarddetailModule {}
