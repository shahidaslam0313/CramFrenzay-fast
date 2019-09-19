import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class uploadservice {
  public username;
  months: any[];
  currentuser;
  current;
  constructor(private http: Http, private http2: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));

  }
  Catwisenotes(Cid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/subcategory/' + Cid + '', { headers: headers }).map((response: Response) => response.json());
  }
  nestedwisenotes(Cid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/nestedcategory/' + Cid + '', { headers: headers }).map((response: Response) => response.json());
  }
  CoursesonHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http2.get(Config.api + 'course/categorylist/', { headers: headers }).map((response: Response) => response.json());
  }

  uploading(name, sell_days, sell_status, model, course_thumbnail, accept_offer, bid_status,skill, end_time, start, min_amount, max_amount, initial_amount, reservedprice) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'course/postcourse',
      JSON.stringify({
        userid: this.current.user_id,
        name: name,
        description: model.description,
        bidprice: model.bidprice,
        price: model.price,
        sell_days: sell_days,
        sell_status: sell_status,
        categories: model.categories,
        subcategories: model.subcategories,
        nestedcategory: model.nestedcategory,
        course_thumbnail: course_thumbnail,
        accept_offer: accept_offer,
        bid_status: bid_status,
        skill:skill,
        bidcourse: {
          initial_amount: initial_amount,
          end_time: end_time,
          isreserved: model.isreserved,
          reservedprice: reservedprice,
          start_time: start,
        },
        min_amount: min_amount,
        max_amount: max_amount
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
