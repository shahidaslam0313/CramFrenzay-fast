import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from '../../Config';
import {isPlatformBrowser} from '@angular/common';
@Injectable()
export class categoriesservice {
  public name;


  constructor(private http: Http,@Inject(PLATFORM_ID) private platformId: Object) { }
  coursesearch(name) {
    console.log(name)
    return this.http.get(Config.api + '/course/searchlist/' + name + '/').map((response: Response) => response.json());
  }

}
