import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { SignupService } from './signup.service';
import { ErrorStateMatcher, MatStepper } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
// import { RecaptchaComponent } from 'recaptcha-blackgeeks';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { RecapchaService } from '../recapcha/recapcha.service';
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
  password?: string; // required, value must be equal to confirm password.
  confirmPassword?: string; // required, value must be equal to password.
  number?: number; // required, value must be equal to password.
  url?: string;
  idSource?: string;
  idDestination?: string;
  optionsCheckboxes?: boolean;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;

  public typeValidation: User;
  register: FormGroup;
  emailonly = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  usernameOnly = '[a-zA-Z0-9_.]+';

  captcharesponse;
  firstname;
  lastname;
  contact;
  username;
  password;
  password2;
  hide = true;
  hide2 = true;
  institute: FormGroup;
  private next: any;
  model: any = {};
  public usernameResponse;
  public usernamestatus = false;
  public emailResponse;
  public emailstatus = false;
  private productsSource;
  currentProducts;
  status;
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);
  firstnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.firstname),
    Validators.maxLength(50)
  ]);
  lastnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.lastname),
    Validators.maxLength(50)
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email),
    Validators.maxLength(100)
  ]);
  contactFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.contact),
    Validators.maxLength(25)
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.password),
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);

  passwordFormControl2 = new FormControl('', [
    Validators.required,
    Validators.pattern(this.password),
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);

  flag = true;
  date = new FormControl(new Date());
  public signupnow: number = 0;
  emailexist: boolean = false;
  agree: boolean = false;
  disabledAgreement: boolean = true;
  changeCheck(event){
    this.disabledAgreement = !event.checked;
  }


  constructor(private recha: RecapchaService, private _serv: SignupService, public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();

    }
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

  onRegister() {
    if (this.recha.check()) {
      if (this.register.valid) {
        this._serv.signUp(this.register.value['firstname'] , this.register.value['lastname'], this.register.value['username'], this.register.value['email'], this.register.value['password']).subscribe(Res => {
          swal({
            text: 'Please check your email!',
            title: "CramFrenzy!",
            type: "success",
            showConfirmButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK",
            width: '512px',
            timer: 4500

          })
          if (Res.status == true) {
            this.router.navigate(['/login'])
          }
        });
        error => {
          swal({
            type: 'error',
            title: 'Oops! <br> Plz fill form',
            showConfirmButton: false,
            width: '512px',
            timer: 2500
          })
        }
      } else {
        this.validateAllFormFields(this.register);
        swal({
          type: 'error',
          title: 'Oops! <br> Plz fill form Correctly',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
      }
    }
    else {
      this.recha.resetImg();
      swal({
        type: 'error',
        title: 'Please Enter a valid text!',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      })
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

  ngOnInit() {

    // this.recha.resetImg();

    this.register = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
      firstname: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailonly)])],
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      // optionsCheckboxes: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });

    this.institute = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
      name: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
      location: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
      address: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],
      contact: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly)])],

      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailonly)])],

      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    },

      {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  public resolved(captchaResponse: string) {
    this.captcharesponse = captchaResponse;
  }

  sweetalertsignup() {
    swal({
      text: 'Register Successflluy!',
      title: "CramFrenzy",
      type: "success",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "OK",
      width: '512px',
      timer: 2500

    })

    this.router.navigate(['login'])
    {
    };
  }



  getusername(uname) {
    if (uname !== '') {
      this._serv.username_verify(uname).subscribe(Response => {
        this.usernameResponse = Response;
        this.usernamestatus = this.usernameResponse.status;
        if (this.usernamestatus === false) {
          this.usernameVerificationError();
        }
      },
        error => {
          this.usernameResponse = true;
        });
    }
  }



  institutecheck() {

    if (this.check_signup() == true) {
      this.router.navigate(['/mainpage']);
    }
    else if (this.check_signup() == false) {
      // this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  check_signup() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('institute')) {
        let local = localStorage.getItem('institute');
        return true;
      }
      else {
        return false;
      }
    }

  }



  instituteRegister() {
    // if (this.captcha.getResponse()) {
    if (this.institute.valid) {
      this._serv.instituteregister(this.institute.value['username'], this.institute.value['name'], this.institute.value['location'], this.institute.value['address'], this.institute.value['contact'], this.institute.value['email'], this.institute.value['password'], ).subscribe(Res => {
        swal({
          text: 'Please check your email!',
          title: "CramFrenzy",
          type: "success",
          showConfirmButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "OK",
          width: '512px',
          timer: 4500

        });
        if (Res.status == true) {
          this.router.navigate(['login'])
        }
        {
        };
      });
      error => {
        swal({
          type: 'error',
          title: 'Oops! <br> Plz fill form',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
      }
    } else {
      swal({
        type: 'error',
        title: 'Oops! <br> Plz fill form Correctly',
        showConfirmButton: false,
        width: '512px',
        timer: 2500
      })
      this.validateAllFormFields(this.register);
    }
    // }
    // else {
    //   swal.fire({
    //     type: 'error',
    //     title: 'Please confirm you are not a robot!',
    //     showConfirmButton: false,
    //     width: '512px',
    //     timer: 2000
    //   })
    // }
  }

  getemail(email) {
    if (email !== '') {
      this._serv.check_email_unique(email).subscribe(Response => {
        this.emailResponse = Response;
        this.emailstatus = this.emailResponse.status;
        if (this.emailstatus == false) {
          this.emailVerificationError();
        }
      },
        error => {
          this.emailstatus = false;
        }
      );
    }
  }

  emailVerificationError() {
    swal({
      type: 'error',
      title: 'Oops! <br> Email alreday registered',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  usernameVerificationError() {
    swal({
      type: 'error',
      title: 'Oops! <br> User name already exists!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
}
