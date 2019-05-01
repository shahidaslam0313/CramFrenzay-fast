import { Injectable } from '@angular/core';
import {Inject,PLATFORM_ID} from '@angular/core';
import {Headers,Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from "../../Config";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class BiditemsService {
  username;
  currentuser;
  current;
  constructor( private htpp:Http,  @Inject(PLATFORM_ID) private platformId: Object, private _nav: Router) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }
bidingitems(){
    let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.htpp.get(Config.api +'bid/userbidcourses/' + this.current.user_id , {headers : headers}).map((response:Response)=> response.json());
}
}
