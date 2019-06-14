import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()

export class uploadnotesservice {
model;
  months: any[];
  public username;
  current;
  currentuser;
  constructor(private http: Http, private http2: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
  }


  uploading(model, notessubcategories, subcategory , nestedcategory , sell_status ,accept_offer, sell_days, notes_thumbnail,  end_time , bid_status, min_amount, max_amount, initial_amount, reservedprice) {

    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'notesgenie/postnotes/',
      JSON.stringify({
        userid: this.current.user_id,
        name: model.name,
        detail: model.detail,
        categories: notessubcategories,
          subcategory : subcategory,
        nestedcategory : nestedcategory,
        sell_status : sell_status,
        price: model.price,
        sell_days: sell_days,
        notes_thumbnail: notes_thumbnail,
        accept_offer : accept_offer,
        data : model.datafile,
        bidnotes: {
          initial_amount: initial_amount,
          end_time : end_time,
          isreserved : model.isreserved,
          reservedprice : reservedprice,
          start_time : model.start_time,
          bid_status : bid_status
        },
        min_amount: min_amount,
        max_amount: max_amount
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  Coursesonnotes() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/categorylist/', { headers: headers }).map((response: Response) => response.json());
  }
  notesTypes(id) {
    // alert()
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api +'notesgenie/usernotes/' + this.current.user_id , { headers: headers }).map((response: Response) => response.json());
  }
  //////////////bid notes///////////
  bidnotes(model, notes, flashcard, course, book) {

    const headers = new Headers( );
    headers.append('Content-Type', 'application/json');
    return this.http.post( Config.api + 'bid/notesbids',
      JSON.stringify({
        initial_amount: model.initial_amount,
        start_time: model.start_time,
        end_time: model.end_time,
        isreserved: model.isreserved,
        reservedprice: model.reservedprice,
        notes: notes,
        flashcard: flashcard,
        course: course,
        book: book,

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  Catwisenotes(Cid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/subcategory/' + Cid + '', { headers: headers }).map((response: Response) => response.json());
  }
  nestedwisenotes(Cid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/nestedcategory/' + Cid + '', { headers: headers }).map((response: Response) => response.json());
  }
  uploadNotesType(note , notestype, examNote , lectureNumber,  chapter ) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token } );
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'notesgenie/notesTypePost/',
      JSON.stringify({
        'note': note,
        'type' : notestype,
        'kind' : examNote,
        'lecture' : lectureNumber,
        'chapter' : chapter,
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}
