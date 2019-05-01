import { NgModule } from '@angular/core';

import { GeneralsearchComponent }   from './generalsearch.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../app.module';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const generalsearchRoutes: Routes = [
  { path: '', component: GeneralsearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(generalsearchRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatTabsModule
  ],
  declarations: [
    GeneralsearchComponent
  ]
})
export class GeneralsearchModule {}
