import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {isPlatformBrowser} from '@angular/common';
@Injectable()
export class fcdetailservice {

  username;
  currentuser;
  current;
  constructor(private http: Http, private http2: Http , @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  gettutorinfo(id){
    if(localStorage.getItem('currentUser')){
    const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'tutor/showinfo/' + id ,{headers:headers}).map((response: Response) => response.json());
  } 
  else{
    return this.http.get(Config.api + 'tutor/showinfo/' + id + '').map((response: Response) => response.json());
  }
}

  uploading(name, description, flashcard_image, visibility) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'flash/createflashcard/',
      JSON.stringify({
        name: name,
        description: description,
        flashcard_image: flashcard_image,
        visibility: visibility
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  newfcdetail(flashId) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'flash/showinfo/' + flashId + '', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'flash/showinfo/' + flashId + '', ).map((response: Response) => response.json());

    }
  }

  flipdetail(flashId) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'flash/lotinflashcard/' + flashId + '', {headers: headers}).map((response: Response) => response.json());
    }else {
      return this.http.get(Config.api + 'flash/lotinflashcard/' + flashId + '').map((response: Response) => response.json());

    }
  }

  flashCardTermsDefinitions(id) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'flash/lotinflashcard/' + id + '', {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'flash/lotinflashcard/' + id + '').map((response: Response) => response.json());

    }
  }
  review(rating, comment, book, course, flashcard, notes) {
    let headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(  Config.api + 'bid/reviewsPost/' ,
      JSON.stringify({
        rating : rating,
        comment : comment,
        book: book,
        course: course,
        flashcard: flashcard,
        notes: notes,
        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  getreview(id)
  {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'bid/flashcardReviews/' + id ,{headers: headers}).map((response: Response) => response.json());
  }

}
