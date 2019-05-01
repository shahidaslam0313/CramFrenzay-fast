import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CoursevideoComponent, AddVideoComponent , IntroVideoComponent ,  } from './coursevideo.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';
import {VideoShowDialogComponent} from "./video-show-dialog/video-show-dialog.component";
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import { CKEditorModule } from 'ng2-ckeditor';


const coursevideoRoutes: Routes = [
  { path: '', component: CoursevideoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coursevideoRoutes),
    MaterialModule,
    CommonModule,
    // BlackgeeksRecaptchaModule,
    FormsModule, ReactiveFormsModule,
    VgBufferingModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    CKEditorModule

  ],
  declarations: [
    CoursevideoComponent, AddVideoComponent,
    IntroVideoComponent, VideoShowDialogComponent
  ],
  entryComponents: [

    AddVideoComponent,
    IntroVideoComponent ,
    VideoShowDialogComponent

  ]

})
export class CoursevideoModule {}
