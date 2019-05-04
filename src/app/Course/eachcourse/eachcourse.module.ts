import { NgModule } from '@angular/core';
import {AddtocartService} from '../../addtocart/addtocart.service';
import { EachcourseComponent }   from './eachcourse.component';
import {RouterModule, Routes} from "@angular/router";
import { MaterialModule } from '../../app.module';
import { CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {VgBufferingModule} from "videogular2/buffering";
import {VgCoreModule} from "videogular2/core";
import {VgOverlayPlayModule} from "videogular2/overlay-play";
import {VgControlsModule} from "videogular2/controls";
import {CKEditorModule} from "ng2-ckeditor";
import {AddVideoComponent, IntroVideoComponent} from "../../userdashboard/coursevideo/coursevideo.component";
import {VideoShowDialogComponent} from "../../userdashboard/coursevideo/video-show-dialog/video-show-dialog.component";
// import { AddtocartComponent } from './../../addtocart/addtocart.component';
const EachcourseRoutes: Routes = [
  { path: '', component: EachcourseComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(EachcourseRoutes),
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    VgBufferingModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    CKEditorModule
  ],
  declarations: [
    EachcourseComponent,
    VideoShowDialogComponent
    // AddtocartComponent
  ],
  entryComponents: [

    VideoShowDialogComponent

  ]

  // providers: [AddtocartService]
})
export class EachcourseModule {}
