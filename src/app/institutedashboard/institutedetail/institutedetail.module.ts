import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InstitutedetailComponent} from './institutedetail.component';
import {LoaderModule} from '../../loader/loader.module';

const institutedetailRoutes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full', component: MainpageComponent },
  { path: '', component: InstitutedetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(institutedetailRoutes),
    MaterialModule,
    CommonModule,
    LoaderModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    InstitutedetailComponent,
  ]
})
export class InstitutedetailModule {}
