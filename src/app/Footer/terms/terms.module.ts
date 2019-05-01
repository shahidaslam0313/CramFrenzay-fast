import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TermsComponent} from './terms.component';

const termsRoutes: Routes = [
  { path: '', component: TermsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(termsRoutes),
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TermsComponent,
  ]
})
export class TermsModule {}
