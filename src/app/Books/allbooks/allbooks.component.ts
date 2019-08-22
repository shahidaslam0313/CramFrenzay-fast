import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AllbooksService } from './allbooks.service';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GlobalService } from '../../global.service';
import { MatDialog } from '@angular/material';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import {BidHistoryService} from "../../bid-history/bid-history.service";
import { WishlistService } from 'app/wishlist/wishlist.service';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

declare const $: any;
@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.scss']
})
export class AllbooksComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  result;
  pager: any = {};
  public name;
  bidbooks;
  inner;
  booktrend;
  token;
  trends;
  bidform = new FormGroup({
    bidamount: new FormControl('',[
      Validators.required
    ])
  })
  public searchResultStatus = true;
  slideConfig2 = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: '<button class="slick-main-btn-left"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-main-btn-right"><i class="fa fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    prevArrow: '<button class="slick-main-btn-left"><i class="fa fa-angle-left"></i></button>',
    nextArrow: '<button class="slick-main-btn-right"><i class="fa fa-angle-right"></i></button>',
    infinite: true,
    responsive: [
      {
        breakpoint: 1154,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true
        }
      },
      {
        breakpoint: 942,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 512,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  };
  top;
  toprate;
  query;
  bidallbooks;
  bidbookid;
  model: any = {};
  searchResult: any = [];
  private productsSource;
  currentProducts;
  wishlist;
  username;
  currentuser;
  current;
  currentUser;
  cartitems;
  notes;
  course;
  flashcard

  constructor(private bidings: BidHistoryService,private headServ: headerservice, private Data: DataService, private see: WishlistService, private mainpage: mainpageservice, private pagerservice: PagerService, public book: AllbooksService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, private global: GlobalService, public dialogRef: MatDialog) {
    this.BidBuybooks();
    this.Innerslider();
    this.trendbooks();
    this.recentllybooks();
    this.biding();
    this.topratedbooks();
  }
  openDialog3(book): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          book: book,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
    this.showhistory(this.notes, this.course, this.flashcard, book);
  }
  showhistory(notes,course, flashcard, book ) {
    return this.global.offerhistory(notes, course, flashcard ,book )
 }
  ngOnInit() {
    window.scroll(0, 0)
    $('.slick-testimonial').slick({
      slidesToShow: 2,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });

    const mainSearch = $('.main-search');
    const formSearch = $('.form-search');

    $('#searchIcon').click(function () {
      $(mainSearch).addClass('active');
      $('body').addClass('noScroll');
      $(formSearch).addClass('flipInX');

      setTimeout(function () {
        $('.form-search .mat-input-element').focus();
      }, 370);

    });

    $('#closeSearch').click(function () {
      $(mainSearch).removeClass('active');
      $('body').removeClass('noScroll');
      $(formSearch).removeClass('flipInX');
    });


  }

  sweetalertlogin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  id;
  books(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {bookid : id}});
      localStorage.setItem('books', id);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
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

  Innerslider() {
    this.book.InnerslideronMainPage().subscribe(data => {
      this.inner = data;
    });
  }
  biding() {
    this.book.BidBooks().subscribe(data => {
      this.bidallbooks = data;

    })
  }
  BidBuybooks() {
    this.book.BidbuyBookson().subscribe(data => {
      this.bidbooks = data;
    });
  }

  trendbooks() {
    this.book.tradingBooks().subscribe(data => {
      this.trends = data;
    });
  }


  recentllybooks() {
    this.book.recentBooks().subscribe(data => {
      this.top = data;
    });
  }


  topratedbooks() {
    this.book.topratedBooks().subscribe(data => {
      this.toprate = data;
    });
  }
  addwishlist(book) {
    let course = null;
    let flashcard = null;
    let notes = null;
    this.mainpage.addwishlist(book, course, flashcard, notes).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully added to watch list',
        showConfirmButton: false,
        timer: 1500
      });
      this.BidBuybooks();
      this.trendbooks();
      this.recentllybooks();
      this.topratedbooks();
      this.headServ.showwishlist().subscribe(wishList => {
        this.wishlist = wishList;
        this.Data.emittedData(this.wishlist);
      })
    }, error => {
      if (error.status == 404) {
        swal({
          type: 'warning',
          title: 'This book is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (error.status == 406) {
        swal({
          type: 'error',
          title: 'Book Already Purchased',
          showConfirmButton: false,
          timer: 1500
        })
      }

    });
  }
  submit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
    }
  }
  filter(query) {
    if (query != "") {
      this.book.searchbooks(query).subscribe(data => {
        this.searchResult = data.books;
        if (this.searchResult.length <= 0) {
          this.searchResultStatus = false;
        }
      })
    }
  }
  onsubmit(query) {
    this.router.navigate(['/searchbooks/' + query]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', query);
    }
  }
  /////////////biding in books/////////
  booksid(id) {
    if (this.check_login() == true) {
      this.bidbookid = id;
      this.getbookbidhistory(this.bidbookid);
    } else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }


  bidc(f: NgForm) {
    if(this.bidform.controls.bidamount.valid){
    this.global.bidonbook(this.bidbookid, this.bidform.value['bidamount'])
      .subscribe(Res => {
        swal({
          type: 'success',
          title: 'Your bid is listed',
          showConfirmButton: false,
          timer: 5500
        });
      },
        error => {
          if(error.status==403){
            swal({
              type: 'error',
              title: 'Bid higher amount',
              showConfirmButton: false,
              timer: 5500
            });
          }
        }
      );
      f.resetForm()
    }
    else 
    swal({
      type: 'error',
      title: 'Bid amount is required',
      showConfirmButton: false,
      timer: 1500
    });
  }
  addcart(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      notes = null;
      course = null;
      flashcard = null;
      this.mainpage.addtocart(notes, course, book, flashcard).subscribe(data => {
        this.global = data;
        swal({
          type: 'success',
          title: 'Item successfully added to Cart',
          showConfirmButton: false,
          timer: 2000
        });
        this.BidBuybooks();
        this.trendbooks();
        this.recentllybooks();
        this.topratedbooks();
        this.headServ.showCartItem().subscribe(cartitems => {
          this.cartitems = cartitems;
          this.Data.emittData(this.cartitems);
        })
      }, error => {
        if (error.status == 404)
          swal({
            type: 'warning',
            title: 'This item is already exist in your Cart',
            showConfirmButton: false,
            timer: 2000
          })
        else if (error.status === 406)
          swal({
            type: 'error',
            title: 'Item Already Purchased',
            showConfirmButton: false,
            timer: 2000
          })
      });
      // this.getwishlis()
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
  getbooks;
  booksendtime;
  getbookbidhistory(id) {
    this.bidings.bookbidhistory(this.bidbookid).subscribe(data => {
      this.booksendtime = data;
      this.getbooks = data['Highest Bid'];

    })
  }
  delBookFwishList(event) {
    this.see.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from watch list',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  delfromcart(event) {
    this.book.delcart(event.cart).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from cart',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}


