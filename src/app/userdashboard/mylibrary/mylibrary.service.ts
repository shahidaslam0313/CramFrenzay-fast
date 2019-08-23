import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from "../../Config";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()
export class MylibraryService {
  public username;
  user_id;
  currentProducts;
  currentuser;
  current;
  token;
  model: any = {};
  constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object, private _nav: Router) {
    this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentuser = this.username.asObservable();
    this.current = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.current && this.current.token;
  }

  mycourses(page) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/usercourses/' + this.current.user_id +'?page=' +page, { headers: headers }).map((response: Response) => response.json());
  }

  mybooks(page) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'book/userbooks/' + this.current.user_id +'?page=' +page, { headers: headers }).map((response: Response) => response.json());
  }

  mynotes(page) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'notesgenie/usernotes/' + this.current.user_id +'?page=' +page, { headers: headers }).map((response: Response) => response.json());
  }

  mycards(page) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'flash/userflashcards/' + this.current.user_id + '?page=' +page, { headers: headers }).map((response: Response) => response.json());
  }
  mycardsdelete(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'flash/searchflashbyuser/' + id + '', { headers: headers }).map((response: Response) => response.json());
  }
  mycardsedit(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'flash/searchflashbyuser/' + id + '', { headers: headers }).map((response: Response) => response.json());
  }



  delcourse(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    return this.http.delete(Config.api + 'course/searchusercourse/' + id + '', { headers: headers }).map((response: Response) => response.json());

  }

  delbook(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    return this.http.delete(Config.api + 'book/bookdel/' + id + '', { headers: headers }).map((response: Response) => response.json());
  }
  delnotes(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    return this.http.delete(Config.api + 'notesgenie/searchnotesbyuser/' + id + '', { headers: headers }).map((response: Response) => response.json());
  }

  courseedit(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/searchusercourse/' + id , { headers: headers }).map((response: Response) => response.json());
  }

  //------------------------------------------------------Start Here With Out Token ------------------------------------------------------
  Eachnotes(id) {

    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'notesgenie/searchnotesbyuser/' + id + '', { headers: headers }).map((response: Response) => response.json());
  }

  getnotesid(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'notesgenie/eachnotes/' + id , { headers: headers }).map((response: Response) => response.json());
  }

  CoursesonHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/sublist', { headers: headers }).map((response: Response) => response.json());
  }
  subcategory() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/categorylist', { headers: headers }).map((response: Response) => response.json());
  }

  booksdetail(id) {
    const headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'book/bookdel/' + id + '', { headers: headers }).map((response: Response) => response.json());
  }

  //------------------------------------------------------Ends Here With Out Token ------------------------------------------------------

  /////update book///
  uploading1(id, name, author_name, categories, subcategories, nestedcategory, book_detail, book_edition, ISBN, min_amount, max_amount, sell_status, price, sell_days, bid_status, book_image, datafile ) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'book/bookdel/' + id,
      {
        userid: this.current.user_id,
        name: name,
        author_name: author_name,
        categories: categories,
        subcategories: subcategories,
        nestedcategory: nestedcategory,
        book_detail: book_detail,
        book_edition: book_edition,
        ISBN: ISBN,
        min_amount: min_amount,
        max_amount: max_amount,
        sell_status: sell_status,
        price: price,
        sell_days: sell_days,
        bid_status: bid_status,
        book_image: book_image,
        data: datafile
      },
      { headers: headers })
  }
  uploading(id, bidid, name, author_name, categories, subcategories, nestedcategory, book_detail, book_edition, ISBN, min_amount, max_amount, sell_status, price, sell_days, bid_status, book_image, datafile,
    initial_amount, end_time, isreserved, reservedprice, start_time, ) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'book/bookdel/' + id,
      {
        userid: this.current.user_id,
        name: name,
        author_name: author_name,
        categories: categories,
        subcategories: subcategories,
        nestedcategory: nestedcategory,
        book_detail: book_detail,
        book_edition: book_edition,
        ISBN: ISBN,
        min_amount: min_amount,
        max_amount: max_amount,
        sell_status: sell_status,
        price: price,
        sell_days: sell_days,
        bid_status: bid_status,
        book_image: book_image,
        data: datafile,
        bidbooks: {
          id: bidid,
          initial_amount: initial_amount,
          end_time: end_time,
          isreserved: isreserved,
          reservedprice: reservedprice,
          start_time: start_time,
          book: id
        }
      },
      { headers: headers })
  }

  /////update course/////
  updatecourse1(id,name, description, categories, subcategories, nestedcategory, min_amount, max_amount, sell_status, price, sell_days, datafile, course_thumbnail){
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'course/searchusercourse/' + id,
      {
        userid: this.current.user_id,
        name: name,
        description: description,
        categories: categories,
        subcategories: subcategories,
        nestedcategory: nestedcategory,
        min_amount: min_amount,
        max_amount: max_amount,
        sell_status: sell_status,
        actual_price: price,
        sell_days: sell_days,
        data: datafile,
        course_thumbnail: course_thumbnail,
      },
      { headers: headers })
  }
  updatecourse(id, bidid, name, description, categories, subcategories, nestedcategory, min_amount, max_amount, sell_status, price, sell_days, datafile, course_thumbnail,
    initial_amount, end_time, isreserved, reservedprice, start_time, bid_status) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'course/searchusercourse/' + id,
      {
        userid: this.current.user_id,
        name: name,
        description: description,
        categories: categories,
        subcategories: subcategories,
        nestedcategory: nestedcategory,
        min_amount: min_amount,
        max_amount: max_amount,
        sell_status: sell_status,
        actual_price: price,
        sell_days: sell_days,
        data: datafile,
        course_thumbnail: course_thumbnail,
        bidcourse: {
          id: bidid,
          initial_amount: initial_amount,
          end_time: end_time,
          isreserved: isreserved,
          reservedprice: reservedprice,
          start_time: start_time,
          bid_status: bid_status,
          course: id
        }
      },
      { headers: headers })
  }
  //////update notes/////////
    updatenote1(id, name, detail, categories, subcategory, nestedcategory, min_amount, max_amount,
      sell_status, price, sell_days, notes_thumbnail, datafile, bid_status) {
      let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
      headers.append('Content-Type', 'application/json');
      return this.http.put(Config.api + 'notesgenie/searchnotesbyuser/' + id,
        {
          userid: this.current.user_id,
          name: name,
          detail: detail,
          categories: categories,
          subcategory: subcategory,
          nestedcategory: nestedcategory,
          min_amount: min_amount,
          max_amount: max_amount,
          sell_status: sell_status,
          price: price,
          sell_days: sell_days,
          notes_thumbnail: notes_thumbnail,
          data: datafile,
          bid_status: bid_status,
        },
        { headers: headers })
  }
  updatenote(id, bidid, initial_amount, end_time, isreserved, reservedprice, start_time, name, detail, categories, subcategory, nestedcategory, min_amount, max_amount,
    sell_status, price, sell_days, notes_thumbnail, datafile, bid_status) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'notesgenie/searchnotesbyuser/' + id,
      {
        userid: this.current.user_id,
        name: name,
        detail: detail,
        categories: categories,
        subcategory: subcategory,
        nestedcategory: nestedcategory,
        min_amount: min_amount,
        max_amount: max_amount,
        sell_status: sell_status,
        price: price,
        sell_days: sell_days,
        notes_thumbnail: notes_thumbnail,
        data: datafile,
        bid_status: bid_status,
        bidnotes: {
          id: bidid,
          notes: id,
          initial_amount: initial_amount,
          end_time: end_time,
          isreserved: isreserved,
          reservedprice: reservedprice,
          start_time: start_time,

        }

      },
      { headers: headers })
  }

  ///////////////update flash cards////////////
  uploadcard1(id, name, no_of_terms, category, subcategory, nestedcategory, min_amount, max_amount, bid_status, price, flashcard_image){
    let headers = new Headers({ 'Authorization': ' JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'flash/searchflashbyuser/' + id,
      {
        user_id: this.current.user_id,
        name: name,
        no_of_terms: no_of_terms,
        category: category,
        subcategory: subcategory,
        nestedcategory: nestedcategory,
        min_amount: min_amount,
        max_amount: max_amount,
        bid_status: bid_status,
        price: price,
        flashcard_image: flashcard_image,
      },
      { headers: headers })
  }
  uploadcard(id, bidid, name, no_of_terms, category, subcategory, nestedcategory, min_amount, max_amount, bid_status, price, flashcard_image, initial_amount, end_time, isreserved, reservedprice, start_time) {
    let headers = new Headers({ 'Authorization': ' JWT ' + this.current.token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'flash/searchflashbyuser/' + id,
      {
        user_id: this.current.user_id,
        name: name,
        no_of_terms: no_of_terms,
        category: category,
        subcategory: subcategory,
        nestedcategory: nestedcategory,
        min_amount: min_amount,
        max_amount: max_amount,
        bid_status: bid_status,
        price: price,
        flashcard_image: flashcard_image,
        bidflashcard: {
          id: bidid,
          initial_amount: initial_amount,
          end_time: end_time,
          isreserved: isreserved,
          reservedprice: reservedprice,
          start_time: start_time,
          notes: id
        }
      },
      { headers: headers })
  }
  //////////Publish Notes//////////
  publishitems(notes,course,flashcard,book) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'bid/publishContent/',
      JSON.stringify({
        notes:notes,
        course: course,
        flashcard: flashcard,
        book: book,
        publish_status : true
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
}

