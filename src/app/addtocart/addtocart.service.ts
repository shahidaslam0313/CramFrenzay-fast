import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Config } from '../Config';
import { Headers, Http, Response } from '@angular/http';
import { HttpService } from '../serv/http-service';
import 'rxjs/add/operator/map';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AddtocartService {
  currentUser;
  username;
  currentuser;
  current;
  token;
  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
    // if (isPlatformBrowser(this.platformId)) {
    //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // }
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
    }
  }
  addToCart(Book, Course, FlashCard, Notes) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/postcheckout/' + JSON.parse(localStorage.getItem('currentUser')).user_id,
      JSON.stringify({
        book: Book,
        course: Course,
        flashcard: FlashCard,
        notes: Notes,
        userid: JSON.parse(localStorage.getItem('currentUser')).user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  removeFromCart(cartID) {
    const header = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    return this.http.delete(Config.api + 'purchase/purchase/deletecheckoutlist/' + cartID, { headers: header });
  }

  showCartItems() {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/getcheckoutlist_web/' ,{ headers: headers }).map((response: Response) => response.json());
  }
  showCards() {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/getcards/' + this.current.user_id, { headers: headers }).map((response: Response) => response.json());
  }
  updateCard( defaultCheck, id,name) {
    const header = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    header.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'purchase/editdeletecard/' + id,
      JSON.stringify({
        // "cardNumber": cardno,

        "id": id,
        "default": defaultCheck,
        "nickname":name
      }),
      { headers: header }).map((response: Response) => response.json());
  }
  addwishlist(book, course, flashcard, notes) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'bid/postwishlist/' + this.current.user_id,
      JSON.stringify({
        book: book,
        course: course,
        flashcard: flashcard,
        notes: notes,
        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  payment( notes, course,  flashcard, book,  cardHolderName,cardnickname,  creditno, ccv, exp, card_type  ) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });

      headers.append('Content-Type', 'application/json', );
    return this.http.post(Config.api + 'purchase/cartpayment/'  ,
      JSON.stringify({
        notes: notes,
        course: course,
        flashcard: flashcard,
        book: book,
        userid: this.current.user_id,
        card_holder:cardHolderName,
        nickname: cardnickname,
        creditno: creditno,
        ccv: ccv,
        exp: exp,
        card_type: card_type,
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  // payments( creditno, ccv, exp,card_type, id  ) {
  //   alert(id)
  //   alert(creditno.slice(0,1))
  //   const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });

  //   if (creditno.slice(0,1) === '*'){
  //     headers.append('Content-Type', 'application/json', );
  //     return this.http.post(Config.api + 'purchase/cartpayment/' + id,
  //       JSON.stringify({
  //         // book: book,
  //         // course: course,
  //         // flashcard: flashcard,
  //         // notes: notes,
  //       }),
  //       { headers: headers }).map((response: Response) => response.json());

  //   }
  //   else{
  //     headers.append('Content-Type', 'application/json', );
  //     return this.http.post(Config.api + 'purchase/cartpayment/'  ,
  //       JSON.stringify({
  //         // book: book,
  //         // course: course,
  //         // flashcard: flashcard,
  //         // notes: notes,
  //         userid: this.current.user_id,
  //         creditno: creditno,
  //         ccv: ccv,
  //         exp: exp,
  //         card_type: card_type
  //       }),
  //       { headers: headers }).map((response: Response) => response.json());
  //   }
  // }
  payments(notes, course,  flashcard, book, id ) {
    // alert(id);
    const headers = new Headers({'Authorization': 'JWT ' + this.current.token});

    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/cartpayment/' + id,
      JSON.stringify({
        notes: notes,
        course: course,
        flashcard: flashcard,
        book: book,
      }),
      {headers: headers}).map((response: Response) => response.json());

  }
  addCard(cardno, ccv, expiryDate,cardHolderName, cardnickname, card_type,zipcode, 
    street, city, state,country, defaultCheck, ) {
      const headers = new Headers({'Authorization': 'JWT ' + this.current.token});
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
      { headers: headers }).map((response: Response) => response.json());
    }
    zipcode(zipCode) {    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/get_zipcode_data/' + zipCode,
      { headers: headers }).map((response: Response) => response.json());
  }
}
