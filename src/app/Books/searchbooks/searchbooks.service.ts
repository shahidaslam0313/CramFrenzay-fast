import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from '../../Config';
import {isPlatformBrowser} from '@angular/common';
@Injectable()
export class SearchbooksService {

  constructor(private http: Http,@Inject(PLATFORM_ID) private platformId: Object) { }


  searchbooks(name,full) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'book/searchbook/'+name,{ headers : headers}).map((response: Response) => response.json());
  }



}
