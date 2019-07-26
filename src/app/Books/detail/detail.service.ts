import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from "../../Config";
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class detailservice {
  username;
  currentuser;
  current;
  token;
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.current && this.current.token;

    }
  }

  booksdetail(id) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/getbookdetail/' + id + '', {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'book/getbookdetail/' + id + '').map((response: Response) => response.json());

    }
  }
  review(rating, comment, book, course, flashcard, notes) {
    let headers = new Headers({'Authorization': 'JWT ' + this.token});
    headers.append('Content-Type', 'application/json', );
    return this.http.post(  Config.api + 'bid/reviewsPost/' ,
      JSON.stringify({
        rating : rating,
        comment : comment,
        book: book,
        course: course,
        flashcard: flashcard,
        notes: notes,
        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  getreview(id) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'bid/bookReviews/' + id, {headers: headers}).map((response: Response) => response.json());
    }
    else {
    
      return this.http.get(Config.api + 'bid/bookReviews/' + id, ).map((response: Response) => response.json());
    }
  }
  }
