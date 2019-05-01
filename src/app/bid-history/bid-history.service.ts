import { Injectable } from '@angular/core';
import { Http , Response , Headers} from '@angular/http';
import { Config} from '../Config';
import 'rxjs/add/operator/map';
@Injectable()
export class BidHistoryService {

  constructor(private http: Http) { }
notebidhistory(id){
    return this.http.get(Config.api + 'bid/BidHistoryNotes/' + id ).map((response: Response) => response.json());
}
  coursebidhistory(id){
    return this.http.get(Config.api + 'bid/BidHistoryCourse/' + id ).map((response: Response) => response.json());
  }
  cardbidhistory(id){
    return this.http.get(Config.api + 'bid/BidHistoryFlashcard/' + id ).map((response: Response) => response.json());
  }
  bookbidhistory(id){
    return this.http.get(Config.api + 'bid/BidHistoryBook/' + id ).map((response: Response) => response.json());
  }
}
