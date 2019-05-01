import { Injectable,PLATFORM_ID  } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SeemorempService {
  current;
  username;
  currentuser;
  platformId;
  token;
  constructor(private http: Http) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.current && this.current.token;
    }
  }

  BidbuyNotesonnMainPage(page) {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'notesgenie/bidnotes/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
      }
else {
          return this.http.get(Config.api + 'notesgenie/bidnotes/?page=' + page + '', ).map((response: Response) => response.json());

      }
  }
  BidbuyCourseonnMainPage(page) {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'course/bidcourses/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'course/bidcourses/?page=' + page + '', ).map((response: Response) => response.json());

      }
  }
  BidbuyFlashonnMainPage(page) {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'flash/bidonflashcard/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'flash/bidonflashcard/?page=' + page + '', ).map((response: Response) => response.json());

      }
  }
  BidbuyBooksonnMainPage(page) {
      if (localStorage.getItem('currentUser')) {
          const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
          headers.append('Content-Type', 'application/json');
          return this.http.get(Config.api + 'book/bidbooks/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'book/bidbooks/?page=' + page + '', ).map((response: Response) => response.json());


      }
  }

}
