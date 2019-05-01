import { NgModule } from '@angular/core';

import { SidebarComponent }from './sidebar.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

const sidebarRoutes: Routes = [
  { path: '', component: SidebarComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(sidebarRoutes),
    CommonModule,
    FormsModule,

    ReactiveFormsModule
  ],
  declarations: [
    // SidebarComponent
  ]
})
export class SidebarModule {}
