import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from '../../Config';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from '../../serv/http-service';

@Injectable()
export class EventsService {

  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) { }
  Eventsshow(page) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + '/scholarships/geteventlist/?page=' + page + '', {headers: headers}).map((response: Response) => response.json());
  }

}
