import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class uploadcardservice {
  result: any;
  currentuser;
  current;
  public username;
  constructor(private http: Http, private http2: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  uploadcard(name,flashcard_image,model,sell_status, accept_offer, sell_days,  end_time, start_time, min_amount, max_amount, initial_amount, reservedprice, bid_status ) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'flash/createflashcard',
      JSON.stringify({
        user_id: this.current.user_id,
        name: name,
        no_of_terms: model.no_of_terms,
        visibility: model.visibility,
        price: model.price,
        bid_price: model.bid_price,
        flashcard_image: flashcard_image,
        category: model.category,
        subcategory : model.subcategory,
        nestedcategory : model.nestedcategory,
        sell_status : sell_status,
        accept_offer : accept_offer,
        sell_days: sell_days,
        bidflashcard: {
          initial_amount: initial_amount,
          end_time : end_time,
          isreserved : model.isreserved,
          reservedprice : reservedprice,
          start_time : model.start_time,
          bid_status : bid_status
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
  titleget() {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http2.get(Config.api + '/flash/userflashcards/' + this.current.user_id, { headers: headers }).map((response: Response) => response.json());
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
  carddetail(model) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'flash/adddetails',
      JSON.stringify({
       flashcard : model.flashcard,
        title: model.title,
        definition : model.definition,
        image : model.image

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
