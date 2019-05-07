import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FcseemoreService } from "./fcseemore.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { MatDialog } from '@angular/material';
import { GlobalService } from 'app/global.service';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import { WishlistService } from 'app/wishlist/wishlist.service';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';
import {BidHistoryService} from "../../bid-history/bid-history.service";

@Component({
  selector: 'app-fcseemore',
  templateUrl: './fcseemore.component.html',
  styleUrls: ['./fcseemore.component.scss']
})
export class FcseemoreComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  pager: any = {};
  private sub: Subscription;
  Eid;
  bidbuyflashcard;
  trendingflashcard;
  toprated;
  recent;
  watch;
  cardid;
  currentUser;
  token;
  model: any = {};
  username;
  currentuser;
  current;
  cartitems;
  wishlist;
  constructor(private bidings: BidHistoryService,private headServ: headerservice, private Data: DataService,private mainpage: mainpageservice, private see: WishlistService, private pagerService: PagerService, private seemore: FcseemoreService, private router: Router, private route: ActivatedRoute,   @Inject(PLATFORM_ID) private platformId: Object, private dialogRef: MatDialog, public global:GlobalService) {
      this.sub = this.route.params.subscribe(params => {
          this.Eid = +params['id'];
      });
      if (this.Eid == "1") {
          this.setPageflashcard(1);
      }
      else if (this.Eid == "2") {
          this.trendingflash();
      }
      else if (this.Eid == "3") {
          this.topratedflash();
      }
      else if (this.Eid == "4") {
          this.recentflashcard();
      }
  }
  ngOnInit() {
    window.scroll(0,0)
    this.route.params.subscribe(params => {
    });

  }
  checknotes() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertnotes();
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
  sweetalertsignin() {
    throw new Error("Method not implemented.");
  }
  getcardid(id){

    if (this.check_login() == true){
      this.cardid = id;
      this.getcardbidhistory(this.cardid);
    }
    else if (this.check_login() == false) {
      this.sweetalertnotes();
      this.router.navigate(['/login']);
    }
  }
  bidc() {
    this.seemore.bidoncourses( this.cardid, this.model.bidamount, )
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
  sweetalertnotes() {
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

  setPageflashcard(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.BidbuyFlashcard(page).subscribe(data => {
      this.bidbuyflashcard = data;
      console.log(this.bidbuyflashcard)
      this.pager = this.pagerService.getPager(this.bidbuyflashcard['totalItems'], page, 10);

    });
  };

  trendingflash() {
    this.seemore.TrendingnowFlashcard().subscribe(data => {
      this.trendingflashcard = data;
    });
  }

  topratedflash() {
    this.seemore.TopratedFlashcard().subscribe(data => {
      this.toprated = data;
    });
  }

  recentflashcard() {
    this.seemore.RecentlyFlashcard().subscribe(data => {
      this.recent = data;
    });
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
      if (error.status == 404){
        swal({
          type: 'warning',
          title: 'This flashcard is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if(error.status==406){
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
      this.global.addtocart(notes, course, book, flashcard).subscribe(data => {
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
    this.seemore.delcart(event.cart).subscribe(data => {
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
