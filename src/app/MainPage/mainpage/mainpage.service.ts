import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpService } from '../../serv/http-service';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class mainpageservice {
  public username;
  currentuser;
  current;
  model;
  currentUser;
  token;
  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) { }

  BidCourseson() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'course/bidcourses', { headers: headers }).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'course/bidcourses').map((response: Response) => response.json());

    }
  }

  BidbuyBooksonnMainPage() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/bidbooks/', { headers: headers }).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'book/bidbooks/').map((response: Response) => response.json());
    }
  }
  showwishlist() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'bid/showwishlist/' + JSON.parse(localStorage.getItem('currentUser')).user_id, { headers: headers }).map((response: Response) => response.json()).catch(this.handleError);
    } else {
      return this.http.get(Config.api + 'bid/showwishlist/' + JSON.parse(localStorage.getItem('currentUser')).user_id).map((response: Response) => response.json()).catch(this.handleError);

    }
  }
  BidbuyNotesonnMainPage() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'notesgenie/bidnotes/', { headers: headers }).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'notesgenie/bidnotes/').map((response: Response) => response.json());
    }
  }
  BidbuyFlashCardsonnMainPage() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'flash/bidonflashcard/', { headers: headers }).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'flash/bidonflashcard/').map((response: Response) => response.json());

    }
  }

  delwishlist(id) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'bid/deletewishlist/' + id, { headers: headers }).map((response: Response) => response.json());
  }


  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

  bid(notes, course, book, flashcard) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/checkPurchase/',
      JSON.stringify({
        book: book,
        course: course,
        flashcard: flashcard,
        notes: notes,
        userid: JSON.parse(localStorage.getItem('currentUser')).user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  /////////////////// watch list //////////
  addwishlist(book, course, flashcard, notes) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
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
  //////////////////Get cart items////////////////
  showCartItem() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'purchase/purchase/getcheckoutlist/' + JSON.parse(localStorage.getItem('currentUser')).user_id, { headers: headers }).map((response: Response) => response.json());
    }
    else {
      return this.http.get(Config.api + 'purchase/purchase/getcheckoutlist/' + JSON.parse(localStorage.getItem('currentUser')).user_id).map((response: Response) => response.json());

    }
  }
  addtocart(notes, course, book, flashcard) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/postcheckout/' + JSON.parse(localStorage.getItem('currentUser')).user_id,
      JSON.stringify({
        notes: notes,
        course: course,
        book: book,
        flashcard: flashcard,
        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
