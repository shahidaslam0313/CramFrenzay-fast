import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import {MainpageComponent} from './mainpage.component';
import {LoaderModule} from '../../loader/loader.module';
import { SlickModule } from 'ngx-slick';
import {AcceptofferComponent} from '../../acceptoffer/acceptoffer.component';
// import {BidHistoryComponent} from '../../bid-history/bid-history.component';

const MainpageRoutes: Routes = [
  { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SlickModule,
    LoaderModule,
    RouterModule.forChild(MainpageRoutes)

  ],
  // entryComponents: [
  //   // WinbidDialogComponent,
  //   AcceptofferComponent
  // ],
  declarations: []
})
export class MainpageModule { }
