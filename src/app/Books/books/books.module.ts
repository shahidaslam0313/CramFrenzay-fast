import { NgModule } from '@angular/core';

import { BooksComponent }   from './books.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const booksRoutes: Routes = [
  { path: '', component: BooksComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(booksRoutes),
    CommonModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    BooksComponent
  ]
})
export class BooksModule {}
