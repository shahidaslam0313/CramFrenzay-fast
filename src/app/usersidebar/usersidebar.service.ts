import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../Config';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UsersidebarService {
  username;
  currentuser;
  current;

  constructor(private http: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }
  getuser(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'user/userdetails/' + this.current.user_id + '/', { headers: headers }).map((response: Response) => response.json());
  }
}
