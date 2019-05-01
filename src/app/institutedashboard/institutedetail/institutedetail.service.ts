import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class InstitutedetailService {
  username;
  currentuser;
  current;
  constructor(private http: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }

  institute() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'user/Institutedetails/' + this.current.user_id + '/', { headers: headers }).map((response: Response) => response.json());
  }
  userinfo(model) {

    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'user/Institutedetails/' + this.current.user_id + '/',
      JSON.stringify({
        'name' : model.name,
        'location' : model.location,
        'email': model.email,
        'contact' : model.contact,
       'address' : model.address,
      }), { headers: headers }).map((response: Response) => response.json());

  }
}
