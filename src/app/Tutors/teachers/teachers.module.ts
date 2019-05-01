import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeachersComponent }   from './teachers.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';

const teachersRoutes: Routes = [
  { path: '', component: TeachersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(teachersRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    TeachersComponent,
  ]
})
export class TeachersModule {}
