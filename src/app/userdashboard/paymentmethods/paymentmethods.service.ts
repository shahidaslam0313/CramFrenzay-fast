import { Headers } from '@angular/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpService } from '../../serv/http-service';
import { Config } from '../../Config';

@Injectable()
export class PaymentmethodsService {
  currentUser;
  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  addCard(cardno, ccv, expiryDate, cardnickname, card_type, defaultCheck ) {
    let header = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    header.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/addcard/' + this.currentUser.user_id,
      JSON.stringify({

        "cardNumber": cardno,
        "ccv": ccv,
        "expiryDate": expiryDate,
        "user": this.currentUser.user_id,
        "nickname": cardnickname,
        "default": defaultCheck,
        "card_type": card_type

      }),
      { headers: header }).map((response: Response) => response.json());
  }

  showCards() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/getcards/' + this.currentUser.user_id, { headers: headers }).map((response: Response) => response.json());
  }

  singleCard(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/editdeletecard/' + id, { headers: headers }).map((response: Response) => response.json());
  }

  updateCard( nickname, status , id) {
    let header = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    header.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'purchase/editdeletecard/' + id,
      JSON.stringify({

        "nickname": nickname,
        "default": status,
        "id": id,
      }),
      { headers: header }).map((response: Response) => response.json());
  }

  deleteCard(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'purchase/editdeletecard/' + id, { headers: headers }).map((response: Response) => response.json());
  }
}
