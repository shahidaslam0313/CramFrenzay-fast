import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { Router } from '@angular/router';

@Injectable()
export class OfferactivityService {
  current;
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object, private _nav: Router) {
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }
  acceptoffers(page) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/auctionList/?page=' + page + '',
      { headers: headers }).map((response: Response) => response.json());
  }
  showCards() {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/getcards/' + this.current.user_id, { headers: headers }).map((response: Response) => response.json());
  }
  updateCard(id, defaultCheck, name) {
    const header = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    header.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'purchase/editdeletecard/' + id,
      JSON.stringify({
        // "cardNumber": cardno,

        "id": id,
        "default": defaultCheck,
        "nickname": name
      }),
      { headers: header }).map((response: Response) => response.json());
  }
  offerpayment(course, book, flashcard, notes, creditno, ccv, exp, card_type, id) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });

    if (creditno.slice(0, 1) === '*') {
      headers.append('Content-Type', 'application/json');
      return this.http.post(Config.api + 'purchase/acceptpurchase/' + id,
        JSON.stringify({
          book: book,
          course: course,
          flashcard: flashcard,
          notes: notes
        }),
        { headers: headers }).map((response: Response) => response.json());
    }
    else {
      headers.append('Content-Type', 'application/json');
      return this.http.post(Config.api + 'purchase/acceptpurchase/',
        JSON.stringify({
          course: course,
          book: book,
          flashcard: flashcard,
          notes: notes,
          creditno: creditno,
          ccv: ccv,
          exp: exp,
          card_type: card_type,
          userid: this.current.user_id,
        }),
        { headers: headers }).map((response: Response) => response.json());
    }
  }
}

