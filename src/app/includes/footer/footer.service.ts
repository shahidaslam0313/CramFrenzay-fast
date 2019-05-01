import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class FooterService {

  constructor(private http2: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  Coursesonfooter() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http2.get(Config.api + 'course/categorylist', { headers: headers }).map((response: Response) => response.json());
  }
  sub(model) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http2.post(Config.api + 'user/subscribe/',
      JSON.stringify({
        'email': model.email,
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
