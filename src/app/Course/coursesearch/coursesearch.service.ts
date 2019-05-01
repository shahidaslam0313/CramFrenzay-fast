import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class CoursesearchService {

  constructor(private http: Http,@Inject(PLATFORM_ID) private platformId: Object) { }

  coursesearch(name,page) {    
    return this.http.get(Config.api + 'course/searchlist/'+name+'/?page='+page+'/').map((response: Response) => response.json());
  }
}
