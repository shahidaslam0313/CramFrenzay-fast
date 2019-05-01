import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ChangePasswordService {
  public username
  private productsSource;
  currentProducts;
  currentuser;
  current;
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }


  changepaassword(currentPassword, newPassword, newPassword2) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'user/change_password/' + this.current.username + '/',
      JSON.stringify({
        'currentPassword': currentPassword,
        'newPassword': newPassword,
        'newPassword2': newPassword2


      }),
      { headers: headers }).map((response: Response) => response.json());
  }


}
