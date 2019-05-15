import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TeachersService } from "./teachers.service";
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import swal from 'sweetalert2';
import { GlobalService } from '../../global.service';
import {BidHistoryService} from "../../bid-history/bid-history.service";
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  public Imageurl = Config.Imageurleach;
  public teacherId: any;
  public sub: Subscription;
  public result1: any;
  private productsSource;
  currentProducts;
  totalTutorReviews;
  totalCourses;
  students;
  profileinfo;
  courses;
  slideConfig;
  model : any = {};
  bidingcourse;
  constructor(private bidings: BidHistoryService, public global: GlobalService , public teachers: TeachersService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.teacherId = +params['id'] || 0;
    });
    this.Showteachers(this.teacherId);
  }
  
  sweetalertsignin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2500,
    });
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
  coursess(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {courseid : id}});
      // localStorage.setItem('course', id);
    } else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  Showteachers(teacherId) {
    this.teachers.ourteachers(teacherId)
      .subscribe(data => {
        this.result1 = data.profile;
        this.totalTutorReviews= data.totalTutorReviews;
        this.totalCourses = data.totalCourses;
        this.students = data.students;
       this.profileinfo = data.studentProfile;
       this.courses = data.courses;
       this.slideConfig = {
        'slidesToShow': 5, 'slidesToScroll': 5,
        autoplay: false,
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
    });
    
  }
  ////////////////biding on courses///////////
  bidcourseid(id) {
    if (this.check_login() == true) {
      this.bidingcourse = id;
      this.getcoursebidhistory(this.bidingcourse);
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  bidc() {
    this.global.bidoncourses(this.bidingcourse, this.model.bidamount, )
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
  coursebid;
  course;
  getcoursebidhistory(id) {
    this.bidings.coursebidhistory(this.bidingcourse).subscribe(data => {
        this.coursebid = data;
        this.course = data['Highest Bid'];
      })
  }
}

