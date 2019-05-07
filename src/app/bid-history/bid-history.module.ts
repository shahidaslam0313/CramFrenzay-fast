import { NgModule } from '@angular/core';
import { MaterialModule } from '../app.module';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BidHistoryComponent } from './bid-history.component';
import { BidHistoryService } from './bid-history.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from '../loader/loader.module';
import { CountdownModule } from "ng2-countdown-timer";
import {RatingModule} from 'ng2-rating';
const bidhistory: Routes = [
  { path: '', component: BidHistoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(bidhistory),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    LoaderModule,
    CountdownModule,
    RatingModule
    // MomentModule,
    // CountDown

  ],
  declarations: [
    BidHistoryComponent
  ],
  providers: [BidHistoryService]
})
export class BidHistoryModule { }
