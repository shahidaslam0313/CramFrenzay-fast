import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../Config';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CarddetailService {
  username;
  currentuser;
  current;
  user_id;
  constructor(public http: Http, public http2: Http, @Inject(PLATFORM_ID) public platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
    }
  }
  mycards() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'flash/userflashcards/' + this.current.user_id, { headers: headers }).map((response: Response) => response.json());
  }
  uploading(modal) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'flash/adddetails',
      JSON.stringify({
        userid: this.current.user_id,
        title: modal.title,
        definition: modal.definition,
        image: modal.image,
        flashcard: modal.flashcard,
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
