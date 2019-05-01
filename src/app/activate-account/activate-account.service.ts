import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../Config";
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ActivateAccountService {

  currentUser;
  constructor(private http: Http) {
  }

  activate(code) {
    let headers = new Headers();
    return this.http.get(Config.api + 'user/activate_account/' + code, { headers: headers }).map((response: Response) => response.json());
  }
}
