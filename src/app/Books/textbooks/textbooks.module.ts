import { NgModule } from '@angular/core';

import { TextbooksComponent } from './textbooks.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app.module';

const textbooksRoutes: Routes = [
  { path: '', component: TextbooksComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(textbooksRoutes),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,


  ],
  declarations: [
    TextbooksComponent
  ]
})
export class TextbooksModule {}
