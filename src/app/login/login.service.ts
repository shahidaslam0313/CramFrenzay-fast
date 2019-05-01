import { Config } from './../Config';
import { TutorsearchService } from './../Tutors/tutorsearch/tutorsearch.service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { isPlatformBrowser } from '@angular/common';
import * as JWT from 'jwt-decode';

@Injectable()
export class LoginService {
  result: any;
  public token: string;
  user_id;
  private productsSource;
  currentProducts;
  currentUser;
  current;
  constructor(private http: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    // if (isPlatformBrowser(this.platformId)) {
    //   this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    //   this.currentProducts = this.productsSource.asObservable();
    //   this.current = JSON.parse(localStorage.getItem('currentUser'));
    //   this.token = this.current && this.current.token;
    //   console.log(this.token);
    // }
  }
  resolved(captchaResponse: string) {

  }

  login_authentication(username, password): Observable<any> {
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.post(Config.api + 'user/authentication', JSON.stringify(
      {
        'username': username,
        'password': password
      }), { headers: headers }).map
      ((res: Response) => res.json());
  }

  user;
  decoded;
  login_token_decode(username, password): Observable<any> {
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.post(Config.api + 'user/api-token-auth/', JSON.stringify(
      {
        'username': username,
        'password': password
      }), { headers: headers }).map
      ((res: Response) => {
        let decoded = JWT(res.json().token);
        let user = { username: decoded.username, token: res.json().token, user_id: decoded.user_id };
        if (user && user.token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(user));


          }
        }
      });
  }
  forgotpaassword(Email) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(Config.api + 'user/forgotpassword/', JSON.stringify({
      'email': Email,
    }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
