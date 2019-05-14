import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {GlobalService} from '../../global.service';


@Injectable()
export class UserprofileService {
  username;
  currentuser;
  current;
  currentUser;
  token;
  constructor(private http: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object , private global: GlobalService) {

    this.global.tokenGlobal$.subscribe(
      data => {
        this.token = data;
      });
  }
  userinfo(headLine , biography ,language,website ,Git,twitter,facebook ,linkedIn ,youtube, firstname,lastname) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'user/userdetails/' ,
      JSON.stringify({
        
        "headLine": headLine,
        "biography": biography,
        "language": language,
        "website": website,
        "Git": Git,
        "twitter": twitter,
        "facebook": facebook,
        "linkedIn": linkedIn,
        "youtube": youtube,
        "firstname": firstname,
        "lastname": lastname,
      }), { headers: headers }).map((response: Response) => response.json());

  }
  userinfoimg(headLine , biography ,language,website ,Git,twitter,facebook ,linkedIn ,youtube, firstname,lastname, image) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'user/userdetails/' ,
      JSON.stringify({
        "profilePhoto": image,
        "headLine": headLine,
        "biography": biography,
        "language": language,
        "website": website,
        "Git": Git,
        "twitter": twitter,
        "facebook": facebook,
        "linkedIn": linkedIn,
        "youtube": youtube,
        "firstname": firstname,
        "lastname": lastname,
      }), { headers: headers }).map((response: Response) => response.json());

  }
  getuser(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'user/userdetails/' + JSON.parse(localStorage.getItem('currentUser')).user_id + '/', { headers: headers }).map((response: Response) => response.json());
  }
}
