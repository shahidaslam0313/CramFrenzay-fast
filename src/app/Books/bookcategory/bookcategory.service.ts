import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from '../../Config';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class BookcategoryService {

  constructor(private http: Http,@Inject(PLATFORM_ID) private platformId: Object) { }


  subbooks(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/subcategory/' + id, {headers: headers}).map((response: Response) => response.json());
  }
  bookSubcat(id) {
    const headers = new Headers
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'book/cagtegorywisebook/' + id, {headers: headers}).map((response: Response) => response.json());
}
////////////bid on books///////
  bidonbooks(model,notes,flashcard,course,book) {

    const headers = new Headers( );
    headers.append('Content-Type', 'application/json');
    return this.http.post( Config.api +'bid/bookbid',
      JSON.stringify({
        initial_amount: model.initial_amount,
        start_time: model.start_time,
        end_time: model.end_time,
        isreserved: model.isreserved,
        reservedprice: model.reservedprice,
        notes:notes,
        flashcard:flashcard,
        course:course,
        book:book,

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
