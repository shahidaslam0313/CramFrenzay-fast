import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class UpcomingscholarshipService {

  constructor(private http: Http) { }

  Scholarshipbymonth(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'scholarships/scholarshipbydate/' + id + '/', { headers: headers }).map((response: Response) => response.json());
  }
}
