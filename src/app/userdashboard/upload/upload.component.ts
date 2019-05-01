import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { uploadservice } from './upload.service';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
declare const $: any;
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  events;
  model: any = {};
  result;
  status: boolean = false;
  bid_status: boolean = true;
  isreserved: boolean = false;
  public currentUser;
  public course_thumbnail: string;
  public Imageurl = Config.Imageurleach;
  private productsSource;
  currentProducts;

  url: any = 'JPG,GIF,PNG';
  public firstname;
  public lastname;
  profilePhoto;
date = new Date().toString();

  Auction = true;
  file: any;
  file1: any;
  // files: File;
  input;
  clicked = false;
  color = 'accent';
  checked = false;
  disabled = false;
  sell_status: boolean = true;
  c_name;
  hide= true;
  isActive= true;
  end_time;
  sell_days;
  response;
role;
  check($event) {}
  ranges = [
    {value: '10', viewValue: '10'},
    {value: '15', viewValue: '15'},
    {value: '21', viewValue: '21'},
    {value: '30', viewValue: '30'},
    {value: '60', viewValue: '60'}
  ];
  range = [
    {value: '3', viewValue: '3'},
    {value: '5', viewValue: '5'},
    {value: '7', viewValue: '7'},
    {value: '15', viewValue: '15'},
  ];
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);
  priceFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);
  subFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);

  constructor(private newService: uploadservice, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();

    }
  }

  ngOnInit() {
    this.firstname = localStorage.getItem('fname');
    this.lastname = localStorage.getItem('lname');
    this.profilePhoto = localStorage.getItem('pic');
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = localStorage.getItem('currentUser')
      this.courses();
    }

    $('#showhide').click(function() {
      $('#showdiv').toggle();
    });
    $('#showhide2').click(function() {
      $('#showdiv2').toggle();
    });

    $('#showhide3').click(function() {
      $('#showdiv3').toggle();
    });

    $('#showhide4').click(function() {
      $('#showdiv4').toggle();
    });

    $('#showhide5').click(function() {
      $('#showdiv5').toggle();
    });
    $('#showhide6').click(function() {
      $('#showdiv6').toggle();
    });
  }

  onSubmit() {

    this.http.post(
      Config.Imageurlupload,
      this.input, { responseType: 'text' }).subscribe(data => {
        if (data === 'Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.') {
          this.CourseFailure();
        }
        else {

          // this.CourseSuccess();
          this.model.course_thumbnail = data;
          this.ifImageUpload();
        }
      });
  }
  accept_offer: boolean = false;
  private ifImageUpload() {
    var currentdate = moment(new Date,' YYYY-MM-DD ');
    var new_date = moment(currentdate).add(this.sell_days,'days');
    // var date = moment(new Date,' YYYY-MM-DD ');
    var bid_date = moment(currentdate).add(this.end_time,'days');
    console.log(new_date, this.sell_status , this.model,  this.bid_status , bid_date);
    this.newService.uploading(new_date, this.sell_status , this.model, this.accept_offer,  this.bid_status , bid_date, currentdate)
      .subscribe(Res => {

        console.log(this.response);
        this.CourseSuccess();
      },
        error => {
          this.CourseFailure();
        }

      );
  }
  reserved() {
    if (this.hide) {
      this.hide = false;
    }
    else {
      this.hide = true;
    }
  }
  courses() {
    this.newService.CoursesonHeader().subscribe(response => {
      this.c_name = response;
    });
  }
  subcategorys(Cid) {

    this.newService.Catwisenotes(Cid).subscribe(data => {
      this.result = data;
    });
  }
  nestedresult;
  nestedcategorys(Cid) {

    this.newService.nestedwisenotes(Cid).subscribe(data => {
      this.nestedresult = data;
    });
  }
  CourseSuccess() {
    swal({
      type: 'success',
      title: 'Course Added ! <br> Request is sent to admin you will be notified after approval.',
      width: '512px'
    });
  }
  onChange(event: EventTarget) {
    this.input = new FormData();

    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    this.files = target.files;
    this.file = this.files[0];
    console.log(this.files);

    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);

    const reader1 = new FileReader();
    reader1.onload = (e: any) => {
      this.ImgSrc = (e.target.result);
    };
    reader1.readAsDataURL(this.file);
  }
  CourseFailure() {
    swal({
      type: 'error',
      title: 'Oops! <br>Failed to add course. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    });
  }
 files;
  ImgSrc;
  base64textString;
  _handleReaderLoaded(readerEvt) {
    console.log('base64');
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    // console.log(this.base64textString);
  }
  check_login() {

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  checkrole(){
    if(isPlatformBrowser(this.platformId)){
      if(localStorage.getItem('role') == "T" || localStorage.getItem('role') == "A" ){
        return true;
      } else if( this.role == "U" || this.role == "I") {
        return false;
      }
    }
  }
}


