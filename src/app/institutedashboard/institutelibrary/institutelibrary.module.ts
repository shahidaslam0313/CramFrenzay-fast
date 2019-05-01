import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InstitutelibraryComponent} from './institutelibrary.component';
import {LoaderModule} from '../../loader/loader.module';

const institutelibraryRoutes: Routes = [

  { path: '', component: InstitutelibraryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(institutelibraryRoutes),
    MaterialModule,
    CommonModule,
    LoaderModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    InstitutelibraryComponent,
  ]
})
export class InstitutedetailModule {}
