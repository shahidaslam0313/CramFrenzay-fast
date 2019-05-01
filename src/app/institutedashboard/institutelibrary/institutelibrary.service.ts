import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class InstitutelibraryService {
  username;
  currentuser;
  current;
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object, private _nav: Router) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }
  scholarship() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'scholarships/userscholarships/' + this.current.user_id + '/', { headers: headers }).map((response: Response) => response.json());
  }
  events() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'scholarships/userevents/' + this.current.user_id + '/', { headers: headers }).map((response: Response) => response.json());
  }
  delscholarship(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'scholarships/deletescholarship/' + id + '/', { headers: headers }).map((response: Response) => response.json());
  }
  delevent(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'scholarships/deleteevent/' + id + '/', { headers: headers }).map((response: Response) => response.json());
  }

}
