import { ExperienceComponent } from './experience.component';
import { MaterialModule } from './../../app.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
const route: Routes = [
  { path: '', component: ExperienceComponent }
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    TextMaskModule
  ],
  declarations: [ExperienceComponent],
//   providers:[ExperienceService]
})
export class ExperienceModule { }
