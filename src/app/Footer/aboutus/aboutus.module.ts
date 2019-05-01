import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { AboutusComponent }   from './aboutus.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const aboutusRoutes: Routes = [
  { path: '', component: AboutusComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(aboutusRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    AboutusComponent,
  ]
})
export class AboutusModule {}
