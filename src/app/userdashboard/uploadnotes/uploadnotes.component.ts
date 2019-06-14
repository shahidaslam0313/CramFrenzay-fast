import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, NgForm, Validators, NgModel } from '@angular/forms';
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
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../global.service';

declare const $: any;
@Component({
  selector: 'app-uploadnotes',
  templateUrl: './uploadnotes.component.html',
  styleUrls: ['./uploadnotes.component.scss']
})
export class UploadnotesComponent implements OnInit {
  uploadedImage;
  imagePreview: string | ArrayBuffer;
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
  public id: any;
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
  filetoup: FileList;
  fileName = '';
  notesTypes: FormGroup;
  uploadnotesservice: any;
  accept_offer: boolean = false;
  private sub: Subscription;
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
  select(val) {
    this.default = val;
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
    'Lecture Note', 'Textbook Note', 'Exam Note'
  ];
  examkind = [
    'Quiz', 'Mid Term', 'Final'
  ];
  chapters = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
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
  name = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(60),
    Validators.minLength(2)
  ]);
  detail = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(300),
    Validators.minLength(50)
  ]);
  notessubcategoriesFormControl = new FormControl('', [
    Validators.required
  ])
  subcategoryFormControl = new FormControl('', [
    Validators.required
  ])
  nestedcategoryFormControl = new FormControl('', [
    Validators.required
  ])
  authornameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(64),
    Validators.minLength(2)
  ]);
  constructor( private globalimage : GlobalService, private newService: uploadnotesservice, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }

  }

  ngOnInit() {
    window.scroll(0, 0);
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
    $('#showhide6').click(function () {
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
  handleFileInput(files: FileList) {
    this. filetoup = files;
    console.log('uploaded filetoup  ', this.filetoup);
  
  this.fileName=  this.filetoup[0].name;
  console.log('File Name is:' ,this.fileName);
  this.uploadItemsToActivity();
  }
  
  uploadItemsToActivity() {
    console.log('I am in 1 Component');
    this.globalimage.PostImage(this.filetoup,this.model.name  ).subscribe(
      data => {
        alert(data)
        // this.Profile.UserDetailsUpdatePic(localStorage.getItem('UserID') ,this.fileName).subscribe();
        // console.log('Successs')
      },
      error => {
        console.log(error);
      });
  
  }
  // onSubmit(f: NgForm) {

  //   this.http.post(
  //     Config.Imageurlupload, this.input, { responseType: 'text' }).subscribe(data => {
  //       if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.,.") {
  //         this.sweetalertupload();
  //       }
  //       else {
  //         this.model.notes_thumbnail = data;
  //         console.log(this.model.notes_thumbnail);
         
  //         this.ifImageUpload(this.sell_days, f);

  //       }
  //     });
  // }

  sell_days;

  subcategory;
  nestedcategory;
   ifImageUpload( f: NgForm) {
    console.log(this.sell_days);
    var date = moment(new Date, "YYYY-MM-DD");
    var new_date = moment(date).add(this.sell_days, 'days');
    // var date = moment(new Date,' YYYY-MM-DD ');
    var bid_date = moment(date).add(this.end_time, 'days');
    this.newService.uploading(this.model, this.model.notessubcategories, this.model.subcategory, this.model.nestedcategory, this.sell_status, this.accept_offer, new_date, this.fileName, bid_date, this.bid_status, this.min_amount, this.max_amount, this.initial_amount, this.reservedprice)
      .subscribe(Res => {
      });
      this.uploadfiles();
    this.CourseSuccess();
    f.resetForm()
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
      title: 'Upload Image',
      showConfirmButton: false,
      width: '512px',
      timer: 4500
    })
  }


  ImgSrc;
  onChange(event) {
    this.input = new FormData();

    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', event.target.files[0]);
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

    // let image = event.target.files[0];

    // this.ng2ImgMax.resizeImage(image, 200, 150).subscribe(
    //   result => {
    //     this.uploadedImage = result; 
    //     this.getImagePreview(this.uploadedImage);
    //     console.log(result,'RESULT')
    //     const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    //     const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    //     this.input.append('fileToUpload', this.uploadedImage );
    //     this.files = target.files;
    //     this.file = this.files[0];
    //     console.log(this.files);
    //   },
    //   error => {
    //     console.log('😢 Oh no!', error);
    //   }
    // );
    // file;
  }
  // onImageChange(event) {
  //   let image = event.target.files[0];

  //   this.ng2ImgMax.resizeImage(image, 238, 170).subscribe(
  //     result => {
  //       this.uploadedImage = result;
  //       this.getImagePreview(this.uploadedImage);
  //       console.log(result,'RESULT')
  //     },
  //     error => {
  //       console.log('😢 Oh no!', error);
  //     }
  //   );
  //   }

  // getImagePreview(file: File) {
  //   const reader: FileReader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //   };
  // }
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
  onsubmitt(f: NgModel) {
    // alert(this.model);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.newService.uploadNotesType(this.model.note, this.model.notestype, this.model.examNote, this.model.lectureNumber, this.model.chapter)
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
  // checkamount(min_amount,max_amount){
  // if(min_amount == max_amount){
  //   swal({
  //     text: 'Min amount',
  //     title: "CramFrenzy",
  //     type: "error",
  //     showConfirmButton: false,
  //     confirmButtonColor: "#DD6B55",
  //     timer: 4500,
  //     confirmButtonText: "OK",
  //   });
  // }
  // }

}

