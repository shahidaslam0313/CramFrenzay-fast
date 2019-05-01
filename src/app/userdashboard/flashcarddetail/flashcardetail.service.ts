import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../../Config";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FlashcardetailService {

  username;
  currentuser;
  current;
  constructor(private http: Http, private http2: Http) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }

  newfcdetail(flashId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'flash/showinfo/' + flashId + '', { headers: headers }).map((response: Response) => response.json());
  }

  flipdetail(flashId) {
    return this.http.get(Config.api + 'flash/lotinflashcard/' + flashId + '').map((response: Response) => response.json());
  }

  flashCardTermsDefinitions(id) {
    return this.http.get(Config.api + 'flash/lotinflashcard/' + id + '').map((response: Response) => response.json());
  }


}
