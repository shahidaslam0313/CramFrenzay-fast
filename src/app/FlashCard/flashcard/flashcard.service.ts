import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class flashcardservice {

  public name;
  private productsSource;
  currentProducts;

  constructor(private http: Http,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
      this.name = localStorage.getItem('name');
    }
  }

  Flashcard() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api+'course/categorylist', {headers: headers}).map((response: Response) => response.json());
  }
  Flashcardlist() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api+'flash/flashcardlist', {headers: headers}).map((response: Response) => response.json());
  }
  Flashnew(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api+'flash/flashcardlist/'+id+'', {headers: headers}).map((response: Response) => response.json());
  }
}
