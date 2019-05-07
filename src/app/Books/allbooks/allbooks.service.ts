import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';
import { HttpService } from '../../serv/http-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AllbooksService {
  public name;
  current;
  username;
  currentUser;
  token;
  currentuser;
  wishlist;
  // headers = new Headers();

  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
    }

  }

  allbooks(page) {
    if (localStorage.getItem('currentUser')) {
      const  headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/getbooklist/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
    }
else {
      return this.http.get(Config.api + 'book/getbooklist/?page=' + page + '', ).map((response: Response) => response.json());
    }
  }

  searchbooks(name) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/searchbook/' + name, {headers: headers}).map((response: Response) => response.json());
      }
      else {
      return this.http.get(Config.api + 'book/searchbook/' + name, ).map((response: Response) => response.json());

    }
  }
  InnerslideronMainPage() {
    const  headers = new Headers();
     headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/categorylist', { headers: headers }).map((response: Response) => response.json());
  }
  BidBooks() {
    if (localStorage.getItem('currentUser')) {
      const  headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/bidbooks/', {headers: headers}).map((response: Response) => response.json());
    }
else {
      return this.http.get(Config.api + 'book/bidbooks/', ).map((response: Response) => response.json());

    }
  }
  BidbuyBookson() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/bidbooks/', {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'book/bidbooks/', ).map((response: Response) => response.json());

    }
  }
  tradingBooks() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/getbooklist/', {headers: headers}).map((response: Response) => response.json());
    } else {

      return this.http.get(Config.api + 'book/getbooklist/').map((response: Response) => response.json());
    }
  }

  recentBooks() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/recentbooks/', {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'book/recentbooks/', ).map((response: Response) => response.json());

    }
  }
  topratedBooks() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'book/TopRatedBookList/', {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'book/TopRatedBookList/', ).map((response: Response) => response.json());

    }
  }
  delcart(id) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'purchase/deletecheckoutlist/' + id, { headers: headers }).map((response: Response) => response.json());
  }

}
