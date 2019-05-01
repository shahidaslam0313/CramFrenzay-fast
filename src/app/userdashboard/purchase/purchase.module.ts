import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { PurchaseComponent }   from './purchase.component';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const purchaseRoutes: Routes = [
  { path: '', component: PurchaseComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(purchaseRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    PurchaseComponent,
  ]
})
export class PurchaseModule {}
