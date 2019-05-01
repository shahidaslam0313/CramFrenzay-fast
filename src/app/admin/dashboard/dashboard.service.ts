import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DashboardService {
  username;
  currentuser;
  current;
  currentUser;
  token;
  constructor(private http: Http, private http2: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser && this.currentUser.token;
  }
  getcourse(page) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/CoursesListNone/?page=' + page + '', { headers: headers });
  }
  getnotes(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api + 'notesgenie/NotesListNone/?page=' + page + '', {headers: headers});
  }
  getcards(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api + 'flash/FlashcardListNone/?page=' + page + '', {headers: headers});
  }
  getbook(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api + 'book/BooksListNone/?page=' + page + '', {headers: headers});
  }
  approvenote(id){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'notesgenie/approvenotes/' + id,
      JSON.stringify({
        status : true
      }),
    {headers : headers}).map((response: Response) => response.json());
  }
  approvecourse(id){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'course/approvecourse/' + id + '/',
      JSON.stringify({
        status : true
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
  approvecard(id){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'flash/approveflashcard/' + id  ,
      JSON.stringify({
        status : true
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
  approvebook(id){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'book/approvebook/' + id  ,
      JSON.stringify({
        status : true
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
  rejectnote(id){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'notesgenie/rejectnotes/' + id  ,
      JSON.stringify({
        status : false
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
  rejectcourse(id){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'course/rejectcourse/' + id + '/' ,
      JSON.stringify({
        status : false
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
  rejectcard(id){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'flash/rejectflashcard/' + id  ,
      JSON.stringify({
        status : false
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
  rejectbook(id){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'book/rejectbook/' + id  ,
      JSON.stringify({
        status : false
      }),
      {headers : headers}).map((response: Response) => response.json());
  }
  accpectnotes(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api + 'notesgenie/NotesListAccepted/?page=' + page + '', {headers: headers});
  }
  accpectcourse(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api +  'course/CoursesListAccepted?page=' + page + '', {headers: headers});
  }
  accpectcards(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api +  'flash/FlashcardListAccepted/?page=' + page + '', {headers: headers});
  }
  accpectbook(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api +  'book/BooksListAccepted/?page=' + page + '', {headers: headers});
  }
  rejectednote(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api +  'notesgenie/NotesListRejected/?page=' + page + '', {headers: headers});
  }
  rejectedcourse(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api +  'course/CoursesListRejected/?page=' + page + '', {headers: headers});
  }
  rejectedcard(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api +  'flash/FlashcardListRejected/?page=' + page + '', {headers: headers});
  }
  rejectedbook(page){
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type','application/json');
    return this.http.get(Config.api +  'book/BooksListRejected/?page=' + page + '', {headers: headers});
  }
}
