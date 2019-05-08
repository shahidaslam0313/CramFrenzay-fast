import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { uploadnotesservice } from "./uploadnotes.service";
import { Router } from "@angular/router";

import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import swal from "sweetalert2";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// declare var localStorage: any;
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
declare const $: any;
@Component({
  selector: 'app-uploadnotes',
  templateUrl: './uploadnotes.component.html',
  styleUrls: ['./uploadnotes.component.scss']
})
export class UploadnotesComponent implements OnInit {
  model: any = {};
  input;
  userid;
  public Imageurl = Config.Imageurleach;

  url: any = 'JPG,GIF,PNG';
  private productsSource;
  currentProducts;
  c_name;
  image;
  file;
  public firstname;
  public lastname;
  notes_thumbnail;
  public id : any;
  profilePhoto;
  result;
  sell_status: boolean = true;
  sell = "true";
  moment;
  files;
  base64textString;
  mydate;
  startprice;
  default;
  notes: FormGroup;
  notesTypes : FormGroup;
  uploadnotesservice: any;
  accept_offer: boolean = false;
  private sub: Subscription;
  select(val){
    this.default=val;
  }
  date = new Date().toString();
  endprice;
  end_time;
  role;
  datafile;
  ranges = [
    { value: '10', viewValue: '10' },
    { value: '15', viewValue: '15' },
    { value: '21', viewValue: '21' },
    { value: '30', viewValue: '30' },
    { value: '60', viewValue: '60' }
  ];
  range = [
    { value: '3', viewValue: '3' },
    { value: '5', viewValue: '5' },
    { value: '7', viewValue: '7' },
    { value: '15', viewValue: '15' },
  ];
  notesType = [
    'Lecture Note','Textbook Note', 'Exam Note'
  ];
  examkind = [
    'Quiz' , 'Mid Term' , 'Final'
  ];
  chapters = [
    '1','2','3','4','5','6','7','8','9','10'
  ]
  onchange($event) {
  }
  check($event) { }
  check1($event) { }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  notesname;
  bid_status: boolean = true;
  // notes_thumbnail;
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);
  authornameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);
  constructor(private newService: uploadnotesservice, private router: Router, private route: ActivatedRoute,
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
    this.notes = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'detail': ['', Validators.compose([Validators.required])],
      'notessubcategories': [''],
      'sell_status': [''],
      'price': [''],
      'sell_days': [''],
      'notes_thumbnail': [''],


    });
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'] || 0;
    });
    this.courses();
    this.notestypess();

    $('#showhide').click(function () {
      $('#showdiv').toggle();
    });

    $('#showhide2').click(function () {
      $('#showdiv2').toggle();
    });

    $('#showhide3').click(function () {
      $('#showdiv3').toggle();
    });

    $('#showhide4').click(function () {
      $('#showdiv4').toggle();
    });
    $('#showhide6').click(function() {
      $('#showdiv6').toggle();
    });
  }
  uploadfiles() {
    this.http.post(Config.uploadfile, this.input, { responseType: 'text' }).subscribe(data => {
      if (data === 'sorry ,  your file was not uploaded') {
        this.CourseFailure();
      }
      else {
        this.datafile = data;
        console.log(this.datafile);
      }
    })
  }
  onSubmit() {

    this.http.post(
      Config.Imageurlupload, this.input, { responseType: 'text' }).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.,.") {
          this.sweetalertupload();
        }
        else {
          this.model.notes_thumbnail = data;
          console.log(this.model.notes_thumbnail);
          this.uploadfiles();
          this.ifImageUpload(this.sell_days);
          this.CourseSuccess();
        }
      });
    // f.resetForm();
  }

  sell_days;
  notessubcategories;

    subcategory;
  nestedcategory;
  ifImageUpload(sell_days) {
    console.log(this.sell_days);
    var date = moment(new Date, "YYYY-MM-DD");
    var new_date = moment(date).add(this.sell_days, 'days');
    // var date = moment(new Date,' YYYY-MM-DD ');
    var bid_date = moment(date).add(this.end_time, 'days');
    console.log(new_date);
    this.newService.uploading(this.model, this.model.notessubcategories, this.model.subcategory , this.model.nestedcategory , this.sell_status, this.accept_offer,  new_date,  bid_date , this.bid_status )
      .subscribe(Res => {
        // this.date = Res
        // console.log(this.date);


      });
  }
  CourseSuccess() {
    swal({
      type: 'success',
      title:
        'Your Note has been successfully added. It will be listed for sale upon approval.',
      width: '512px',
    })
  }

  CourseFailure() {
    swal({
      type: 'error',
      title: 'Oops! <br>Failed to add Note. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 4500
    })
  }


  ImgSrc;
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
  onChange2(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }
  _handleReaderLoaded(readerEvt) {
    console.log('base64');
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    // console.log(this.base64textString);
  }
  sweetalertupload() {
    swal({
      text: 'Upload File Successflluy!',
      title: "CramFrenzy",
      type: "success",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55",
      timer: 4000,
      confirmButtonText: "OK",

    })
  }
  sweetalertuploadnotes() {
    swal({
      text: "Please sign in to access this functionality",
      title: "Authentications Required",
      type: "error",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55", timer: 2000,
      confirmButtonText: "OK",
    });
  }
  courses() {
    this.newService.Coursesonnotes().subscribe(response => {
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
  notestypess() {
    // alert(this.id)
    // alert(this.notesname)
    this.newService.notesTypes(this.id).subscribe(response => {
      this.notesname = response;
    });
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
  checkrole() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('role') == "T" || localStorage.getItem('role') == "A") {
        return true;
      } else if (this.role == "U" || this.role == "I") {
        return false;
      }
    }
  }
  onsubmitt(){
    // alert(this.model);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.newService.uploadNotesType(this.model.note, this.model.notestype, this.model.examNote,  this.model.lectureNumber  ,  this.model.chapter  )
    .subscribe(Res => {
      swal({
        text: 'Notes Added Successfully!',
        title: "CramFrenzy",
        type: "success",
        showConfirmButton: false,
        confirmButtonColor: "#DD6B55",
        timer: 4500,
        confirmButtonText: "OK",

      });
    },
      error => {
        swal({
          text: 'Notes Not Added',
          title: "CramFrenzy",
          type: "error",
          showConfirmButton: false,
          confirmButtonColor: "#DD6B55",
          timer: 4500,
          confirmButtonText: "OK",
        });
      }
    )
    ;
}


  }

