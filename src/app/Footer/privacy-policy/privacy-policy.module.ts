import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PrivacyPolicyComponent} from './privacy-policy.component';

const privacypolicyRoutes: Routes = [
  { path: '', component: PrivacyPolicyComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(privacypolicyRoutes),
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PrivacyPolicyComponent,
  ]
})
export class PrivacyPolicyModule {}
