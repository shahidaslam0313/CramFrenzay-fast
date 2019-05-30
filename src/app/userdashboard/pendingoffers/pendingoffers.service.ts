import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PendingoffersService {

  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }
  userpendingoffer() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://192.168.30.8:8000/purchase/owner_history/' , {headers: headers}).map((response: Response) => response.json());
    }
  }
  approvecourse(id){
    let headers = new Headers( {'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    headers.append('Content-Type', 'application/json');
    return this.http.put( 'http://192.168.30.8:8000/purchase/offer_accept_owner/' ,
      JSON.stringify({
        offer_accepted : true,
        id : id,
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
  rejectcourse(id){
    let headers = new Headers( {'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    headers.append('Content-Type', 'application/json');
    return this.http.put( 'http://192.168.30.8:8000/purchase/offer_accept_owner/' ,
      JSON.stringify({
        offer_accepted : false,
        id : id,
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
}
