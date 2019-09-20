import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { MylibraryComponent }   from './mylibrary.component';
import {RouterModule, Routes} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import {MatRadioModule} from '@angular/material';
const mylibraryRoutes: Routes = [
  { path: '', component: MylibraryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(mylibraryRoutes),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    MatRadioModule
  ],
  declarations: [
    MylibraryComponent
  ]
})
export class MylibraryModule {}
