import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { HttpService } from '../../serv/http-service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CourseService {

  public name;
  userid;
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
  BidCoursesoncourses() {
    if (localStorage.getItem('currentUser')) {
     const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'course/bidcourses/', {headers: headers}).map((response: Response) => response.json());
    }
    else {
      return this.http.get(Config.api + 'course/bidcourses/', ).map((response: Response) => response.json());

    }
  }
 BidCourses() {
   if (localStorage.getItem('currentUser')) {
     const  headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
     headers.append('Content-Type', 'application/json');
     return this.http.get(Config.api + 'course/bidcourses', {headers: headers}).map((response: Response) => response.json());
   }
   else {
     return this.http.get(Config.api + 'course/bidcourses', ).map((response: Response) => response.json());
   }
 }

  TrendingNowoncourse() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'course/courselist/', {headers: headers}).map((response: Response) => response.json());
    }
    else {
      return this.http.get(Config.api + 'course/courselist/', ).map((response: Response) => response.json());

    }
  }
  TopratedCoursesoncourse() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'course/TopRatedCoursesList', {headers: headers}).map((response: Response) => response.json());
    }
    else {
      return this.http.get(Config.api + 'course/TopRatedCoursesList', ).map((response: Response) => response.json());

    }
  }
  RecentlyCourses() {
    if (localStorage.getItem('currentUser')) {
       const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'course/RecentlyViewedCourses', {headers: headers}).map((response: Response) => response.json());
    }
    else {
      return this.http.get(Config.api + 'course/RecentlyViewedCourses', ).map((response: Response) => response.json());

    }
  }
  WatchedCoursesoncourse() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/courselist/', { headers: headers }).map((response: Response) => response.json());
  }

  coursesearch(name) {
    return this._http1.get(Config.api + 'course/searchlist/' + name + '/').map((response: Response) => response.json());
  }


}

