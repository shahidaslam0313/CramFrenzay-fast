import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { UsersidebarComponent } from './usersidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const usersidebarRoutes: Routes = [
  { path: '', component: UsersidebarComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersidebarRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    UsersidebarComponent,
  ]
})
export class UsersidebarModule {}
