import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgseemoreService } from "./ngseemore.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { MatDialog } from '@angular/material';
import { GlobalService } from 'app/global.service';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';
import { WishlistService } from 'app/wishlist/wishlist.service';
import { BidHistoryService } from "../../bid-history/bid-history.service";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ngseemore',
  templateUrl: './ngseemore.component.html',
  styleUrls: ['./ngseemore.component.scss']
})
export class NgseemoreComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  bidnotes;
  trendingnotes;
  toprated;
  recent;
  watch;
  name;
  pager: any = {};
  bidonnotes;
  model: any = {};
  newid;
  message;
  cartitems;
  wishlist;
  course;
  flashcard;
  book;
  bidform= new FormGroup({
    bidamount: new FormControl('',[
      Validators.required
    ])
  })
  private sub: Subscription;
  constructor(private bidings: BidHistoryService, private headServ: headerservice, private Data: DataService, private mainpage: mainpageservice, private pagerService: PagerService, private seemore: NgseemoreService, private router: Router, private see: WishlistService, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, public dialogRef: MatDialog, private global: GlobalService) {
    this.global.currentMessage.subscribe(message => this.message = message);
    this.route.params.subscribe(params => {
    });
    window.scroll(0, 0);

    this.sub = this.route.params.subscribe(params => {
      this.name = +params['name'];
      if (params['name'] == "Bid&BuyNotes") {
        this.setPagenotes(1);
      }
      else if (params['name'] == "NotesTrendingNow") {
        this.setTrending(1);
      }
      else if (params['name'] == "TopRatedNotes") {
        this.setToprated(1);
      }
      else if (params['name'] == "RecentlyViewedNotes") {
        this.recentnote();
      }

    });
  }

  ngOnInit() { }
  checkmainpage(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { notesid: id } });
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
  sweetalertnotes() {
    swal({
      text: 'Please Login First',
      title: 'CramFrenzy',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#cc0000', timer: 2000,
      confirmButtonText: 'OK',
    });
  }

  bididget(id) {
    this.newid = id;
    this.addwishlist(this.newid);
  }
  nullvalue = null;
  addwishlist(newid) {
    let book = "";
    let flashcard = "";
    let course = "";

    this.seemore.addwishlist(book, course, flashcard, this.newid).subscribe(Res => {
      this.global = Res;
      swal({
        type: 'success',
        title: 'Item successfully added to watch list',
        showConfirmButton: false,
        timer: 1500
      })
      this.headServ.showwishlist().subscribe(wishList => {
        this.wishlist = wishList;
        this.Data.emittedData(this.wishlist);
      })
    }, error => {
      if (error.status == 404)
        swal({
          type: 'warning',
          title: 'This item is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
    });

  }
  setPagenotes(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.BidbuyNotes(page).subscribe(data => {
      this.bidnotes = data;
      this.pager = this.pagerService.getPager(this.bidnotes['totalItems'], page, 10);

    });
  };
  setTrending(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.seemore.TrendingNotes(page).subscribe(data => {
      this.trendingnotes = data;
      this.pager = this.pagerService.getPager(this.trendingnotes['totalItems'], page, 10);
    });
  };
  setToprated(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.TopratedNotes(page).subscribe(data => {
      this.toprated = data;
      this.pager = this.pagerService.getPager(this.toprated['totalItems'], page, 10);

    });
  };

  recentnote() {
    this.seemore.Recentnotes().subscribe(data => {
      this.recent = data;
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
  biding(f:NgForm) {
    if(this.bidform.controls.bidamount.valid){
    this.seemore.bidnotes(this.bidonnotes, this.bidform.value['bidamount'])
      .subscribe(Res => {
        swal({
          type: 'success',
          title: 'Your bid is listed',
          showConfirmButton: false,
          timer: 2000
        });
      },
        error => {
          if (error.status == 403)
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
    else 
    swal({
      type: 'error',
      title: 'Bid amount is required',
      showConfirmButton: false,
      timer: 1500
    });
  }
  notesss(id) {
    this.seemore.getnotesid(id).subscribe(notes => {
      this.bidonnotes = notes;
    });
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
  deleteFWL(event) {
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
    this.global.delcart(event.cart).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from cart',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
  addcart(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.mainpage.addtocart(notes, course, book, flashcard).subscribe(data => {
        swal({
          type: 'success',
          title: 'Item successfully deleted from cart',
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
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
  notes;
  notebid;
  ////////////note biding history ///////////////
  getnotebidhistory(id) {
    this.bidings.notebidhistory(this.bidonnotes).subscribe(data => {
      this.notebid = data;
      this.notes = data['Highest Bid'];
    })
  }
}
