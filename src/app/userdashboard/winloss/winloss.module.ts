import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinlossComponent } from './winloss.component';
import { Routes } from '@angular/router';
import { WinlossService } from "./winloss.service";
import {RatingModule} from "ng2-rating";

import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const route: Routes = [
  { path: '', component: WinlossComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RatingModule,
    RouterModule.forChild(route),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [WinlossComponent,
    ],
  entryComponents: [

  ],

  providers: [WinlossService]
})
export class WinlossModule { }
