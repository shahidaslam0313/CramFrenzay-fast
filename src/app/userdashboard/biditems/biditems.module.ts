import { NgModule } from '@angular/core';

import { BiditemsComponent }   from './biditems.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";

const biditemsRoutes: Routes = [
  { path: '', component: BiditemsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(biditemsRoutes),
    CommonModule,
    MaterialModule,

  ],
  declarations: [
    BiditemsComponent,

  ]
})
export class BiditemsModule {

}
