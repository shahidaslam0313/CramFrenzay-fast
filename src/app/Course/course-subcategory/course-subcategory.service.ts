import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../../Config";
@Injectable()
export class categorywisecourseservice {

  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  Catwisenotes(Cid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/subcategory/' + Cid + '', { headers: headers }).map((response: Response) => response.json());
  }
  courseSubcat(id) {
    const headers = new Headers
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/coursebycategory/' + id, {headers: headers}).map((response: Response) => response.json());
}
}
