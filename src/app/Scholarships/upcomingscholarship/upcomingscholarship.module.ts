import { NgModule } from '@angular/core';

import { UpcomingscholarshipComponent } from './upcomingscholarship.component';
import {RouterModule, Routes} from '@angular/router';
import { MaterialModule } from '../../app.module';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule} from '@angular/common';

const upcomingscholarshipRoutes: Routes = [
  { path: '', component: UpcomingscholarshipComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(upcomingscholarshipRoutes),
    CommonModule,
    MaterialModule,
    MatSelectModule
  ],
  declarations: [
    UpcomingscholarshipComponent,
  ]
})
export class UpcomingscholarshipModule {}
