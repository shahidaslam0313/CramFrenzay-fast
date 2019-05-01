import {Component, Inject, OnInit} from '@angular/core';
// import {SingleCourseService} from "../single-course.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Config } from './../../../Config';
import { CoursevideoService } from '../coursevideo.service';

@Component({
  selector: 'app-video-show-dialog',
  templateUrl: './video-show-dialog.component.html',
  styleUrls: ['./video-show-dialog.component.scss']
})
export class VideoShowDialogComponent implements OnInit {

  public video_url: any;
  public VideoUrl = Config.VideoUrl;

  constructor( private obj: CoursevideoService, public dialogRef: MatDialogRef<VideoShowDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  onNoClick(): void {
    this.dialogRef.close(1);
  }
  ngOnInit() {
    this.video_url = this.data.video_url;
    // alert(this.video_url)
  }
}
