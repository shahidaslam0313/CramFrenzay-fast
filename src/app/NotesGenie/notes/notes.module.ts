import { NgModule } from '@angular/core';
import { NotesComponent } from './notes.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoaderModule} from '../../loader/loader.module';
import {RatingModule} from 'ng2-rating';
const notesRoutes: Routes = [
  { path: '', component: NotesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(notesRoutes),
    CommonModule,
    MaterialModule,
    LoaderModule,
    FormsModule, ReactiveFormsModule,
    RatingModule

  ],
  declarations: [
    NotesComponent
  ]
})
export class NotesModule {}
