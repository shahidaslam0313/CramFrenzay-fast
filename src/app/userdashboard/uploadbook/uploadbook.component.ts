import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { uploadbookservice } from "./uploadbook.service";
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';

import { GlobalService } from '../../global.service';

declare const $: any;
@Component({
  selector: 'app-uploadbook',
  templateUrl: './uploadbook.component.html',
  styleUrls: ['./uploadbook.component.scss']
})
export class UploadbookComponent implements OnInit {
  filetoup: FileList;
  fileName;
  uploadedImage: File;
  imagePreview: string | ArrayBuffer;
  events;
  model: any = {};
  bid_status: boolean = true;
  public username;

  public input;
  sub_category_name;
  book_image;
  public Imageurl = Config.Imageurleach;
  book_file;
  role;
  accept_offer:boolean = false;
  signupForm: FormGroup;
  sell_status: boolean = true;
  date = new Date().toString();
  currentuser;
  url: any = 'JPG,GIF,PNG';
  public firstname;
  public lastname;
  profilePhoto;
  public min_amount;
  public max_amount;
  public isInvalid: boolean = false;
  public onChange3(event: any): void {
    this.isInvalid = this.min_amount == this.max_amount || this.min_amount > this.max_amount;
  }
  public initial_amount;
  public reservedprice;
  public Invalid: boolean = false;
  public onChange4(event: any): void {
    this.Invalid = this.initial_amount == this.reservedprice || this.initial_amount > this.reservedprice;
  }
  isreserved: boolean = false;
  range = [
    {value: '3', viewValue: '3'},
    {value: '5', viewValue: '5'},
    {value: '7', viewValue: '7'},
    {value: '15', viewValue: '15'},
  ];
  private productsSource;
  currentProducts;
  end_time;
  ranges = [
    {value: '10', viewValue: '10'},
    {value: '15', viewValue: '15'},
    {value: '21', viewValue: '21'},
    {value: '30', viewValue: '30'},
    {value: '60', viewValue: '60'}
  ];
  check($event){}
  isbnFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);
  subcatFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);
  categoriesFormControl = new FormControl('', [
    Validators.required,
  ]);
  subcategoriesFormControl = new FormControl('', [
    Validators.required,
  ]);
  nestedcategoryFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(private globalimage : GlobalService, private newService: uploadbookservice,  private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
    }
  }

  ngOnInit() {
    this.firstname = localStorage.getItem('fname');
    this.lastname = localStorage.getItem('lname');
    this.profilePhoto = localStorage.getItem('pic');

    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
      this.username = localStorage.getItem('currentUser')
    }
    this.courses();

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
uploadfile(){
    this.http.post( Config.uploadfile, this.input ,{ responseType: 'text' }).subscribe( data => {
      if( data === 'sorry '){
        this.CourseFailurepdf();
      }
      else {
        // this.CourseSuccess();
        this.model.book_file = data;
        console.log(this.book_file);
        alert(this.book_file);
      }
    })
}

notpost;

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
      if(error.status == '500')
      this.notpost = error.status;
      {
        swal({
          type: 'error',
          title: 'Book Image is required',
          width: '512px'
        })
      }
      // console.log(error);
    });
  // this.uploadItemsToActivity();
  }
  // onSubmit(f: NgForm) {
  //   this.http.post(
  //     Config.Imageurlupload,
  //     this.input, { responseType: 'text' }).subscribe(data => {
  //       if (data === 'Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.') {
  //         // EditCourseDialogComponent.ImageUploadFailer();
  //         this.CourseFailure();
  //       } else {

  //         this.CourseSuccess();
  //         this.model.book_image = data;

  //         this.ifImageUpload(f);
  //         this.uploadfile();
  //       }
  //     });
  // }
  sell_days;
   ifImageUpload(f: NgForm) {
     if(this.fileName ){
      // this.uploadfile();
    var  date = moment(new Date, 'YYYY-MM-DD');
    var  new_date = moment(date).add(this.sell_days, 'days');
    var bid_date = moment(date).add(this.end_time,'days');
    // alert(this.model.book_file);
 
  this.newService.uploading(this.model.name, this.model.author_name, this.model.book_edition,this.model.price, this.model.ISBN, this.model.book_rent, this.model.book_detail, this.model.categories , this.model.subcategories,this.model.nestedcategory,  this.sell_status, new_date, this.fileName.image, this.bid_status,    this.accept_offer, this.initial_amount, bid_date , this.model.isreserved, this.reservedprice, date,this.min_amount, this.max_amount)
  .subscribe(Res => {
    this.CourseSuccess();
  });
 
  f.resetForm();
}
else{
  swal({
    type: 'error',
    title: 'Book image is required.',
    width: '512px'
  })
}
   }
  CourseSuccess() {
    swal({
      type: 'success',
      title: 'Your Book has been successfully added. It will be listed for sale upon approval.',
      width: '512px'
    })
  }

  CourseFailure() {
    swal({
      type: 'error',
      title: 'Upload Image',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  CourseFailurepdf() {
    swal({
      type: 'error',
      title: 'Upload Image',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
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
  onChange2(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }
  sweetalertupload() {
    swal({
      text: 'Upload Book Successfully!',
      title: "CramFrenzy",
      type: "success",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55",
      timer: 4000,
      confirmButtonText: "OK",

    })
  }
c_name;
  courses() {
    this.newService.CoursesonHeader().subscribe(response => {
      this.c_name = response;
    });
  }


  result;
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
  // uploadedImage: Blob;
  onChange(event: EventTarget) {
    // constructor() {}
    // onImageChange(event) {
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
    // let image = target.files[0];
    
   
    // this.ng2ImgMax.resizeImage(this.file, 50, 50).subscribe(
    //   result => {
    //     this.uploadedImage = new File([result], result.name);
    //     this.getImagePreview(this.uploadedImage);
    //   },
    //   error => {
    //     console.log('😢 Oh no!', error);
    //   }
    // );
    // let image = target.files[0];
    // this.ng2ImgMax.compressImage(image, 0.075).subscribe(
    //   result => {
    //     this.uploadedImage = new File([result], result.name);
    //     this.getImagePreview(this.uploadedImage);
    //   },
    //   error => {
    //     console.log('😢 Oh no!', error);
    //   }
    // );
 
  }
  file;
  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
     
      // const imagePreview: string | ArrayBuffer = reader.result;
       this.imagePreview = reader.result;
    };
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
