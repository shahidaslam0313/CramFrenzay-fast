import { NgModule } from '@angular/core';

import { UpcomingeventsComponent } from './upcomingevents.component';
import {RouterModule, Routes} from '@angular/router';
import { MaterialModule } from '../../app.module';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule} from '@angular/common';

const upcomingeventsRoutes: Routes = [
  { path: '', component: UpcomingeventsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(upcomingeventsRoutes),
    CommonModule,
    MaterialModule,
    MatSelectModule
  ],
  declarations: [
    UpcomingeventsComponent,
  ]
})
export class UpcomingeventsModule {}
