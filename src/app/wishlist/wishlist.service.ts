import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from './../Config';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WishlistService {
  public username;
  currentuser;
  current;
  token;
  constructor(private http2: Http, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.current && this.current.token;
    }
  }
  showwishlist() {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'bid/showwishlist/' + this.current.user_id, { headers: headers }).map((response: Response) => response.json());
  }
  delwishlist(id) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'bid/deletewishlist/' + id, { headers: headers }).map((response: Response) => response.json());

  }

  addwishlist(book, course, flashcard, notes) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'bid/postwishlist/' + this.current.user_id,
      JSON.stringify({
        book: book,
        course: course,
        flashcard: flashcard,
        notes: notes,
        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  addToCart(Book, Course, FlashCard, Notes) {
    const header = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    header.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/postcheckout/' + this.current.user_id,
      JSON.stringify({
        book: Book,
        course: Course,
        flashcard: FlashCard,
        notes: Notes,
        userid: this.current.user_id
      }),
      { headers: header }).map((response: Response) => response.json());
  }
}
