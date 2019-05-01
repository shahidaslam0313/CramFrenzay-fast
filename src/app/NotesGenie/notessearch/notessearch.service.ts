import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { HttpService } from '../../serv/http-service';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class NotessearchService {
  public name;

  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', this.name);
    }
  }
  notessearch(name, page) {
    return this.http.get(Config.api + '/notesgenie/search/' + name + '/?page=' + page + '').map((response: Response) => response.json());
  }
  mazeednotessearch(full, page) {
    return this.http.get(Config.api + '/notesgenie/search/' + full + '/' + '?page=' + page).map((response: Response) => response.json());
  }
}
