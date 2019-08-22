import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ChangePasswordService } from './change-password.service';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import 'rxjs/operators';
import { UserprofileService } from '../userprofile/userprofile.service';
import { isPlatformBrowser } from '@angular/common';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PasswordValidation } from './password-validator.component';

export class errorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
declare interface User {
  text?: string; // required, must be 5-8 characters
  email?: string; // required, must be valid email format
  newPassword?: string; // required, value must be equal to confirm password.
  newPassword2?: string; // required, value must be equal to password.
  number?: number; // required, value must be equal to password.
  url?: string;
  idSource?: string;
  idDestination?: string;
  optionsCheckboxes?: boolean;

  // firstname?: string;

}


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public username;
  public currentPassword ;
  public newPassword ;
  newPassword2 ;
  hide = true;
  hide2 = true;
  hide3 = true;
  current;
  role;
  private productsSource;
  currentProducts;
  public firstname;
  public lastname;
  profilePhoto;
  changepass: FormGroup;
  normalPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[\/\\\!\"#$%&()*+,£^.:;=?\\\\[\\]\\-\'<>~|@_{}]).{8,}$';
  constructor(private pass: ChangePasswordService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, public userprofile: UserprofileService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }
  public isInvalid: boolean = false;
  public onChange(event: any): void {
    this.isInvalid = this.currentPassword == this.newPassword
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

    this.firstname = localStorage.getItem('fname');
    this.lastname = localStorage.getItem('lname');
    this.profilePhoto = localStorage.getItem('pic');
    this.changepass = this.fb.group({
      'currentPassword': ['', Validators.compose([Validators.required, Validators.pattern(this.normalPattern)])],
      'newPassword': ['', Validators.compose([Validators.required, Validators.pattern(this.normalPattern)])],
      'newPassword2': ['', Validators.compose([Validators.required, Validators.pattern(this.normalPattern)])],
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );

    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('currentUser');
    }
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('role');
    }
  }
  editclick(currentPassword, newPassword, newPassword2) {
   
      if(this.changepass.controls.currentPassword.value != null && this.changepass.controls.newPassword.value!=null && this.changepass.controls.newPassword2.value!=null){
        if(this.changepass.controls.currentPassword.valid && this.changepass.controls.newPassword.valid && this.changepass.controls.newPassword2 ){
        this.pass.changepaassword(this.currentPassword, this.newPassword, this.newPassword2)
        .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Successfully Changed Password',
            showConfirmButton: false,
            timer: 1500
          });},
          error=>{
            if(error.status===400){
              swal({
                type: 'error',
                title: 'Incorrect Current Password',
                showConfirmButton: false,
                timer: 1500
              });
            }
            else if(error.status===404){
              swal({
                type: 'error',
                title: 'Password Not Match',
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
        );
      }
      else{
        swal({
          type: 'error',
          title: 'Please fill form correctly',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } 
    else {
      swal({
        type: 'error',
        title: 'Please fill in all the fields',
        // title: 'Please fill all fields',
        showConfirmButton: false,
        timer: 1500
      });
    }
  
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
  institute(){
    if(isPlatformBrowser(this.platformId)){
      if(localStorage.getItem('role') == "I"){
        return true;
      }
      else if(this.role == "A" || this.role == "U" || this.role == "T") {
        return false;
      }
    }
  }
  admin(){
    if(isPlatformBrowser(this.platformId)){
      if(localStorage.getItem('role') == "A"){
        return true;
      }
      else if(this.role == "I" || this.role == "U" || this.role == "T") {
        return false;
      }
    }
  }
}
