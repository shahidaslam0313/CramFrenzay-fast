import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';


@Injectable()
export class TutorinterviewService {
  currentUser;
  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  interview(experience, interest, ) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'tutor/addtutor',
      JSON.stringify({
        Experience: experience,
        Interests: interest,
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
