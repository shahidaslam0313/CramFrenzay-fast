import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "./../Config";
import { HttpService } from './../serv/http-service';
import { config } from '../../../protractor.conf';
// import { isPlatformBrowser } from '@angular/common';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService
{
  public name;
  userid;
  public username;
  currentuser;
  current;
  currentUser;
  token;

  constructor(private http: HttpService, private _http1: Http, @Inject(PLATFORM_ID) private platformId: Object)
  {
    // if (isPlatformBrowser(this.platformId)) {
    //   this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    //   this.currentuser = this.username.asObservable();
    //   this.current = JSON.parse(localStorage.getItem('currentUser'));
    //   this.token = this.currentUser && this.currentUser.token;
    // }
   }
   getAllChatUsers()
   {
      const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
       headers.append('Content-Type', 'application/json');
       return this.http.get(Config.api+'chat/All_Teacher_for_chat', {headers: headers}).map((response: Response) => response.json());
    
  }
  getPreviousChats()
  {
    const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api+ 'chat/chathistory/', {headers: headers}).map((response: Response) => response.json());
  }
  getChats(id)
  {
    const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api+ 'chat/messages/'+id, {headers: headers}).map((response: Response) => response.json());
  }
  assignRoom(username)
  {
    const headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'chat/allrooms/',
    JSON.stringify({
      user2:username
    }),
    { headers: headers }).map((response: Response) => response.json());
  }
}
