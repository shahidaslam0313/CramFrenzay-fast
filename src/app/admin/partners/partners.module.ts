import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PartnersComponent } from './partners.component';
import {MatTableModule} from '@angular/material/table';
const partnersComponent: Routes = [
  { path: '', component: PartnersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(partnersComponent),
    CommonModule,
    MatTableModule
  ],
  declarations: [
    PartnersComponent,
  ],
  providers: []
})
export class PartnersModule { }
