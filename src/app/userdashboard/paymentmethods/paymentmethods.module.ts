import { PaymentmethodsService } from './paymentmethods.service';
import { MaterialModule } from './../../app.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentmethodsComponent } from './paymentmethods.component';
import { TextMaskModule } from 'angular2-text-mask';
const route: Routes = [
  { path: '', component: PaymentmethodsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    TextMaskModule
  ],
  declarations: [PaymentmethodsComponent],
  providers:[PaymentmethodsService]
})
export class PaymentmethodsModule { }
