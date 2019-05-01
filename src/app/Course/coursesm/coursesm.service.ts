import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from "../../Config";
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CoursesmService {
  username;
  currentuser;
  current;
  constructor(private http: Http,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  BidbuyCourse(page) {
      if (localStorage.getItem('currentUser')) {
    const  headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api+'course/bidcourses/?page=' + page + '', {headers:headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'course/bidcourses/?page=' + page + '', ).map((response: Response) => response.json());
      }
      }
  TrendingnowCourse(page) {
      if (localStorage.getItem('currentUser')) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api+'/course/courselist/?page='+page+'', {headers:headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + '/course/courselist/?page='+page+'',).map((response: Response) => response.json());
      }
      }
  TopratedCourse(page) {
      if (localStorage.getItem('currentUser')) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api+'course/TopRatedCoursesList/?page='+page+'', {headers:headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'course/TopRatedCoursesList/?page='+page+'',).map((response: Response) => response.json());
      }
      }
  RecentlyCourses() {
      if (localStorage.getItem('currentUser')) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/RecentlyViewedCourses', {headers: headers}).map((response: Response) => response.json());
      }
      else {
          return this.http.get(Config.api + 'course/RecentlyViewedCourses',).map((response: Response) => response.json());
      }
      }
  //////////////bid on course////////////
  bidoncourses(course ,bidamount) {

    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post( Config.api + 'bid/BidUserCourse/',
      JSON.stringify({
        course : course,
        bidamount : bidamount

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
