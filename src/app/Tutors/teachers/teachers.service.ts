import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class TeachersService {

  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { 
    
  }

  ourteachers(teacherId) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'tutor/tutorProfileData/' + teacherId + '', { headers: headers }).map((response: Response) => response.json());
  }

}
