import { NgModule } from '@angular/core';

import { NotesCategoryComponent } from './notes-category.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";

const notescategoryRoutes: Routes = [
  { path: '', component: NotesCategoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(notescategoryRoutes),
    CommonModule
  ],
  declarations: [
    NotesCategoryComponent
  ]
})
export class NotesCategoryModule {}
