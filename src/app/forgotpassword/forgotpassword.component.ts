import { ForgotpasswordService } from './forgotpassword.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { FormBuilder, Validators, FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Subscription } from 'rxjs/Subscription';
import { PasswordValidation } from '../signup/password-validator.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  hide = true;
  hide2 = true;
  password;
  public sub: Subscription;
  form = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.password),
        Validators.minLength(8),
        Validators.maxLength(30)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(this.password),
        Validators.minLength(8),
        Validators.maxLength(30)
      ])
    }
  );
  code;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private serv: ForgotpasswordService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.code = params['forgotcode'];
    });

    this.form = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(100)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });

  }
  forgotpassword() {
    if (this.form.value['password'] != "" && this.form.value['password'] != null && this.form.value['confirmPassword'] != "" && this.form.value['confirmPassword'] != null) {
      this.serv.forgot(this.code, this.form.value['password']).subscribe(data => {
        swal({
          type: 'success',
          title: 'Your password is changed',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/login']);
      },
        error => {
          if (error.status == 400) {
            swal({
              type: 'error',
              title: 'Something went wrong',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
    }
    else {
      swal({
        type: 'error',
        title: 'Please fill all required fields',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  showSuccess() {
    swal({
      type: 'success',
      title: 'Welcome to CramFrenzy!<br> You are logged in now',
      showConfirmButton: false,
      width: '512px',
      timer: 4000
    })
  }
}
