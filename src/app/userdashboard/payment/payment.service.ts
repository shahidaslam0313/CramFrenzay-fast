import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class paymentservice {

  username;
  currentuser;
  current;
  currentUser;
  token;
  status;
  checked;
  creditno;
  constructor(private http: Http, private http2: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.current && this.current.token;
    }
  }

  payment(notes, course,  flashcard, book,   creditno, ccv, cardHolderName, exp,cardnickname, card_type  ) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.token });

      headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'purchase/singlepurchase/'  ,
      JSON.stringify({
        notes: notes,
        course: course,
        flashcard: flashcard,
        book: book,
        userid: this.current.user_id,
        creditno: creditno,
        ccv: ccv,
        card_holder: cardHolderName,
        exp: exp,
        nickname: cardnickname,
        card_type: card_type,
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  payments(notes, course,  flashcard, book, id ) {
    const headers = new Headers({'Authorization': 'JWT ' + this.token});

    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/singlepurchase/' + id,
      JSON.stringify({
        notes: notes,
        course: course,
        flashcard: flashcard,
        book: book,
      }),
      {headers: headers}).map((response: Response) => response.json());

  }


  showCards() {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/getcards/' + this.current.user_id, { headers: headers }).map((response: Response) => response.json());
  }
  updateCard( id, defaultCheck,name) {
    const header = new Headers({ 'Authorization': 'JWT ' + this.token });
    header.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'purchase/editdeletecard/' + id,
      JSON.stringify({
        "id": id,
        "default": defaultCheck,
        "nickname":name
      }),
      { headers: header }).map((response: Response) => response.json());
  }
  zipcode(zipCode) {    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/get_zipcode_data/' + zipCode,
      { headers: headers }).map((response: Response) => response.json());
  }
  Eachnotes(Eid) {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
      headers.append('Content-Type', 'application/json');
      return this.http.get(Config.api + 'notesgenie/eachnotes/' + Eid + '', {headers: headers}).map((response: Response) => response.json());
    } else {
      return this.http.get(Config.api + 'notesgenie/eachnotes/' + Eid + '', ).map((response: Response) => response.json());

    }
  }

  bidpayments(book, course, notes, flashcard, creditno, ccv, exp,card_type, id  ) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.token });
      headers.append('Content-Type', 'application/json', );
      return this.http.post(Config.api + 'purchase/bidpurchase/' + id, 
        JSON.stringify({
          book: book,
          course: course,
          notes: notes,
          flashcard: flashcard,
          userid: this.current.user_id,
          creditno: creditno,
          ccv: ccv,
          exp: exp,
          card_type: card_type,
        }),
        { headers: headers }).map((response: Response) => response.json());
    }
    addCard(cardno, ccv, expiryDate,cardHolderName, cardnickname, card_type,zipcode, 
      street, city, state,country, defaultCheck, ) {
      let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
      headers.append('Content-Type', 'application/json');
      return this.http.post(Config.api + 'purchase/addcard/' + this.current.user_id,
        JSON.stringify({
          "cardNumber": cardno,
          "ccv": ccv,
          "expiryDate": expiryDate,
          "user": this.current.user_id,
          "card_holder": cardHolderName,
          "nickname": cardnickname,
          "default": defaultCheck,
          "card_type": card_type,
          "zip_code": zipcode,
          "street_adrress": street,
          "city": city,
          "state": state,
          "country": country,
        }),
        // { headers: header }).map((response: Response) => response.json());
        { headers: headers }).map((response: Response) => response.json());
      }
}
