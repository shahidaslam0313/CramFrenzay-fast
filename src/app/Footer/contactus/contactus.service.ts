import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';

@Injectable()
export class contactusService {
  result: any;

  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  contactus(user: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(Config.api + '/user/contactus/', JSON.stringify(user), options)
      .map(res => this.result = res.json());
  }
}
