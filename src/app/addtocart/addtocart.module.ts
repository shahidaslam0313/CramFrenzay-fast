import { NgModule } from '@angular/core';
import { MaterialModule } from '../app.module';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AddtocartComponent } from './addtocart.component';
import { AddtocartService } from '../addtocart/addtocart.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const addtocartComponent: Routes = [
  { path: '', component: AddtocartComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(addtocartComponent),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    AddtocartComponent,
  ],
  providers: [AddtocartService]
})
export class AddtocartModule { }
