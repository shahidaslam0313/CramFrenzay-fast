import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RatingModule} from 'ng2-rating';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail.component';
// import { AddtocartComponent } from '../../addtocart/addtocart.component';

const detailRoutes: Routes = [
  { path: '', component: DetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(detailRoutes),
    MaterialModule,
    CommonModule,
    RatingModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    DetailComponent,
    // AddtocartComponent
  ]
})
export class DetailModule { }
