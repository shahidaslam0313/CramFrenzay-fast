import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CourseService } from "./course.service";
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { GlobalService } from '../../global.service';
import swal from "sweetalert2";
import { isPlatformBrowser } from '@angular/common';
import { MainpageComponent } from '../../MainPage/mainpage/mainpage.component';
import { headerservice } from '../../includes/header/header.service';
import { MatDialog } from '@angular/material';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';
import { DataService } from 'app/data.service';
import { WishlistService } from 'app/wishlist/wishlist.service';
import { BidHistoryService } from "../../bid-history/bid-history.service";
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @ViewChild(MainpageComponent)

  public Imageurl = Config.Imageurlget;
  bidcourse;
  result;
  inner;
  watched;
  trending;
  toprated;
  recent;
  public name;
  public searchResultStatus = true;
  courseid;
  query;
  wishlist;
  notes;
  flashcard;
  book;
  bidform = new FormGroup({
    bidamount: new FormControl('', [
      Validators.required
    ])
  })
  searchResult: any = [];
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
  count;
  bidingc;
  bidingcourse;
  message: string;
  model: any = {};
  cartitems;
  constructor(private bidings: BidHistoryService, private headServ: headerservice, private see: WishlistService, private Data: DataService, private mainpage: mainpageservice, public course: CourseService, private router: Router, public header: headerservice, private global: GlobalService, @Inject(PLATFORM_ID) private platformId: Object, public dialogRef: MatDialog) {
    this.Showbidcourses();
    this.TrendingNow();
    this.Showtopratedcourses();
    this.Showrecentvisitedcourse();
    this.Showwatchedcourses();
    this.Innerslider();
    this.bidcours();
  }
  openDialog3(course): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          course: course,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
    this.showhistory(this.notes, course, this.flashcard, this.book);
  }
  showhistory(notes, course, flashcard, book) {
    return this.global.offerhistory(notes, course, flashcard, book)
  }
  ngOnInit() {
    window.scroll(0, 0)
  }

  Innerslider() {
    this.global.InnerslideronMainPage().subscribe(Res => {
      this.inner = Res;
    });
  }
  id;
  courses(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { courseid: id } });
      // localStorage.setItem('course', id);
    } else if (this.check_login() == false) {
      this.sweetalertlogin();
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

  sweetalertlogin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  bidcours() {
    this.course.BidCourses().subscribe(Res => {
      this.bidingc = Res;
    });
  }
  Showbidcourses() {
    this.course.BidCoursesoncourses().subscribe(Res => {
      this.bidcourse = Res;

    });
  }
  TrendingNow() {
    this.course.TrendingNowoncourse().subscribe(Res => {
      this.trending = Res;
    });
  }

  Showtopratedcourses() {
    this.course.TopratedCoursesoncourse().subscribe(Res => {
      this.toprated = Res;
    });
  }

  Showrecentvisitedcourse() {
    this.course.RecentlyCourses().subscribe(Res => {
      this.recent = Res;
    });
  }
  Showwatchedcourses() {
    this.course.WatchedCoursesoncourse().subscribe(Res => {
      this.watched = Res;
    });
  }
  filter(query) {
    if (query != "") {
      this.course.coursesearch(query).subscribe(Res => {
        this.searchResult = Res.courses;
        if (this.searchResult.length <= 0) {
          this.searchResultStatus = false;
        }
      })
    }
  }

  onsubmit(query) {
    this.router.navigate(['/coursesearch/' + query]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', query);
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
  ////////////////biding on courses///////////
  bidcourseid(id) {
    if (this.check_login() == true) {
      this.bidingcourse = id;
      this.getcoursebidhistory(this.bidingcourse);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }

  }
  bidc(f: NgForm) {
    if(this.bidform.controls.bidamount.valid){
      this.global.bidoncourses(this.bidingcourse, this.bidform.value['bidamount'])
      .subscribe(Res => {
        swal({
          type: 'success',
          title: 'Your bid is listed',
          showConfirmButton: false,
          timer: 1500
        });
      },
        error => {
          if (error.status == 403) {
            swal({
              type: 'error',
              title: 'Bid higher amount',
              showConfirmButton: false,
              timer: 1500
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
  null;
  addcart(notes, course, book, flashcard) {
    notes = null;
    book = null;
    flashcard = null;
    if (this.check_login() == true) {
      this.course.addtocart(notes, course, book, flashcard).subscribe(data => {

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
      localStorage.setItem('nameID', 'notes');
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
  coursesitem;
  ////////////course  biding history////////
  getcoursebidhistory(id) {
    this.bidings.coursebidhistory(this.bidingcourse).subscribe(data => {
      this.coursebid = data;
      this.coursesitem = data['Highest Bid'];
    })
  }
}
