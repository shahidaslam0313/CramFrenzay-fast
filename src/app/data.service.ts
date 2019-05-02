
import { Inject, Injectable, PLATFORM_ID, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SimpleGlobal } from 'ng2-simple-global';
import { isPlatformBrowser } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  private sg: SimpleGlobal;
  private productsSource;
  currentProducts;
  currentUser;
  username;
  token;
  private messageSource = new BehaviorSubject<any>('');
  currentMessage = this.messageSource.asObservable();

  private signout = new BehaviorSubject<any>('');
  Message = this.signout.asObservable();

  constructor( @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
      this.username = localStorage.getItem('currentUser');
      this.token = this.currentUser && this.currentUser.token;
    }
  }
  changeMessage(message) {
    this.messageSource.next(message);
  }
  logout(message) {
    this.signout.next(message);
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
    return this.fire
  }
}
