import { NgModule } from '@angular/core';
import {RatingModule} from 'ng2-rating';
import { BookseemoreComponent }   from './bookseemore.component';
import {RouterModule, Routes} from "@angular/router";
import { CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const bookseemoreRoutes: Routes = [
  { path: '', component: BookseemoreComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(bookseemoreRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RatingModule
  ],
  declarations: [
    BookseemoreComponent
  ]
})
export class BookseemoreModule {}
