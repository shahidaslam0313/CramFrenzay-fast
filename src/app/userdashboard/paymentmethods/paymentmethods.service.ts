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

  addCard(cardno, ccv, expiryDate,cardHolderName, cardnickname, card_type,zipCode, 
    street, city, state,country, defaultCheck, ) {
    let header = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    header.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/addcard/' + this.currentUser.user_id,
      JSON.stringify({

        "cardNumber": cardno,
        "ccv": ccv,
        "expiryDate": expiryDate,
        "user": this.currentUser.user_id,
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
