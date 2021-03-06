import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class SearchscholarshipService {

  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  searchscholarship(sname) {    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'scholarships/search/' + sname + '/', { headers: headers }).map((response: Response) => response.json());
  }
}
