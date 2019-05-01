import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { HttpService } from '../../serv/http-service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class notesgenieservice {
  public name;
  userid;
  public username;
  currentuser;
  current;
  months: any[];
  constructor(private http: HttpService, private _http1: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  notessearch(name) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this._http1.get(Config.api + 'notesgenie/search/' + name + '/', {headers: headers}).map((response: Response) => response.json());
    }
    else {
      return this._http1.get(Config.api + '/notesgenie/search/' + name + '/').map((response: Response) => response.json());

    }
  }

  Bidonnotes() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'notesgenie/bidnotes/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'notesgenie/bidnotes/', ).map((response: Response) => response.json());

    }
  }
  Bidnote() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + '/notesgenie/bidnotes/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + '/notesgenie/bidnotes/', ).map((response: Response) => response.json());

    }
  }
  Trendingnotes() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'notesgenie/listnotes/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'notesgenie/listnotes/', ).map((response: Response) => response.json());

    }
  }
  Topratednotes() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'notesgenie/TopRatedNotesList/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'notesgenie/TopRatedNotesList/', ).map((response: Response) => response.json());

    }
  }
  Recentnotes() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'notesgenie/RecentlyViewedNotes/', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'notesgenie/RecentlyViewedNotes/', ).map((response: Response) => response.json());

    }
  }
}
