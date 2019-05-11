import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlashcardlistService } from './flashcardlist.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from '../../global.service';
import { MatDialog } from '@angular/material';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import { WishlistService } from 'app/wishlist/wishlist.service';
import {BidHistoryService} from "../../bid-history/bid-history.service";

@Component({
  selector: 'app-flashcardlist',
  templateUrl: './flashcardlist.component.html',
  styleUrls: ['./flashcardlist.component.scss']
})
export class FlashcardlistComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  result;
  model: any = {};
  bidflashcards;
  trendingflashcards;
  topratedflashcards;
  recentflashcards;
  watchflashcards;
  cardid;
  wishlist;
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
  inner;
  public name;
  private productsSource;
  currentProducts;
  query;
  searchResult: any = [];
  cartitems;
  constructor(private bidings: BidHistoryService,private headServ: headerservice, private Data: DataService,private see: WishlistService, private mainpage: mainpageservice, private newService: FlashcardlistService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, private global: GlobalService, public dialogRef: MatDialog) {

    this.bidflash();
    this.trendingflash();
    this.topratedflash();
    this.recentflash();
    this.Slider();
  }
  openDialog3(chapter_id): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          flashcard: chapter_id,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {
    window.scroll(0,0)
  }

  Slider() {
    this.global.InnerslideronMainPage().subscribe(Res => {
      this.inner = Res;
    });
  }


  bidflash() {
    this.newService.Bidonflashcards().subscribe(Res => {
      this.bidflashcards = Res;
    });
  }
  trendingflash() {
    this.newService.Trendingflashcards().subscribe(Res => {
      this.trendingflashcards = Res;
    });
  }
  topratedflash() {
    this.newService.Topratedflashcards().subscribe(Res => {
      this.topratedflashcards = Res;
    });
  }
  recentflash() {
    this.newService.Recentflashcards().subscribe(Res => {
      this.recentflashcards = Res;
      for (let item of this.recentflashcards) {
      }
    });
  }

  filter(query) {
    if (query != "") {

      this.newService.flashsearch(query).subscribe(Res => {
        this.searchResult = Res.Flashcard;
        if (this.searchResult.length <= 0) {
          this.searchResultStatus = false;
        }
      })
    }
  }


  onsubmitsearch(query) {
    this.router.navigate(['/flashsearch/' + query]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', query);
    }
  }
  submit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
      // localStorage.setItem('nameID', 'flashcard');
    }
  }

  id;
  flashcard(id) {

    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
      localStorage.setItem('flashcard', id);
    }
  }
  checkbuy(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.mainpage.bid(notes, course, book, flashcard).subscribe(data => {
        this.flashcard(this.id)
      },
        error => {
          if (error.status === 406)
            swal({
              type: 'error',
              title: 'Flashcard Already Purchased',
              showConfirmButton: false,
              timer: 4500
            })
        },
      )
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  check_login() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  getcardid(id) {

    if (this.check_login() == true) {
      this.cardid = id;
      this.getcardbidhistory(this.cardbid);
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }

  sweetalertsignin() {
    swal({
      // text:"Error",
      text: "Please sign in to access this functionality",
      title: "Authentications Required",
      type: "error",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55", timer: 2000,
      confirmButtonText: "OK",
    });
  }
  bidc() {
    this.global.bidoncards(this.cardid, this.model.bidamount)
      .subscribe(Res => {
        swal({
          type: 'success',
          title: 'Your bid is listed',
          showConfirmButton: false,
          timer: 5500
        });
      },
        error => {
          swal({
            type: 'error',
            title: 'Bid higher amount',
            showConfirmButton: false,
            timer: 5500
          });
        }
      );
  }
  addwishlist(flashcard) {
    let course = null;
    let book = null;
    let notes = null;

    this.mainpage.addwishlist(book, course, flashcard, notes).subscribe(Res => {

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
          title: 'This flashcard is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (error.status == 406) {
        swal({
          type: 'error',
          title: 'Flashcard Already Purchased',
          showConfirmButton: false,
          timer: 1500
        })
      }

    });

  }
  addcart(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      notes = null;
      course = null;
      book = null;
      this.mainpage.addtocart(notes, course, book, flashcard).subscribe(data => {
        this.global = data;
        swal({
          type: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 2000
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
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
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
  delFlaskFwishList(event) {
    this.see.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
  cardbid;
  flashcardsbid;
  /////////// card bid history/////////
  getcardbidhistory(id) {
    this.bidings.cardbidhistory(this.cardid).subscribe(data => {
      this.cardbid = data;
      this.flashcardsbid = data['Highest Bid'];
    })
  }
}
