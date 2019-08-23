import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class uploadbookservice {
  result: any;
  userid;
  public username;
  // private username;
  currentuser;
  current;
  constructor(private http: Http, private http2: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'))
    }

  }

  uploading(name, author_name,book_edition, price, ISBN, book_rent, book_detail, categories, subcategories, nestedcategory,   sell_status, sell_days,  book_image, accept_offer, bid_status, initial_amount, end_time , isreserved, reservedprice, start_time, min_amount, max_amount) {
  
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api +'book/postbook/',
      JSON.stringify({
        userid: this.current.user_id,
        name: name,
        author_name: author_name,
        book_edition: book_edition,
      
        price: price,
        ISBN: ISBN,
        book_rent: book_rent,
        book_detail: book_detail,
        categories : categories ,
        subcategories: subcategories,
        nestedcategory: nestedcategory,
        sell_status : sell_status,
        sell_days: sell_days,
        book_image: book_image,
        // book_file: model.book_file,
        accept_offer : accept_offer,
        bid_status : bid_status,
        bidbooks: {
          initial_amount: initial_amount,
          end_time : end_time,
          isreserved : isreserved,
          reservedprice : reservedprice,
          start_time : start_time,
        },
        min_amount: min_amount,
        max_amount: max_amount
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  CoursesonHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http2.get(Config.api + 'course/categorylist/', { headers: headers }).map((response: Response) => response.json());
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
}
