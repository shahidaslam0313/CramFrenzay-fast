import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RatingModule} from 'ng2-rating';
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BookcategoryComponent} from './bookcategory.component';

const bookcategoryRoutes: Routes = [
  { path: '', component: BookcategoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(bookcategoryRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RatingModule
  ],
  declarations: [
    BookcategoryComponent,
  ]
})
export class BookcategoryModule {}
