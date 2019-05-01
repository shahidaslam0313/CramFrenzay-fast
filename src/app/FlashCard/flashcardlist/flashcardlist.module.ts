import { NgModule } from '@angular/core';
import {RatingModule} from "ng2-rating";
import { FlashcardlistComponent }   from './flashcardlist.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";
import {LoaderModule} from '../../loader/loader.module';
import { SlickModule } from 'ngx-slick';
const flashcardlistRoutes: Routes = [
  { path: '', component: FlashcardlistComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(flashcardlistRoutes),
    CommonModule,
    LoaderModule,
    RatingModule,
    MaterialModule,
    SlickModule
  ],
  declarations: [
    FlashcardlistComponent,
  ]
})
export class FlashcardlistModule {}
