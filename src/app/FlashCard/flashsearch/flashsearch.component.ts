import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Config } from '../../Config';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FlashsearchService } from './flashsearch.service';
import { PagerService } from '../../paginator.service';
import { FlashcardlistService } from '../flashcardlist/flashcardlist.service';

@Component({
  selector: 'app-flashsearch',
  templateUrl: './flashsearch.component.html',
  styleUrls: ['./flashsearch.component.scss']
})
export class FlashsearchComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  public name;
  public result;
  private productsSource;
  currentProducts;
  full;
  Eid;
  query;
  pager: any = {};
  searchResult: any = [];
  public searchResultStatus = true ;


  constructor(private router: Router, private pagerService: PagerService, private route: ActivatedRoute,  private newservice: FlashsearchService, private flash: FlashcardlistService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.Eid = params['name'];
    });


    this.againflashesearch(this.Eid);
  }
  setPageflashcard(total, page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.newservice.flashsearch(this.full, page).subscribe(data => {
      this.result = data.Course;
      this.pager = this.pagerService.getPager(data.totalItems, page, 5);

    });
  };
  checkflashcard() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertflashcard();
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

  sweetalertflashcard() {
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


  againflashesearch(query) {
    this.full = query;
    this.newservice.flashsearch(query, 1).subscribe(data => {
      this.result = data.Flashcard;
      // this.setPagenotes(1, data.totalItems)
      if (this.result.length <= 0) {
        this.searchResultStatus = null;
      }
    }
    );
  }
  // filter(query) {
  //   if (query != "") {
  //     this.flash.flashsearch(query).subscribe(data => {
  //       this.searchResult = data.Flashcard;
  //       if (this.searchResult.length <= 0) {
  //         this.searchResultStatus = false;
  //       }
  //     })
  //   }
  // }
  filter(query) {
    if (query != "") {

      this.flash.flashsearch(query).subscribe(Res => {
        this.searchResult = Res.flashcards;
        if (this.searchResult.length <= 0) {
          this.searchResultStatus = false;
        }
      })
    }
  }
}
