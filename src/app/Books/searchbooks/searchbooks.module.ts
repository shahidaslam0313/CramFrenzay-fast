import { NgModule } from '@angular/core';

import { SearchbooksComponent } from './searchbooks.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app.module';

const searchbooksRoutes: Routes = [
  { path: '', component: SearchbooksComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(searchbooksRoutes),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,


  ],
  declarations: [
    SearchbooksComponent
  ]
})
export class SearchbooksModule {}
