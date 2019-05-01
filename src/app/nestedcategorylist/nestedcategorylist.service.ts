import { Injectable } from '@angular/core';
import { PLATFORM_ID  } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../Config";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NestedcategorylistService {
    current;
    username;
    currentuser;
    platformId;
    token;
    constructor(private http: Http) {
        if (isPlatformBrowser(this.platformId)) {
            this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
            this.currentuser = this.username.asObservable();
            this.current = JSON.parse(localStorage.getItem('currentUser'));
            this.token = this.current && this.current.token;
        }
    }
    coursenestedlist(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'course/Courselistbynestedcategory/' +  id, { headers: headers }).map((response: Response) => response.json());
    }
    notesenestedlist(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'notesgenie/notesnestedcategorylist/' +  id, { headers: headers }).map((response: Response) => response.json());
    }
    cardsnestedlist(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'flash/nestedcategoryFlashcard/' +  id, { headers: headers }).map((response: Response) => response.json());
    }
    booknestedlist(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'book/nestedcategorywisebook/' +  id, { headers: headers }).map((response: Response) => response.json());
    }
}

