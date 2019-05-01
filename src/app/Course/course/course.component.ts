import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CourseService } from "./course.service";
import { Router } from "@angular/router";
import { Config } from "../../Config";
import {GlobalService} from '../../global.service';
import swal from "sweetalert2";
import { isPlatformBrowser } from '@angular/common';
import { MainpageComponent } from '../../MainPage/mainpage/mainpage.component';
import { headerservice } from '../../includes/header/header.service';
import { MatDialog } from '@angular/material';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';

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
  courseid;
  query;
  searchResult: any = [];
  slideConfig2 = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: '<button class="leftRs1"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button class="rightRs1"><i class="fa fa-chevron-right"></i></button>',
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
  constructor(private mainpage: mainpageservice,private course: CourseService, private router: Router, public header: headerservice, private global: GlobalService,  @Inject(PLATFORM_ID) private platformId: Object, public dialogRef: MatDialog) {
    this.Showbidcourses();
    this.TrendingNow();
    this.Showtopratedcourses();
    this.Showrecentvisitedcourse();
    this.Showwatchedcourses();
    this.Innerslider();
    this.bidcours();
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
  ngOnInit() {
    this.global.currentMessage.subscribe(message => this.message = message);


  }

  Innerslider() {
    this.global.InnerslideronMainPage().subscribe(Res => {
      this.inner = Res;
    });
  }
id;
  courses(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
      localStorage.setItem('course', id);
    }
  }
  checkbuy(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.mainpage.bid(notes, course, book, flashcard).subscribe(data => {
       this.courses(this.id)
        },
        error => {
          if ( error.status === 406)
              swal({
                type: 'error',
                title: 'Course Already Purchased',
                showConfirmButton: false,
                timer: 4500
              })  
          },
          ) 
    }
    else if (this.check_login() == false) {
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
      title: "CramFrenzy!",
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
        this.searchResult = Res.Course;
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
    }, error => {
      if (error.status == 404){
        swal({
        type: 'warning',
        title: 'This course is already in your watchlist',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else if(error.status===406){
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
      // alert(this.bidingcourse);
      console.log(this.bidingcourse);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }

  }
  bidc() {
    this.global.bidoncourses( this.bidingcourse, this.model.bidamount, )
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
}
