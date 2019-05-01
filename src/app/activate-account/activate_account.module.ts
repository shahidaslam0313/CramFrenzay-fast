import { NgModule } from '@angular/core';
import { ActivateAccountComponent } from './activate-account.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';

const activateaccountRoutes: Routes = [
  { path: '', component: ActivateAccountComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(activateaccountRoutes),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    ActivateAccountComponent
  ]
})
export class ActivateAccountModule {}
