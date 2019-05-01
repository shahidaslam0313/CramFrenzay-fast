import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class FindtutorService {

  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }
  search(name) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + '/tutor/searchtutor/' + name + '/', { headers: headers }).map((response: Response) => response.json());

  }
  maintutorlist() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + '/tutor/tutorlist/', { headers: headers }).map((response: Response) => response.json());
  }
}
