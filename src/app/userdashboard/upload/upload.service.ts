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

  uploading(sell_days,sell_status , model, accept_offer , bid_status,  end_time, start) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'course/postcourse',
      JSON.stringify({
        userid: this.current.user_id,
        name: model.name,
          description: model.description,
        bidprice: model.bidprice,
        price: model.price,
        sell_days: sell_days,
        sell_status : sell_status,
        categories: model.categories,
        subcategories : model.subcategories ,
        nestedcategory : model.nestedcategory ,
        course_thumbnail: model.course_thumbnail,
        accept_offer : accept_offer,
        min_amount: model.min_amount,
        max_amount : model.max_amount,
        bidcourse: {
          initial_amount: model.initial_amount,
          end_time : end_time,
          isreserved : model.isreserved,
          reservedprice : model.reservedprice,
          start_time : start,
          bid_status : bid_status
        }
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
