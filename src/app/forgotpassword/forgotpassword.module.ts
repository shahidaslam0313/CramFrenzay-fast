import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { ForgotpasswordService } from './forgotpassword.service';
import { MaterialModule } from '../app.module';

let forgotpasswordComponent: Routes = [
  { path: '', component: ForgotpasswordComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(forgotpasswordComponent),
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotpasswordComponent],
  providers: [ForgotpasswordService]
})
export class ForgotpasswordModule { }
