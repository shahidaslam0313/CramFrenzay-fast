import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class TutorregistrationService {
  currentuser;
  data: any[];
  currentUser;
  username;
  current;
  token;
  constructor(private http: Http, private http2: Http) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.current && this.current.token;
  }

  ourprofessional() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'tutor/addtutorsubjects/', { headers: headers }).map((response: Response) => response.json());
  }

  registration( school_attended, graduation_year, major, subject, state_of_residence, Experience, interview, description, profile_picture) {
    if (localStorage.getItem('currentUser')) {
      let headers = new Headers({'Authorization': 'JWT ' + this.token});
      headers.append('Content-Type', 'application/json');
      return this.http.post(Config.api + 'tutor/addtutor/' + this.current.user_id,
        JSON.stringify({

          // first_name: first_name,
          // last_name: last_name,
          user_id: this.current.user_id,
          school_attended: school_attended,
          graduation_year: graduation_year,
          major: major,
          subject: subject,
          state_of_residence: state_of_residence,
          Experience: Experience,
          interview: interview,
          description: description,
          profile_picture: profile_picture

        }),
        {headers: headers}).map((response: Response) => response.json());
    }
  }
  coursesub() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/sublist/', { headers: headers }).map((response: Response) => response.json());
  }
}
