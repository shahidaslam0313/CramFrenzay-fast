import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { uploadcardservice } from "./uploadcard.service";
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import { GlobalService } from '../../global.service';


declare const $: any;

@Component({
  selector: 'app-uploadcard',
  templateUrl: './uploadcard.component.html',
  styleUrls: ['./uploadcard.component.scss']
})
export class UploadcardComponent implements OnInit {
  input;
  names: any = [];
  model: any = {};
  sell_status: boolean = true;
  visibility: boolean = false;
  public firstname;
  role;
  id;
  public Imageurl = Config.Imageurleach;
  public lastname;
  bid_status : boolean = true;
  isreserved : boolean = false;
  profilePhoto;
  private productsSource;
  currentProducts;
  flashcard_image;
  sub_category_name;
  fcdetail: FormGroup;
  url: any = 'JPG,GIF,PNG';
  date = new Date().toString();
  image;
  addEvent;
  events;
  name;
  accept_offer: boolean = true;
  sell_days;
  end_time;
  public min_amount;
  public max_amount;
  public isInvalid: boolean = false;
  public onChange2(event: any): void {
    this.isInvalid = this.min_amount == this.max_amount || this.min_amount > this.max_amount;
  }
  public initial_amount;
  public reservedprice;
  public Invalid: boolean = false;
  public onChange3(event: any): void {
    this.Invalid = this.initial_amount == this.reservedprice || this.initial_amount > this.reservedprice;
  }
  check2($event) {

  }
  range = [
    {value: '3', viewValue: '3'},
    {value: '5', viewValue: '5'},
    {value: '7', viewValue: '7'},
    {value: '15', viewValue: '15'},
  ];
  check($event) { }
  ranges = [
    {value: '10', viewValue: '10'},
    {value: '15', viewValue: '15'},
    {value: '21', viewValue: '21'},
    {value: '30', viewValue: '30'},
    {value: '60', viewValue: '60'}
  ];
  LoginForm: FormGroup;
  categoryFormControl = new FormControl('', [
    Validators.required,
  ]);
  subcategoryFormControl = new FormControl('', [
    Validators.required,
  ]);
  nestedcategoryFormControl = new FormControl('', [
    Validators.required,
  ]);
  flashcard= new FormControl('',[
    Validators.required
  ])
  constructor(private globalimage : GlobalService, private newcard: uploadcardservice, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();

    }
  }


  ngOnInit() {
    this.firstname = localStorage.getItem('fname');
    this.lastname = localStorage.getItem('lname');
    this.profilePhoto = localStorage.getItem('pic');
this.getindcardname();
    this.courses();
    this.fcdetail = this.fb.group({
      // 'name' : [''],
      'title': [''],
      'definition': [''],
      'image': [''],
      'flashcard': ['']
    });
    // this.Showcards();
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
    $('#showhide6').click(function() {
      $('#showdiv6').toggle();
    });
  }
  result;
  subcategorys(Cid) {

    this.newcard.Catwisenotes(Cid).subscribe(data => {
      this.result = data;
    });
  }
  nestedresult;
  nestedcategorys(Cid) {

    this.newcard.nestedwisenotes(Cid).subscribe(data => {
      this.nestedresult = data;
    });
  }
  files;
  file;
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
  _handleReaderLoaded(readerEvt) {
    console.log('base64');
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    // console.log(this.base64textString);
  }
  ImgSrc;
  base64textString;
  // onSubmit(f: NgForm) {
  //   this.http.post(
  //     Config.Imageurlupload,
  //     this.input, { responseType: 'text' }).subscribe(data => {
  //       if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
  //         this.CourseFailure();
  //       }
  //       else {


  //         this.model.flashcard_image = data;
  //         this.ifImageUpload2(f);
  //         this.CourseSuccess();
  //       }
  //     });
  // }
   ifImageUpload2(f: NgForm) {
    console.log(this.sell_days);
    var date = moment(new Date,'YYYY-MM-DD');
    var new_date = moment(date).add(this.sell_days,'days');
    var bid_date = moment(date).add(this.end_time,'days');
      this.newcard.uploadcard(this.model.name,this.fileName.image,this.model ,this.sell_status, this.accept_offer , new_date,  bid_date, date , this.min_amount, this.max_amount, this.initial_amount,this.reservedprice, this.bid_status)
      
      .subscribe(Res => { });
      this.CourseSuccess();
    f.resetForm();
    }
  // onSubmited(form: NgForm) {
  //   this.http.post(
  //     Config.Imageurlupload,
  //     this.input, { responseType: 'text' }).subscribe(data => {
  //     if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
  //       this.CourseFailure();
  //     }
  //     else {
  //          this.model.image = data;
  //       this.detailpost(form);
  //       this.CourseSuccess();
  //     }
  //   });
    
  // }
  detailpost(form: NgForm){
    this.newcard.carddetail(this.model,this.model.title, this.fileName.image).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Flash Card Detail Added !.',
        width: '512px'
      });
});
form.resetForm()
  }

  sweetalertupload() {
    swal({
      text: 'Flash Card added !',
      title: "CramFrenzy",
      type: "success",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55",
      timer: 4000,
      confirmButtonText: "OK",

    })
  }
  filetoup: FileList;
  fileName;
  handleFileInput2(files: FileList) {
  
    // alert(files);
    this. filetoup = files;
    console.log('uploaded filetoup  ', this.filetoup);
    // alert(this.filetoup[0].name)
  this.fileName=  this.filetoup[0].name;
  console.log('File Name is:' ,this.fileName);
  // alert(this.filetoup);

  this.globalimage.PostImage(this.filetoup,this.model.title  ).subscribe(
    data => {
      // alert(data)
    this.fileName = data;
  //  alert(this.fileName.image)
  
    },
    error => {
      // console.log(error);
    });
  // this.uploadItemsToActivity();
  }
  handleFileInput(files: FileList) {
  
    // alert(files);
    this. filetoup = files;
    console.log('uploaded filetoup  ', this.filetoup);
    // alert(this.filetoup[0].name)
  this.fileName=  this.filetoup[0].name;
  console.log('File Name is:' ,this.fileName);
  // alert(this.filetoup);

  this.globalimage.PostImage(this.filetoup,this.model.name  ).subscribe(
    data => {
      // alert(data)
    this.fileName = data;
  //  alert(this.fileName.image)
  
    },
    error => {
      // console.log(error);
    });
  // this.uploadItemsToActivity();
  }
  CourseSuccess() {
    swal({
      type: 'success',
      title: 'Your Flash Card has been successfully added. It will be listed for sale upon approval.',
      width: '512px'
    });
  }

  CourseFailure() {
    swal({
      type: 'error',
      title: 'Upload Image',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    });
  }

  c_name;
  courses() {
    this.newcard.CoursesonHeader().subscribe(response => {
      this.c_name = response;
    });
  }

  getindcardname() {
    this.newcard.titleget().subscribe(data => {
      this.names = data;
      console.log(this.names);
    });
  }

  // onSubmitdetail() {
  //
  //   this.firstname = localStorage.getItem('fname');
  //   this.lastname = localStorage.getItem('lname');
  //   this.profilePhoto = localStorage.getItem('pic');
  //   this.http.post(
  //     Config.Imageurlupload,
  //     this.input, { responseType: 'text' }).subscribe(data => {
  //       if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
  //
  //         this.CourseFailure();
  //       }
  //       else {
  //
  //         this.CourseSuccess();
  //       }
  //       this.image = data;
  //       this.ifImageUpload();
  //
  //     }
  //   );
  // }
  // private ifImageUpload() {
  //   this.newcard.uploading(this.fcdetail.value, )
  //     .subscribe(Res => { });
  // }
  // CourseSuccess2() {
  //   swal.fire({
  //     type: 'success',
  //     title: 'FlashCard Detail Added Successfully! <br> Request is sent to admin you will be notified after approval.',
  //     width: '512px'
  //   })
  // }
  //
  // CourseFailure2() {
  //   swal.fire({
  //     type: 'error',
  //     title: 'Oops! <br>Failed to add FlashCard Detail. Inccorrect Information!',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
  // Showcards() {
  //   this.newcard.mycards().subscribe(data => {
  //     this.name = data;
  //   });
  // }

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
