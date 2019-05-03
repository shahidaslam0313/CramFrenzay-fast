import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BookseemoreService } from "./bookseemore.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { MatDialog } from '@angular/material';
import { GlobalService } from 'app/global.service';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';


@Component({
  selector: 'app-bookseemore',
  templateUrl: './bookseemore.component.html',
  styleUrls: ['./bookseemore.component.scss']
})
export class BookseemoreComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  bidnotes;
  trendingnotes;
  toprated;
  recent;
  watch;
  trends;
  name;
  pager: any = {};
  Eid;
  bidbookid;
  model: any={};
  cartitem;
  private sub: Subscription;
  constructor(private headServ: headerservice, private Data: DataService,private mainpage: mainpageservice,private pagerService: PagerService, private seemore: BookseemoreService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, private dialogRef: MatDialog, private global:GlobalService) {
      this.sub = this.route.params.subscribe(params => {
          this.name = +params['name'];
          if (params['name'] == "Bid&BuyBooks") {
              this.setPagenotes(1);
          }
          else if (params['name'] == "BooksTrendingNow") {
              this.setTrending(1);
          }
          else if (params['name'] == "TopRatedBooks") {
              this.setToprated(1);
          }
          else if (params['name'] == "RecentlyVisitedBooks") {
              this.recentnote();
          }

      });
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
  setPagenotes(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.Bidbuybooks(page).subscribe(data => {
      this.bidnotes = data;
      this.pager = this.pagerService.getPager(this.bidnotes['totalItems'], page, 10);

    });
  };
  setTrending(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.TrendingNotes(page).subscribe(data => {
      this.trends = data;
      this.pager = this.pagerService.getPager(this.trends['totalItems'], page, 10);

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


/////////////biding in books/////////
  booksid(id) {
    this.bidbookid = id;
  }
  sweetalertlogin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy!",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  openDialog3(chapter_id): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          books: chapter_id,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
  addwishlist(book) {
    let course = null;
    let flashcard = null;
    let notes = null;
    this.global.addwishlist(book, course, flashcard, notes).subscribe(data => {
      swal({
        type: 'success',
        title: 'Added to watchlist',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      if (error.status == 404){
        swal({
          type: 'warning',
          title: 'This book is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if(error.status == 406){
        swal({
          type: 'error',
          title: 'Book Already Purchased',
          showConfirmButton: false,
          timer: 1500
        })
      }
        
    });
  }
  bidc() {
    this.seemore.bidoncourses( this.bidbookid, this.model.bidamount, )
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
  addcart(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      notes = null;
      course = null;
      flashcard = null;
      this.mainpage.addtocart(notes, course, book, flashcard).subscribe(data => {
        this.global = data;
        swal({
          type: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 2000
        });
        this.headServ.showCartItem().subscribe(cartitem => {
          this.cartitem = cartitem;
          this.Data.emittData(this.cartitem);
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
}
