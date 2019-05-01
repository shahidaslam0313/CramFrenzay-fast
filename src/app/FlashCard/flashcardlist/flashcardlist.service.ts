import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { HttpService } from '../../serv/http-service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FlashcardlistService {

  public username;
  currentuser;
  current;
  currentUser;
  token;
  constructor(private http: HttpService, private _http1: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
    }
  }
  Bidonflashcards() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'flash/bidonflashcard/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'flash/bidonflashcard/', ).map((response: Response) => response.json());

    }
  }


  Trendingflashcards() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'flash/viewflashcard/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'flash/viewflashcard/' ).map((response: Response) => response.json());

    }
  }

  Topratedflashcards() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'flash/TopRatedFlashcardList/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'flash/TopRatedFlashcardList/', ).map((response: Response) => response.json());

    }
  }

  Recentflashcards() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'flash/RecentlyViewedFlashcard/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'flash/RecentlyViewedFlashcard/', ).map((response: Response) => response.json());

    }
  }

  flashsearch(name) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this._http1.get(Config.api + 'flash/search/' + name + '/', {headers: headers}).map((response: Response) => response.json());
    }
    else {
      return this._http1.get(Config.api + 'flash/search/' + name + '/').map((response: Response) => response.json());

    }
  }
}
