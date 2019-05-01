import { NgModule } from '@angular/core';

import { CoursesmComponent }   from './coursesm.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";
import {RatingModule} from 'ng2-rating';

const coursesmRoutes: Routes = [
  { path: '', component: CoursesmComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coursesmRoutes),
    CommonModule,
    MaterialModule,
    RatingModule
  ],
  declarations: [
    CoursesmComponent,
  ]
})
export class CoursesmModule {}
