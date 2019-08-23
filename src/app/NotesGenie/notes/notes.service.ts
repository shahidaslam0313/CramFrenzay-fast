import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import swal from 'sweetalert2';

@Injectable()
export class NotesService {
  result: any[] = [];
  username;
  currentuser;
  current;
  token;
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.current && this.current.token;
    }
  }
  Eachnotes(id)
  {
    if (localStorage.getItem('currentUser')) {

      const headers = new Headers({'Authorization': 'JWT ' + this.token});
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'notesgenie/eachnotes/' + id + '',{headers: headers}).map((response: Response) => response.json());
  }
  else {
      return this.http.get(Config.api + 'notesgenie/eachnotes/' + id+ '' ).map((response: Response) => response.json());
    }
  }

  gettutorinfo(id){
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'tutor/showinfo/' + id , {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'tutor/showinfo/' + id  ).map((response: Response) => response.json());

    }

  }
  getreview(id)
  {
    if (localStorage.getItem('currentUser')) {
    const headers = new Headers({'Authorization': 'JWT ' + this.token});
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'bid/notesReviews/' + id ,{headers: headers}).map((response: Response) => response.json());
    }
  else {
      return this.http.get(Config.api + 'bid/notesReviews/' + id ).map((response: Response) => response.json());
    }
  }




  BidCourseFailure2() {
    swal({
      type: 'error',
      title: 'Oops! <br> No Reviews Found!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    });
  }

  review(rating, comment,  notes, book, course, flashcard) {
    let headers = new Headers({'Authorization': 'JWT ' + this.token});
    headers.append('Content-Type', 'application/json', );
    return this.http.post(  Config.api + 'bid/reviewsPost/' ,
      JSON.stringify({
        rating : rating,
        comment : comment,
        notes: notes,
        book: book,
        course: course,
        flashcard: flashcard,

        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
