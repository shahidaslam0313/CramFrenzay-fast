import {Component, Inject, OnInit} from '@angular/core';
import { CoursevideoService } from './coursevideo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { VideoShowDialogComponent } from "./video-show-dialog/video-show-dialog.component";
import { FormBuilder, FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import swal from "sweetalert2";
import {MylibraryService} from '../mylibrary/mylibrary.service';
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';
@Component({
  selector: 'app-coursevideo',
  templateUrl: './coursevideo.component.html',
  styleUrls: ['./coursevideo.component.scss']
})
export class CoursevideoComponent implements OnInit {
model: any = {};
public sub : Subscription;
  getchapter: any = [];
  card_opeation = [
    { value: 'English', viewValue: 'English' },
    { value: 'Urdu', viewValue: 'Urdu' },
    // { value: 'Divcover', viewValue: 'Divcover' },
    // { value: 'American Express', viewValue: 'American Express' }
  ];
  chaptername = new FormControl('', [
    Validators.required
  ]);
  public video_url: any;
  public VideoUrl = Config.VideoUrl;
  constructor(private video: CoursevideoService , private newcoures: MylibraryService , private route: ActivatedRoute,  public dialog: MatDialog) { }
  CourseId;
  id;
  getchaptervid;
  getcoursevid;
  data;
  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
    });
    // this.video_url = this.data.video_url;
    // this.id=localStorage.getItem('courseid');
    this.getchaptername();
    this.getchaptedeta();
    this.coursesupdate(localStorage.getItem('courseid'));
    this.getcousredeta();
  }
postrequirment(f: NgForm){
    this.video.requirment(this.model, this.id).subscribe(data =>{
      swal({
        type: 'success',
        title: 'Description Added ',
        showConfirmButton: false,
        timer: 1500
      });
    },
      error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'Description Already Exist',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
  )
  f.resetForm();
}
  onSubmit(f: NgForm) {
    this.video.upload_chapter(this.model.chaptername, this.id).subscribe(
      data => {
        swal({
          type: 'success',
          title: 'Chapter Successfully Added ',
          showConfirmButton: false,
          timer: 5500
        });
        this.getchaptername();
      },
      error => {
        // console.log(error);
        // this.chapterError();
      }
    );
    f.resetForm();
  }

  static chapterSuccess() {
    swal({
      type: 'success',
      title: 'Success! <br> New Chapter Added!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  chpt;
  time;
  static chapterError() {
    swal({
      type: 'error',
      title: 'Oops! <br> Failed to add new chapter!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  chapter_name;
  videos;
  totalvideos;
  all_video;
  totalvid;
  chapterid;
  getchaptername(){
    this.video.getchaptername(this.id).subscribe(data => {
      this.getchapter = data.data;
      this.videos = data.vedios;
      this.chpt = data['Total Chapter'];
      this.time = data['Total Hours'];
      this.totalvideos = data.totalvideos;
      this.totalvid = data['Total Lectures'];
      console.log(this.getchapter);
    });
  }
  getchaptedeta(){
    this.video.getchaptervideo(this.id).subscribe(data => {
      this.getchaptervid = data;
      // console.log(this.getchaptervid);
    });
  }
  getcousredeta(){
    this.video.getcoursevideo(this.id).subscribe(data => {
      this.getcoursevid = data;
    });
    }
  editcourse: any = [];
  coursesupdate(id) {
    this.newcoures.courseedit(this.id).subscribe(data => {
        this.editcourse = data;
        // console.log(this.editcourse);
      },
      error => {

      });
  }
    video_id;
   deleteVideo(id) {
    this.video_id = id;
    // console.log(this.video_id);
  }
  deletecoureseVideo(video_id) {
    alert(video_id)
    this.video.delete_Video(video_id).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 2500
      });
      this.getchaptername();
    }, error => {

    });
  }
  deleteintrovideo(video_id) {
    alert(video_id)
    this.video.delete_intro_Video(video_id).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 2500
      });
     
    }, error => {

    });
    this.getcousredeta();
  }
  insSetVideoURL(video_url) {

    const dialogRef = this.dialog.open(VideoShowDialogComponent, {
      width: '1366px',
      data: {
        video_url: video_url,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  SetVideoURL(video_url, SetVideoURL){
    const dialogRef = this.dialog.open(VideoShowDialogComponent, {
      width: '800px',
      data: {
        video_url: video_url,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    // alert(video_url)
  }
  openDialog2(chapter_id): void {
    const dialogRef = this.dialog.open(AddVideoComponent, {
      width: '500px',
      data: {
        course: chapter_id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  
  openDialog3(id): void {
    const dialogRef = this.dialog.open(IntroVideoComponent, {
      width: '500px',
      data: {
        course: id,
        
      }  
    }); 
    dialogRef.afterClosed().subscribe(result => {

    });
    // alert(this.id)
    
  }
}
@Component({
  selector: 'app-add-video--dialog',
  templateUrl: 'add-video-dialog.html'
})

export class AddVideoComponent {
  public model: any = {};
  clicked = false;
  public Videos;
  loaded = false;
  id;
  isActive = false;
  // input: any = {};
  // video_url : any = {};
  video_title = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_. -,]+?')]);
  video_url = new FormControl('', [
    Validators.required,
  ]);

  video_isPrivate = new FormControl('', [
    Validators.required,
  ]);

  chapter = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]+?')]);
  private input: FormData;
  private course_video: string;
  private video_minutes: string;
  private video_size: string;

  constructor(private obj: CoursevideoService,
              public dialogRef: MatDialogRef<AddVideoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient , public https: Http) {
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    // this.input = target.files[0].name.toString();
  }


  onSubmit(f: NgForm) {

    alert(this.input);
    // console.log('form Submit call');
    this.http.post(
      'https://storage.cramfrenzy.com/final_upload.php',
      this.input, { responseType: 'json' }).subscribe(data => {

      if (data === 'Sorry, not a valid video.') {
      }
      else {
        // this.model.video_url = data;
        this.ifImageUpload(data);

      }

          });
  }
  public ifImageUpload(data) {
    this.obj.upload_video(data.video_title, data.video_url, data.video_minutes, data.video_size,  this.data.course).subscribe(
      res => {
        this.dialogRef.close(res);
        // this.dialogRef.close(data[0]['json'].json());
        this.videoSuccess();
      },
      error => {
        AddVideoComponent.videoError();
      }
    );
  }



   videoSuccess() {
    swal({
      type: 'success',
      title: 'Success <br> New Video added!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static videoError() {
    swal({
      type: 'error',
      title: 'Oops! <br> Failed to add Video!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
}
@Component({
  selector: 'app-intro-video--dialog',
  templateUrl: 'intro-video-dialog.html',
  // styleUrls: ['../events/intro-event.component.css']
})
export class IntroVideoComponent {
  public model: any = {};
  clicked = false;
  public Videos;
  loaded = false;
  isActive = false;
  data;
  id;
  video_title = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_. -,]+?')]);
  video_url = new FormControl('', [
    Validators.required,
  ]);

  // video_minutes = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[0-9.: -]+?')]);
  
  // video_size = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[a-zA-Z0-9.: -,_]+?')]);

  video_isPrivate = new FormControl('', [
    Validators.required,
  ]);

  chapter = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]+?')]);
  private input: FormData;

  constructor(private obj: CoursevideoService,
              public dialogRef: MatDialogRef<AddVideoComponent>,
              @Inject(MAT_DIALOG_DATA) public course: any,
              private http: HttpClient , private route: ActivatedRoute,
              private video: CoursevideoService) {
    // alert(course.id)
  }
sub;
getcoursevid;

ngOnInit() {
  this.sub = this.route.queryParams.subscribe(params => {
    this.id = +params['id'];
  });
  

}
getcousredeta(){
  this.video.getcoursevideo(this.id).subscribe(data => {
    this.getcoursevid = data;
  });
  }
  onNoClick(): void {
    this.dialogRef.close(1);
  }
  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }
  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    // alert(target.files[0].name.toString());
    // this.model.video_title = target.files[0].name.toString();
  }
  onSubmit(f: NgForm) {
    // console.log('form Submit call');
    this.http.post(
      'https://storage.cramfrenzy.com/final_upload.php',
      this.input, { responseType: 'json' }).subscribe(data => {
      // this.course_video = data;
      // alert(data);
      // console.log(data);
      this.ifImageUpload(data);
    });
  }
  private ifImageUpload(data) {
    this.obj.intro_video( data.video_title, data.video_url, data.video_minutes, data.video_size,this.id).subscribe(
      data => {
        if(data.message=="Video Already Exists."){
          swal({
            type: 'error',
            title: 'Oops! <br> Video Already Exists.',
            showConfirmButton: false,
            width: '512px',
            timer: 2500
          })
        }else{
          this.dialogRef.close(data);
          this.videoSuccess();
          this.getcousredeta();
        }
 
      },
      error => {
        this.videoError();
      }
    );
    this.getcousredeta();
  }
  // submit() {
  //   const uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];
  //   console.log('file tarining   ', uploadFile);
  //   const myUploadItem = new MyUploadItem(uploadFile);
  //   myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file
  //
  //   this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
  //     // success callback
  //   };
  //   this.uploaderService.onErrorUpload = (item, response, status, headers) => {
  //     // error callback
  //   };
  //   this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
  //     // complete callback, called regardless of success or failure
  //   };
  //
  //   this.uploaderService.onProgressUpload = (item, percentComplete) => {
  //     // progress callback
  //   };
  //
  //   this.uploaderService.upload(myUploadItem);
  //
  // }

    save($event){}
  public videoSuccess() {
    swal({
      type: 'success',
      title: 'Success <br> New Video added!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  public videoError() {
    swal({
      type: 'error',
      title: 'Oops! <br> Failed to add Video!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
