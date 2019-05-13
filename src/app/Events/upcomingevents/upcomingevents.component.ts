import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UpcomingeventsService } from './upcomingevents.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'app-upcomingevents',
  templateUrl: './upcomingevents.component.html',
  styleUrls: ['./upcomingevents.component.scss']
})
export class UpcomingeventsComponent implements OnInit {

  result: any[];
  January = '';
  Febrary = '';
  March = '';
  April = '';
  May = '';
  June = '';
  July = '';
  August = '';
  September = '';
  October = '';
  November = '';
  Decembere = '';
  selectedvalue;
  private username;
  currentuser;

  constructor(private serv: UpcomingeventsService, @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('products'));
      this.currentuser = this.username.asObservable();
    }
  }
  ngOnInit() {
  }

  check(event) {
    this.serv.Eventsbymonth(event.value).subscribe(data => {
      this.result = data;
    });
  }
}

