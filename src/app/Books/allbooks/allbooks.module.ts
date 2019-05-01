import { NgModule } from '@angular/core';
import { AllbooksComponent } from './allbooks.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app.module';
import {LoaderModule} from '../../loader/loader.module';
import {RatingModule} from 'ng2-rating';
import { SlickModule } from 'ngx-slick';
const allbooksRoutes: Routes = [
  { path: '', component: AllbooksComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(allbooksRoutes),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    LoaderModule,
    RatingModule,
    SlickModule



  ],
  declarations: [
    AllbooksComponent
  ]
})
export class AllbooksModule {}
