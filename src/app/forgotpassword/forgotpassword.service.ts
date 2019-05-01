import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../Config";
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ForgotpasswordService {

  constructor(private http: Http) { }

  forgot(code, password) {
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.post(Config.api + 'user/pass_reset_frontend/' + code, JSON.stringify(
      {
        "password": password
      }), { headers: headers }).map
      ((res: Response) => res.json());
  }
}
