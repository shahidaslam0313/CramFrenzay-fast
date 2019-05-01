import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddeventsComponent } from './addevents.component';


const addeventsRoutes: Routes = [

  { path: '', component: AddeventsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(addeventsRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    AddeventsComponent,
  ]
})
export class AddeventsModule {}
