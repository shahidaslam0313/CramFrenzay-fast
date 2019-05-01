import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';
import { HttpService } from '../../serv/http-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PartnersService {
  username;
  currentuser;
  current;
  token;
  currentUser;
  DataSource;

  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
    }
  }
  gettutor() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'user/Partner_getAll/', { headers: headers }).map((response: Response) => response.json());
  }
}
