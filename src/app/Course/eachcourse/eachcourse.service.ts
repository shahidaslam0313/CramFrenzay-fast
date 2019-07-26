import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Config} from '../../Config';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class EachcourseService {
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
  getreview(id)
  {
    if (localStorage.getItem('currentUser')){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'bid/courseReviews/' +  id ,{headers: headers}).map((response: Response) => response.json());
  }
else{
return this.http.get(Config.api + 'bid/courseReviews/' + id + '', ).map((response: Response) => response.json());
// var v=['No reviews found yet'];
}
}

  Eachcourse(id) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'course/showcoursedata/' + id + '', {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'course/showcoursedata/' + id + '', ).map((response: Response) => response.json());

    }
  }
  review(rating, comment,  course, book, flashcard, notes) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(  Config.api + 'bid/reviewsPost/' ,
      JSON.stringify({
        rating : rating,
        comment : comment,
        course: course,
        book: book,
        flashcard: flashcard,
        notes: notes,
        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  getchaptername(id){
    // if(this.token){
    //   let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    //   headers.append('Content-Type', 'application/json', );
      return this.http.get(Config.api + 'course/ChaptersWithVideosList/' + id ).map((res: Response) => res.json());
      // return this.http.get(Config.api + '')
    }
  }

// {headers : headers}