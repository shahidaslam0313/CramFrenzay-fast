import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import swal from "sweetalert2";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserprofileService } from './userprofile.service';
import { Config } from "../../Config";
import { ErrorStateMatcher, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { GlobalService } from '../../global.service';
export class errorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit, OnDestroy {
  public username;
  currentuser;
  input;
  public Imageurl = Config.Imageurleach;
  public profile: any = [];
  user: FormGroup;
  modal: any = {};
  image = {};
  role;
  id;
  firstname;
  lastname;
  profilePhoto;
  Logedin;
  public UserRole: any;
  url: any = 'JPG,GIF,PNG';
  firstnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]+'),
    Validators.maxLength(35)
  ]);

  lastnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]+'),
    Validators.maxLength(35)
  ]);
  constructor(private fb: FormBuilder, public router: Router, @Inject(PLATFORM_ID) private platformId: Object, public userprofile: UserprofileService, private http: HttpClient, public global: GlobalService) {
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem('loged_in');
    }
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('currentUser');
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
    }
    this.global.checkingUserRole$.subscribe(
      data => {
        this.UserRole = data;
        // alert('Geting DAta From Shared Service' + this.UserRole);
      });
  }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  ngOnInit() {
    window.scroll(0,0);
    this.user = this.fb.group({
      // 'image': [''],
      'firstname': [''],
      'lastname': [''],
      'headLine': [''],
      'biography': [''],
      'language': [''],
      'website': [''],
      'Git': [''],
      'youtube': [''],
      'twitter': [''],
      'facebook': [''],
      'linkedIn': [''],


    });
    this.userdatainfo(this.id);

  }
  ngOnDestroy() {

  }
imagePost;
imageGet='https://storage.cramfrenzy.com/images/'
  onSubmit() {
    this.http.post(
      Config.Imageurlupload,
      this.input, { responseType: 'text' }).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
          this.CourseFailure();
        }
        else {
          this.image = data;
          this.imagePost=this.imageGet+data;
          if (this.user.valid) {
            this.userprofile.userinfoimg(this.user.value['headLine'],this.user.value['biography'],this.user.value['language'],this.user.value['website'],this.user.value['Git'],this.user.value['twitter'],this.user.value['facebook'],this.user.value['linkedIn'],this.user.value['youtube'],this.user.value['firstname'],this.user.value['lastname'], this.imagePost).subscribe(Res => {
              console.log(this.modal, this.imagePost);
              swal({
                type: 'success',
                title: 'Profile updated successfuly ',
                showConfirmButton: false,
                timer: 2500
              });
            });
            error => {
              swal({
                type: 'error',
                title: 'Oops <br> Plz fill form',
                showConfirmButton: false,
                width: '512px',
                timer: 2500
              })
            }
          }
        }
        
      });
      // this.userdata();
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
  userdata() {
    if (this.user.valid){
      {
        this.userprofile.userinfo(this.user.value['headLine'],this.user.value['biography'],this.user.value['language'],this.user.value['website'],this.user.value['Git'],this.user.value['twitter'],this.user.value['facebook'],this.user.value['linkedIn'],this.user.value['youtube'],this.user.value['firstname'],this.user.value['lastname']).subscribe(Res => {
          console.log(this.modal, this.imagePost);
          swal({
            type: 'success',
            title: 'Profile updated successfuly ',
            showConfirmButton: false,
            timer: 2500
          });
        });
        error => {
          swal({
            type: 'error',
            title: 'Oops <br> Plz fill form',
            showConfirmButton: false,
            width: '512px',
            timer: 2500
          })
        }
      }
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {

      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  ImgSrc;
  file;
  base64textString;
  files;
  onChange(event: EventTarget) {
    this.input = new FormData();

    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    this.files = target.files;
    this.file = this.files[0];
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
  userdatainfo(id) {
    this.userprofile.getuser(id).subscribe(data => {
      this.profile = data;
      this.firstname = this.profile.firstname;
      this.lastname = this.profile.lastname;
      this.profilePhoto = this.profile.profilePhoto;
      localStorage.setItem('fname', this.firstname);
      localStorage.setItem('lname', this.lastname);
      localStorage.setItem('pic', this.profilePhoto);
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
  institute() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('role') == "I") {
        return true;
      }
      else if (this.role == "A" || this.role == "U" || this.role == "T") {
        return false;
      }
    }
  }
  admin() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('role') == "A") {
        return true;
      }
      else if (this.role == "I" || this.role == "U" || this.role == "T") {
        return false;
      }
    }
  }
}
