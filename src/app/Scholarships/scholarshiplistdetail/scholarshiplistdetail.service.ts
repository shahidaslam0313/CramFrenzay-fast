import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config"

@Injectable()
export class ScholarshiplistdetailService {

  constructor(private http: Http) { }

  ourscholarlistdetail(scholarshiplistId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'scholarships/scholarshipbyinstitute/' + scholarshiplistId + '', { headers: headers }).map((response: Response) => response.json());
  }

}
