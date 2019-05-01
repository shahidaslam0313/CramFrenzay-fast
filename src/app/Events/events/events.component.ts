import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../data.service';
import { EventsService } from './events.service';
import { PagerService } from '../../paginator.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  result;
  pager: any = {};
  private productsSource;
  currentProducts;

  constructor(private pagerService: PagerService, private events: EventsService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.setPage(1);

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.events.Eventsshow(page).subscribe(data => {
      this.result = data;
      this.pager = this.pagerService.getPager(this.result['totalItems'], page, 10);
    });
  }
}
