import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from "../../Config";
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Inject,  PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class FcseemoreService {
  current;
  currentUser;
  username;
  currentuser;
  token;
  constructor(private http: Http ,  @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
    }
  }

  BidbuyFlashcard(page) {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'flash/bidonflashcard/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'flash/bidonflashcard/?page=' + page + '', ).map((response: Response) => response.json());
      }
  }
  TrendingnowFlashcard() {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'flash/viewflashcard/', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'flash/viewflashcard/', ).map((response: Response) => response.json());
      }
  }
  TopratedFlashcard() {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'flash/TopRatedFlashcardList/', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'flash/TopRatedFlashcardList/', ).map((response: Response) => response.json());

      }
  }
  RecentlyFlashcard() {
    const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'flash/RecentlyViewedFlashcard/', {headers: headers}).map((response: Response) => response.json());
  }
  bidoncourses(flashcard ,bidamount) {

    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post( Config.api + 'bid/BidUserFlashcard/',
      JSON.stringify({
        flashcard : flashcard,
        bidamount : bidamount

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  delcart(id) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'purchase/deletecheckoutlist/' + id, { headers: headers }).map((response: Response) => response.json());
  }
}
