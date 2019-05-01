import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { FaqsComponent } from './faqs.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const faqsRoutes: Routes = [
  { path: '', component: FaqsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(faqsRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    FaqsComponent,
  ]
})
export class FaqsModule {}
