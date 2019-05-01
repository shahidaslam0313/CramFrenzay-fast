import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AddeventsService {
  username;
  currentuser;
  current;
  constructor(private http: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }
  events(model){

    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'scholarships/addevent',
      JSON.stringify({
        user: this.current.user_id,
        name : model.name,
        time : model.time,
        eventdate : model.eventdate,
        due_date : model.due_date,
        description : model.description,
        purpose : model.purpose,
        url : model.url,
        status : model.status,



      }),{headers: headers}).map((response : Response) =>response.json());
  }
}
