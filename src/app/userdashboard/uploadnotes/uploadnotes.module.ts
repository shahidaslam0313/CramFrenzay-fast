import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UploadnotesComponent} from './uploadnotes.component';
import {MaterialModule} from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const uploadnotesRoutes: Routes = [
  { path: '', component: UploadnotesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(uploadnotesRoutes),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    UploadnotesComponent
  ]
})
export class UploadnotesModule {}
