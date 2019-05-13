import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { Config } from '../../Config';
import { booksservice } from '../books/books.service';
import { SearchbooksService } from '../searchbooks/searchbooks.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PagerService } from '../../paginator.service';

import swal from "sweetalert2";
@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.scss']
})
export class SearchbooksComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  public name;
  public books;
  public full;
  pager: any = {};
  public result;
  Eid;
  public username;
  fullname;
  searchResult: any = [];
  query;

  currentuser;
  constructor(private router: Router, private pagerService: PagerService, private route: ActivatedRoute, private sg: SimpleGlobal, private newservice: booksservice, private service: SearchbooksService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
    }
  }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.name = localStorage.getItem('name');
      this.againbooksearch(this.name);
    }

    this.route.params.subscribe(params => { });
    this.sub = this.route.params.subscribe(params => {
      this.Eid = +params['id'];
    });
    (this.Eid)


    this.againbooksearch(this.full);
  }
  setPagecourse(page: number, total) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.service.searchbooks(this.full, page).subscribe(data => {
      this.result = data.Books;
      this.pager = this.pagerService.getPager(data.totalItems, page, 5);

    });
  };
  checkcourse() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertcourse();
      this.router.navigate(['/login']);
    }
  }

  check_login() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        let local = localStorage.getItem('currentUser');
        return true;
      }
      else {
        return false;
      }
    }

  }

  sweetalertcourse() {
    swal({
      // text:"Error",
      text: ' Please Login to access this functionality ',
      title: 'Authentications Required',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#cc0000', timer: 2000,
      confirmButtonText: 'OK',
    });
  }


  againbooksearch(query) {
    this.full = query;
    this.router.navigate(['/searchbooks/' + query])
    this.service.searchbooks(query, 1).subscribe(data => {
      this.result = data.Books;
      this.setPagecourse(1, data.totalItems)
    }
    );
  }
  filter(query) {
    if (query != "") {
      this.service.searchbooks(query, 1).subscribe(data => {
        this.searchResult = data.Books;
      })
    }
  }
}
