import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CoursesmService } from "./coursesm.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';
import { GlobalService } from 'app/global.service';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { MatDialog } from '@angular/material';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import { WishlistService } from 'app/wishlist/wishlist.service';
import {BidHistoryService} from "../../bid-history/bid-history.service";

@Component({
  selector: 'app-coursesm',
  templateUrl: './coursesm.component.html',
  styleUrls: ['./coursesm.component.scss']
})
export class CoursesmComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  pager: any = {};
  private sub: Subscription;
  name;
  bidbuycourse;
  trendingcourse;
  toprated;
  recent;
  watch;
  bidingcourse;
  model: any = {};
  cartitems;
  wishlist;
  constructor(private bidings: BidHistoryService,private headServ: headerservice, private Data: DataService, private global: GlobalService, private mainpage: mainpageservice, private pagerService: PagerService, private seemore: CoursesmService,private see: WishlistService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, public dialogRef: MatDialog) { }

  ngOnInit() {
    window.scroll(0, 0)
    this.route.params.subscribe(params => {
    });
    this.sub = this.route.params.subscribe(params => {
      this.name = +params['name'];
      if (params['name'] == "Bid&BuyCourses") {
        this.setPagecourse(1);
      }
      else if (params['name'] == "CourseTrendingNow") {
        this.setPagetrending(1);
      }
      else if (params['name'] == "TopRatedCourses") {
        this.setPagetoprated(1);
      }
      else if (params['name'] == "RecentlyViewedCourses") {
        this.recentnote();
      }
    });


  }
  checknotes(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { id: id } });

    }
  }
  id;
  checkbuy(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.mainpage.bid(notes, course, book, flashcard).subscribe(data => {
        this.checknotes(this.id)
      },
        error => {
          if (error.status === 406)
            swal({
              type: 'error',
              title: 'Item Already Purchased',
              showConfirmButton: false,
              timer: 4500
            })
        },
      )
    }
    // else if (this.check_login() == false) {
    //   this.sweetalertlogin();
    //   this.router.navigate(['/login']);
    // }
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
  sweetalertlogin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
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

  setPagecourse(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.BidbuyCourse(page).subscribe(data => {
      this.bidbuycourse = data;
      this.pager = this.pagerService.getPager(this.bidbuycourse['totalItems'], page, 10);

    });
  };

  setPagetrending(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.TrendingnowCourse(page).subscribe(data => {
      this.trendingcourse = data;
      this.pager = this.pagerService.getPager(this.trendingcourse['totalItems'], page, 10);

    });
  };

  setPagetoprated(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.TopratedCourse(page).subscribe(data => {
      this.toprated = data;
      this.pager = this.pagerService.getPager(this.toprated['totalItems'], page, 10);

    });
  };

  recentnote() {
    this.seemore.RecentlyCourses().subscribe(data => {
      this.recent = data;
    });
  }
  ////////////////biding on courses///////////
  bidcourseid(id) {
    if (this.check_login() == true) {
      this.bidingcourse = id;
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
  bidc() {
    this.seemore.bidoncourses(this.bidingcourse, this.model.bidamount)
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
  courses(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {courseid : id}});
      // localStorage.setItem('course', id);
    } else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
  openDialog3(chapter_id): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          course: chapter_id,
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
  addwishlist(course) {
    let book = "";
    let flashcard = "";
    let notes = "";

    this.mainpage.addwishlist(book, course, flashcard, notes).subscribe(data => {
      this.global = data;
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
          title: 'This course is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (error.status === 406) {
        swal({
          type: 'error',
          title: 'Course Already Purchased',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    );
  }
  addcart(notes, course, book, flashcard) {
    notes = null;
    book = null;
    flashcard = null;
    if (this.check_login() == true) {
      this.mainpage.addtocart(notes, course, book, flashcard).subscribe(data => {
        this.global = data;
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
  delCourseFwishList(event) {
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
  coursebid;
  course;
  ////////////course  biding history////////
  getcoursebidhistory(id) {
    alert(this.bidingcourse);
    this.bidings.coursebidhistory(this.bidingcourse).subscribe(data => {
      this.coursebid = data;
      this.course = data['Highest Bid'];
    })
  }
}
