import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddscholarshipComponent } from './addscholarship.component';


const addsholarshipRoutes: Routes = [

  { path: '', component: AddscholarshipComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(addsholarshipRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    AddscholarshipComponent,
  ]
})
export class AddscholarshipModule {}
