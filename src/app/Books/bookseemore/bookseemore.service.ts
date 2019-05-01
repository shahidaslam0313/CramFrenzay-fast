import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class BookseemoreService {
  username;
  currentuser;
  token;
  currentUser;
  current;
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
    }
  }
  Bidbuybooks(page) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/bidbooks/?page=' + page + '', { headers: headers }).map((response: Response) => response.json());
    }
    else {
      return this.http.get(Config.api + 'book/bidbooks/?page=' + page + '', ).map((response: Response) => response.json());
    }
  }
  TrendingNotes(page) {
    if (localStorage.getItem('currentUser')) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'book/getbooklist/?page=' + page + '', { headers: headers }).map((response: Response) => response.json());
  }
  else {
    return this.http.get(Config.api + 'book/getbooklist/?page=' + page + '', ).map((response: Response) => response.json());
  }
  }

  TopratedNotes(page) {
    if (localStorage.getItem('currentUser')) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'book/getbooklist/?page=' + page + '/', { headers: headers }).map((response: Response) => response.json());
  }
  else {
    return this.http.get(Config.api + 'book/getbooklist/?page=' + page + '/', ).map((response: Response) => response.json());
  }
  }
  Recentnotes() {
    if (localStorage.getItem('currentUser')) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'book/recentbooks/', { headers: headers }).map((response: Response) => response.json());
  }
  else {
    return this.http.get(Config.api + 'book/recentbooks/', ).map((response: Response) => response.json());
  }
  }

  ////////////bid on books///////
  bidoncourses(book, bidamount) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'bid/BidUserBook/',
      JSON.stringify({
        book: book,
        bidamount: bidamount

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
