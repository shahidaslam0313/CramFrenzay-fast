import { Component, Inject, PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map'
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config } from '../../Config';
import swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { RecapchaComponent } from '../../recapcha/recapcha.component';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;

  name;
  subject;
  message;
  phone;
  private next: any;
  model: any = {};
  private productsSource;
  currentProducts;
  flag = true;
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  date = new FormControl(new Date());
  contactform = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
    subject: new FormControl('', [
      Validators.required
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
      Validators.minLength(30),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),

    // nameFormControl = new FormControl('', [
    //   Validators.required,
    //   Validators.maxLength(64),
    //   Validators.minLength(2),
    //   Validators.pattern(NAME_REGEX),
    // ]);
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.email),
      Validators.maxLength(100)
    ]),
  })

  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }
  ngOnInit() {

  }
  signupuserdata(f:NgForm) {
    if (this.contactform.controls.name.valid && this.contactform.controls.email.valid &&
      this.contactform.controls.phone.valid && this.contactform.controls.subject.valid) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'user/contactus/', this.model, { headers: headers }).subscribe(Res => { });
      swal({
        type: 'success',
        title: 'Send To Admin',
        showConfirmButton: false,
        timer: 1500,
      })
      f.resetForm()
    }
    else{
      swal({
        type: 'error',
        title: 'Please enter correct details',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  
  }
}
