import { NgModule } from '@angular/core';
import {RatingModule} from "ng2-rating";
import { NotesgenieComponent }   from './notesgenie.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoaderModule} from '../../loader/loader.module';
import { SlickModule } from 'ngx-slick';
const notesgenieRoutes: Routes = [
  { path: '', component: NotesgenieComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(notesgenieRoutes),
    MaterialModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    LoaderModule,
    RatingModule,
    SlickModule
  ],
  declarations: [
    NotesgenieComponent
  ]
})
export class NotesgenieModule {}
