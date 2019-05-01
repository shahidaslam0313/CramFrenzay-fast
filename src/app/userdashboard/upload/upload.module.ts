import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { UploadComponent }   from './upload.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const uploadRoutes: Routes = [
  { path: '', component: UploadComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(uploadRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    UploadComponent,
  ]
})
export class UploadModule {}
