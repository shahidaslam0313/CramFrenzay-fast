import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../../Config";
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class categorywisenotesservice {

  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  Catwisenotes(Cid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/subcategory/' + Cid + '', { headers: headers }).map((response: Response) => response.json());
  }
  notesSubcat(id) {
    const headers = new Headers
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'notesgenie/notescategorylist/' + id, {headers: headers}).map((response: Response) => response.json());
}
}
