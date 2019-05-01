import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { ContactusComponent }   from './contactus.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const contactusRoutes: Routes = [
  { path: '', component: ContactusComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(contactusRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    ContactusComponent,
  ]
})
export class ContactusModule {}
