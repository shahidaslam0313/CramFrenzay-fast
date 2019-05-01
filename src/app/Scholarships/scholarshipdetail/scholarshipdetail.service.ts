import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ScholarshipdetailService {

  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  ourscholardetail(scholarshipId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'scholarships/scholarshipdetail/' + scholarshipId + '', { headers: headers }).map((response: Response) => response.json());
  }
}
