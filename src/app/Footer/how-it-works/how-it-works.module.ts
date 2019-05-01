import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HowItWorksComponent} from './how-it-works.component';

const howItWorksRoutes: Routes = [
  { path: '', component: HowItWorksComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(howItWorksRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    HowItWorksComponent,
  ]
})
export class HowItWorksModule {}
