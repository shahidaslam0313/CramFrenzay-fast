import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class NgseemoreService {
  current;
  username;
  currentuser;
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
    } }
  BidbuyNotes(page) {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + '/notesgenie/bidnotes/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + '/notesgenie/bidnotes/?page=' + page + '', ).map((response: Response) => response.json());

      }
  }
  TrendingNotes(page) {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + '/notesgenie/listnotes/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + '/notesgenie/listnotes/?page=' + page + '', ).map((response: Response) => response.json());

      }
  }
  TopratedNotes(page) {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'notesgenie/TopRatedNotesList/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'notesgenie/TopRatedNotesList/?page=' + page + '', ).map((response: Response) => response.json());

      }
  }
  Recentnotes() {

          const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'notesgenie/RecentlyViewedNotes/', {headers: headers}).map((response: Response) => response.json());

  }
  addwishlist(book, course, flashcard, notes) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'bid/postwishlist',
      JSON.stringify({
        book: book,
        course: course,
        flashcard: flashcard,
        notes: notes,
        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  bidnotes(notes , bidamount) {

    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post( Config.api + 'bid/BidUserNotes/',
      JSON.stringify({
        notes : notes,
        bidamount : bidamount

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  getnotesid(id) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get( Config.api + 'notesgenie/eachnotes/' + id + '', { headers: headers }).map((response: Response) => response.json());
  }
}
