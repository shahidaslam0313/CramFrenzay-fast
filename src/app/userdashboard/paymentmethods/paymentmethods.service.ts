import { Headers } from '@angular/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpService } from '../../serv/http-service';
import { Config } from '../../Config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import swal from 'sweetalert2';


@Injectable()
export class PaymentmethodsService {
  currentUser;
  user_id;
  currentProducts;
  currentuser;
  current;
  token;
  username;
  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.current && this.current.token;
  }

  addCard(cardno, ccv, expiryDate, cardHolderName, cardnickname, card_type, zipCode,
    street, city, state, country, defaultCheck, ) {
    let header = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    header.append('Content-Type', 'application/json');
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
        "zip_code": zipCode,
        "street_adrress": street,
        "city": city,
        "state": state,
        "country": country,
      }),
      { headers: header }).map((response: Response) => response.json());
  //     { headers: header }).map((res: Response) => {
  //       if (res) {

  //         if (res.status === 201 || res.status === 200) {
  //           const responce_data = res.json();

  //           return responce_data;
  //         }
  //       }
  //     }).catch((error: any) => {
  //       // alert(error.status);
  //       if (error.status === 302) {
  //         // if (error.stats == 302) {
  //         swal({
  //           type: 'error',
  //           title: 'This Card Already Exist',
  //           showConfirmButton: false,
  //           timer: 1500, width: '512px',
  //         })
  //         // }
  //         return Observable.throw(new Error(error.status));
  //       } else if (error.status === 405) {

  //         swal({
  //           type: 'error',
  //           title: 'Invalid Card! Please Enter Correct Details',
  //           showConfirmButton: false,
  //           timer: 1500, width: '512px',
  //         })

  //         return Observable.throw(new Error(error.status));
  //       } else {
  //         swal(
  //           'Sorry',
  //           'You cannot enter card more than 8 cards',
  //           'error'
  //         )

  //         return Observable.throw(new Error(error.status));
  //       }
  //     });
  }

  showCards() {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/getcards/' + this.current.user_id, { headers: headers }).map((response: Response) => response.json());
  }

  singleCard(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/editdeletecard/' + id, { headers: headers }).map((response: Response) => response.json());
  }

  updateCard(nickname, street_adrress, state, city, zip_code, country, status, id) {
    let header = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    header.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'purchase/editdeletecard/' + id,
      JSON.stringify({

        "nickname": nickname,
        "street_adrress": street_adrress,
        "state": state,
        "city": city,
        "zip_code": zip_code,
        "country": country,
        "default": status,
        "id": id,
      }),
      { headers: header }).map((response: Response) => response.json());
  }

  deleteCard(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'purchase/editdeletecard/' + id, { headers: headers }).map((response: Response) => response.json());
  }

  zipcode(zipCode) {    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/get_zipcode_data/' + zipCode,
      { headers: headers }).map((response: Response) => response.json());
  }
}
