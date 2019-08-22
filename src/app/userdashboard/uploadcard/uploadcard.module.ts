import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UploadcardComponent} from './uploadcard.component';


const uploadcardRoutes: Routes = [
  { path: '', component: UploadcardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(uploadcardRoutes),
    MaterialModule,
  
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    UploadcardComponent,
  ]
})
export class UploadcardModule {}
