import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, NgControl, RadioControlValueAccessor, FormGroup } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class BecomepartnerService {

  constructor(private http: Http, private http2: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  registration(name, Email, Company) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'user/Partner_post/',
      JSON.stringify({
        name: name,
        Email: Email,
        Company: Company
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

}
