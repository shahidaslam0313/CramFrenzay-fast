import { EventEmitter, Inject, Injectable, Output, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, Response } from '@angular/http';
import { Config } from './Config';
import { Http } from '@angular/http';
import { isPlatformBrowser } from '@angular/common';
import { HttpService } from './serv/http-service';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  private watchlist = new BehaviorSubject('default message');
  currentMessage = this.watchlist.asObservable();

  private globalcart = new BehaviorSubject<any>('');
  globalcart$ = this.globalcart.asObservable();

  private GlobalWishListCourses = new BehaviorSubject<any>('');
  GlobalWishListCourses$ = this.GlobalWishListCourses.asObservable();


  private emptyWishlistGlobal = new Subject<boolean>();
  emptyWishlistGlobal$ = this.emptyWishlistGlobal.asObservable();

  private tokenGlobal = new BehaviorSubject<boolean>(false);
  tokenGlobal$ = this.tokenGlobal.asObservable();


  private checkingUserRole = new BehaviorSubject<string>('');
  checkingUserRole$ = this.checkingUserRole.asObservable();
  // constructor() { }
  username;
  currentuser;
  current;
  token;
  private caseNumber;
  caseNumber$;
  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.current && this.current.token;
    }
    {

      const headers = new Headers();
      if (isPlatformBrowser(this.platformId)) {
        headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
      }
      if (isPlatformBrowser(this.platformId)) {
        this.caseNumber = new BehaviorSubject<any>(localStorage.getItem('loged_in'));
        this.caseNumber$ = this.caseNumber.asObservable();
      }
    }
  }
  changeMessage(message: string) {
    this.watchlist.next(message)
  }

  publishData(data: any) {
    this.caseNumber.next(data);
  }
  getGolbalWishListCourses(data: any) {
    this.GlobalWishListCourses.next(data);

    // console.log('get catec ',data)
  }
  getemptyWishlistGlobal(data: any) {
    this.emptyWishlistGlobal.next(data);
    // console.log('get catec ',data)
  }
  setGlobalToken(data: any) {
    this.tokenGlobal.next(data);
    // alert('token is set to be ' + data);
  }
  checkUserRole(data: any) {
    this.checkingUserRole.next(data);
  }
  public emittedData(data) {
    // console.log(data);
    this.fire.emit(data);
  }
  public emittData(data){
    this.fire.emit(data);
  }

  getEmittedValue() {
    return this.fire;
  }
  getEmittValue(){
    return this.fire;
  }
  ////////// get cart items//////
  getcart(data: any) {
    this.globalcart.next(data)
  }
  ///////////categories sliders fro whole site////////

  InnerslideronMainPage() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/categorylist', { headers: headers }).map((response: Response) => response.json());
  }

  ////////////// nested category //////////
  nestedcategory(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'course/nestedcategory/' + id, { headers: headers }).map((response: Response) => response.json());
  }
  //////////////bid notes///////////
  bidnotes(notes, bidamount) {

    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'bid/BidUserNotes/',
      JSON.stringify({
        notes: notes,
        bidamount: bidamount

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  ////////////bid on books///////
  bidonbook(book, bidamount) {

    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'bid/BidUserBook/',
      JSON.stringify({
        book: book,
        bidamount: bidamount

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  ///////////// bid on course///////

  bidoncourses(course, bidamount) {

    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'bid/BidUserCourse/',
      JSON.stringify({
        course: course,
        bidamount: bidamount

      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  /////////bid on falsh card //////
  bidoncards(flashcard, bidamount) {

    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'bid/BidUserFlashcard/',
      JSON.stringify({
        flashcard: flashcard,
        bidamount: bidamount

      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  /////////////////// watch list //////////
  addwishlist(book, course, flashcard, notes) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'bid/postwishlist/' + JSON.parse(localStorage.getItem('currentUser')).user_id,
      JSON.stringify({
        book: book,
        course: course,
        flashcard: flashcard,
        notes: notes,
        userid: JSON.parse(localStorage.getItem('currentUser')).user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  /////////////// Offer Now/////////////

  acceptoffer(notes, course, book, flashcard, offer_price, end_time) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/sendingOfferonCourse/',
      JSON.stringify({
        notes: notes,
        course: course,
        book: book,
        flashcard: flashcard,
        offer_price: offer_price,
        end_time : end_time
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  //////////////////// Add to Cart/////////////////
  addtocart(notes, course, book, flashcard) {
    let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/postcheckout/' + JSON.parse(localStorage.getItem('currentUser')).user_id,
      JSON.stringify({
        notes: notes,
        course: course,
        book: book,
        flashcard: flashcard,
        userid: this.current.user_id
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  ////////////////Delete From Cart///////////
  delcart(id) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'purchase/deletecheckoutlist/' + id, { headers: headers }).map((response: Response) => response.json());
  }
  ////////////////get offer history///////////
  offerhistory(notes, course, book, flashcard) {
    if (localStorage.getItem('currentUser')) {
    const headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/accept_offer_history/' ,
    JSON.stringify({
      notes: notes,
      course: course,
      book: book,
      flashcard: flashcard,
    
    }), { headers: headers }).map((response: Response) => response.json());
  }
}
}