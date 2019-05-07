import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import {MainpageComponent} from './mainpage.component';
import {LoaderModule} from '../../loader/loader.module';
import { SlickModule } from 'ngx-slick';
import {CountdownModule} from "ng2-countdown-timer";


const MainpageRoutes: Routes = [
  { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SlickModule,
    LoaderModule,
    CountdownModule,
    RouterModule.forChild(MainpageRoutes)

  ],

  declarations: []
})
export class MainpageModule { }
