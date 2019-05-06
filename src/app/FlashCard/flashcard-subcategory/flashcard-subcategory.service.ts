import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../../Config";
@Injectable()
export class cardsubcategoryeservice {
  notesSubcat(id: any) {
    const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'flash/SubCategoryFlashcardList/' + id, { headers: headers }).map((response: Response) => response.json());
  }
    constructor(private http: Http,@Inject(PLATFORM_ID) private platformId: Object) { }

    Catwisecards(Cid) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'course/subcategory/' + Cid + '', { headers: headers }).map((response: Response) => response.json());
    }
}