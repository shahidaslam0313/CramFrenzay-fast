import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class headerservice {
   username;
  currentuser;
  current;
  currentUser;
  token;
  user_id;
  constructor(private http2: Http, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.current && this.current.token;
  }

  showwishlist() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'bid/getwishlist_web/' , {headers: headers}).map((response: Response) => response.json()).catch(this.handleError);
    } 
  }
  getnotification() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'bid/user_notifications/' + JSON.parse(localStorage.getItem('currentUser')).user_id, {headers: headers}).map((response: Response) => response.json());
    }
  }
  putnotification( id) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.put(Config.api + 'bid/read_delete/' + id + '/',
        JSON.stringify({
          read : true,
        }),
        {headers: headers}).map((response: Response) => response.json()).catch(this.handleError);
  }
  delnotification( id) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.delete(Config.api + 'bid/read_delete/' + id + '/',
        {headers: headers}).map((response: Response) => response.json()).catch(this.handleError);
  }
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
  delwishlist(id) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.delete(Config.api + 'bid/deletewishlist/' + id, {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.delete(Config.api + 'bid/deletewishlist/' + id, ).map((response: Response) => response.json());

    }
  }
  search(name) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'user/search/' + name + '/', { headers: headers }).map((response: Response) => response.json());
  }
  addToCart(Book, Course, FlashCard, Notes) {

    const header = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    header.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/postcheckout/' + JSON.parse(localStorage.getItem('currentUser')).user_id,
      JSON.stringify({
        book: Book,
        course: Course,
        flashcard: FlashCard,
        notes: Notes,
        userid: JSON.parse(localStorage.getItem('currentUser')).user_id
      }),
      { headers: header }).map((response: Response) => response.json());
  }

  removeFromCart(cartID) {
    const header = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    return this.http.delete(Config.api + 'purchase/purchase/deletecheckoutlist/' + cartID, { headers: header });
  }

  showCartItem() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'purchase/getcheckoutlist_web/' , {headers: headers}).map((response: Response) => response.json());
    }
   
  }
  addwishlist(book, course, flashcard, notes) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'bid/postwishlist/' + JSON.parse(localStorage.getItem('currentUser')).user_id,
      JSON.stringify({
        book: book,
        course: course,
        flashcard: flashcard,
        notes: notes,
        userid: JSON.parse(localStorage.getItem('currentUser')).user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}

