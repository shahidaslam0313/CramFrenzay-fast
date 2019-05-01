import { Config } from './../../Config';
import { Http, Headers } from '@angular/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpService } from '../../serv/http-service';
import { isPlatformBrowser } from '@angular/common';
import 'rxjs/add/operator/map';

@Injectable()
export class WinlossService {

  currentUser;

  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  getWins() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'bid/userbidwin/', { headers: headers }).map((response: Response) => response.json());
  }

}
