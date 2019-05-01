import { NgModule } from '@angular/core';
import {AddtocartService} from '../../addtocart/addtocart.service';
import { EachcourseComponent }   from './eachcourse.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AddtocartComponent } from './../../addtocart/addtocart.component';
const EachcourseRoutes: Routes = [
  { path: '', component: EachcourseComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(EachcourseRoutes),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    EachcourseComponent,
    // AddtocartComponent
  ],
  // providers: [AddtocartService]
})
export class EachcourseModule {}
