import { Component, Inject, PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map'
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config } from '../../Config';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {

  name;
  email;
  subject;
  message;
  phone;
  private next: any;
  model: any = {};
  private productsSource;
  currentProducts;
  flag = true;
  date = new FormControl(new Date());

  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }
  ngOnInit() {

  }
  signupuserdata() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + 'user/contactus/', this.model, { headers: headers }).subscribe(Res => { });
  }
}
