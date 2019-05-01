import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "./Config";

@Injectable()
export class MycourceService {
  result: any[] = [];
  constructor(private http: Http) { }

  Ourcourse() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/courselist/', { headers: headers }).map((response: Response) => response.json());
  }
}
