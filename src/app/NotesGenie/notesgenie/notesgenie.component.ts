import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { notesgenieservice } from '../notesgenie/notesgenie.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map'
import { GlobalService } from '../../global.service';
import { Config } from "../../Config";
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import { WishlistService } from 'app/wishlist/wishlist.service';
import {BidHistoryService} from "../../bid-history/bid-history.service";
import { NgForm } from '@angular/forms';

declare const $: any;
@Component({
  selector: 'app-notesgenie',
  templateUrl: './notesgenie.component.html',
  styleUrls: ['./notesgenie.component.scss']
})
export class NotesgenieComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  result2;
  public sub: Subscription;
  public notesquery: any;
  public notesseraching: any;
  inner;
  id;
  bidnotes;
  bidnotesLength;
  trendingnotes;
  topratednotes;
  recentnotes;
  watchnotes;
  pager: any = {};
  public name;
  public searchResult: any;
  public searchResultStatus = true;
  query;
  bidonnotes;
  model: any = {};
  nullvalue = null;
  result;
  newid;
  notes;
  message: string;
  allbidid;
  wishlist;
  slideConfig2 = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: '<button class="slick-main-btn-left "><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-main-btn-right "><i class="fa fa-chevron-right"></i></button>',
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
  isreserved: boolean = false;
  constructor(private bidings: BidHistoryService,private headServ: headerservice,private see: WishlistService, private Data: DataService, private mainpage: mainpageservice, private pagerService: PagerService, private newservice: notesgenieservice, private router: Router, public global: GlobalService, @Inject(PLATFORM_ID) private platformId: Object, public dialogRef: MatDialog) {
    this.global.currentMessage.subscribe(message => this.message = message);
    this.Slider();
    this.bidnote();
    this.trendingnote();
    this.topratednote();
    this.recentnote();
    this.bidbuynotes();
  }
  openDialog3(notes): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          notes: notes,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
    this.showhistory(notes, this.course, this.flashcard, this.book);
  }
  showhistory(notes,course, flashcard, book ) {
    return this.global.offerhistory(notes, course, flashcard ,book )
 }
  ngOnInit() {
    window.scroll(0,0);
    this.global.currentMessage.subscribe(message => this.message = message);
    window.scroll(0, 0)
  }
  Slider() {
    this.global.InnerslideronMainPage().subscribe(Res => {
      this.inner = Res;
    });
  }
  checkmainpage(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {notesid : id}});
    }
    else if (this.check_login() == false) {
      this.sweetalertnotes();
      this.router.navigate(['/login']);
    }
  }
  sweetalertnotes() {
    throw new Error("Method not implemented.");
  }
  bidbuynotes() {
    this.newservice.Bidnote().subscribe(Res => {
      this.result = Res;
    })
  }
  bidnote() {
    this.newservice.Bidonnotes().subscribe(Res => {
      this.bidnotes = Res.courses;
      this.bidnotesLength = this.bidnotes;
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

  trendingnote() {
    this.newservice.Trendingnotes().subscribe(Res => {
      this.trendingnotes = Res.notes;
    });
  }
  topratednote() {
    this.newservice.Topratednotes().subscribe(Res => {
      this.topratednotes = Res.notes;
    });
  }
  recentnote() {
    this.newservice.Recentnotes().subscribe(Res => {
      this.recentnotes = Res;
    });
  }
  filter(query) {
    if (query !== "") {
      this.newservice.notessearch(query).subscribe(Res => {
        this.searchResult = Res.notes;
        if (this.searchResult.length <= 0) {
          this.searchResultStatus = false;
        }
      })
    }
  }




  onsubmit(query) {
    this.router.navigate(['/notessearch/' + query]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', query);
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
  book;
  course;
  flashcard
  allbids(id) {
    this.newid = id;
    this.addwishlist(this.book, this.course, this.flashcard, this.notes);
  }
  bididget(id) {
    this.newid = id;
    this.addwishlist(this.book, this.course, this.flashcard, this.notes);
  }
  addwishlist(book, course, flashcard, notes) {
    this.mainpage.addwishlist(book, course, flashcard, notes).subscribe(Res => {
      this.global = Res;
      swal({
        type: 'success',
        title: 'Added to watchlist',
        showConfirmButton: false,
        timer: 1500
      })
      this.headServ.showwishlist().subscribe(wishList => {
        this.wishlist = wishList;
        this.Data.emittedData(this.wishlist);
      })
    }, error => {
      if (error.status == 404) {
        swal({
          type: 'warning',
          title: 'This item is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (error.status == 406) {
        swal({
          type: 'error',
          title: 'Note Already Purchased',
          showConfirmButton: false,
          timer: 1500
        })
      }

    });

  }
  //////////////////bidind//////////
  bidnotesid(id) {
    if (this.check_login() == true) {
      this.bidonnotes = id;
      this.getnotebidhistory(this.bidonnotes);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
  bidamount;
  biding(f: NgForm) {
    this.global.bidnotes(this.bidonnotes, this.model.bidamount)
      .subscribe(Res => {
        swal({
          type: 'success',
          title: 'Your bid is listed',
          showConfirmButton: false,
          timer: 2000
        });
      },
        error => {
          if (error.status == 403 )
            swal({
              type: 'error',
              title: 'Bid higher amount',
              showConfirmButton: false,
              timer: 2000
            });
        },

      );
      f.resetForm()
  }
  deleteFWL(event) {
    this.see.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 1500
      });
    });
}
delfromcart(event) {
  this.global.delcart(event.cart).subscribe(data => {
    swal({
      type: 'success',
      title: 'Successfully deleted',
      showConfirmButton: false,
      timer: 1500
    });
  });
}
  cartitems;
  addcart(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.newservice.addtocart(notes, course, book, flashcard).subscribe(data => {
        swal({
          type: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 4500
        });
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
            timer: 4500
          })
        else if (error.status === 406)
          swal({
            type: 'error',
            title: 'Item Already Purchased',
            showConfirmButton: false,
            timer: 4500
          })
      });
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
  submit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
    }
  }
  notebid;
  ////////////note biding history ///////////////
  getnotebidhistory(id) {
    this.bidings.notebidhistory(this.bidonnotes).subscribe(data => {
      this.notebid = data;
      this.notes = data['Highest Bid'];})}
}
