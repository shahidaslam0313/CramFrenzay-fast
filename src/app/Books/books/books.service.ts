import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from '../../Config';
@Injectable()
export class booksservice {
public name;
  constructor(private http: Http,@Inject(PLATFORM_ID) private platformId: Object) { }

  searchbooks(name) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'book/searchbook/'+name+'/',{ headers : headers}).map((response: Response) => response.json());
  }
}
