import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';

@Injectable()
export class subcategoryservice {
    public username;
    currentuser;
    current;
    token;

    constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    Subcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'course/subcategory/' + id, {headers: headers}).map((response: Response) => response.json());
    }

    courseSubcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'course/coursebycategory/' + id, {headers: headers}).map((response: Response) => response.json());
    }

    notesSubcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'notesgenie/notescategorylist/' + id, {headers: headers}).map((response: Response) => response.json());
    }

    cardsSubcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'flash/CategoryFlashcardList/' + id, {headers: headers}).map((response: Response) => response.json());
    }

    bookSubcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'book/cagtegorywisebook/' + id, {headers: headers}).map((response: Response) => response.json());
    }

    notesnestedcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'notesgenie/notessubcategorylist/' + id, {headers: headers}).map((response: Response) => response.json());

    }
    coursenestedcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'course/coursebysubcategory/' + id, {headers: headers}).map((response: Response) => response.json());

    }
    cardsnestedcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'flash/SubCategoryFlashcardList/' + id, {headers: headers}).map((response: Response) => response.json());

    }
    booknestedcat(id) {
        const headers = new Headers
        headers.append('Content-Type', 'application/json');
        return this.http.get(Config.api + 'book/nested_categorywise_book/' + id,
        {headers: headers}).map((response: Response) => response.json());

    }
}
