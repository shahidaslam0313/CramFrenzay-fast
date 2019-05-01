import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { FlashsearchComponent } from './flashsearch.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const flashsearch: Routes = [
  { path: '', component: FlashsearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(flashsearch),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    FlashsearchComponent,
  ]
})
export class FlashsearchModule {}
