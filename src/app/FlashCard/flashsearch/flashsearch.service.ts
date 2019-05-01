import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from "../../Config";
import {HttpService} from '../../serv/http-service';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class FlashsearchService {
  public name;
  constructor(private http: HttpService,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', this.name);
    }
  }
  flashsearch(name,page) {    
    return this.http.get(Config.api + 'flash/search/'+name+'/?page='+page+'').map((response: Response) => response.json());
  }
}
