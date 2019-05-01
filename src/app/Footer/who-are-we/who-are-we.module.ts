import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {WhoAreWeComponent} from './who-are-we.component';
import {MaterialModule} from '../../app.module';

const whoAreWeRoutes: Routes = [
  { path: '', component: WhoAreWeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(whoAreWeRoutes),
    CommonModule,
    MaterialModule
  ],
  declarations: [
    WhoAreWeComponent
  ]
})
export class WhoAreWeModule {}

