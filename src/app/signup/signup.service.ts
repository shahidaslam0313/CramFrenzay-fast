import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../Config';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SignupService {
  result: any;
  username;
  currentuser;
  current;
  constructor(private http: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('institute'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('institute'))
    }
  }

  signUp(firstname , lastname , username, email, Password) {
    return this.http.post(Config.api + 'user/register/',
      {
        'firstname' : firstname,
        'lastname' : lastname,
        'username': username,
        'email': email,
        'password': Password,


      }).map((res: Response) =>
        res.json()
      );
  }

  check_email_unique(email) {
    return this.http.post(Config.api + 'user/emailVer/', {
      'email': email
    }).map((response: Response) => response.json());
  }
  username_verify(username) {
    return this.http.post(Config.api + 'user/usernameVer/', {
      'username': username
    }).map((response: Response) => response.json());
  }

  instituteregister(username,name,location,address,contact,email,password){
    return this.http.post(Config.api + 'user/InstituteRegistration/',{

      'username' : username,
      'name': name,
      'location' :location,
      'address' : address,
      'contact' : contact,
      'email' : email,
      'password':password,



    }).map((res: Response) =>
      res.json()
    );
  }
}
