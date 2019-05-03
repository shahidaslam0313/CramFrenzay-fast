import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Config} from '../../Config';
import swal from 'sweetalert2';
import {isPlatformBrowser} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {EachcourseService} from '../eachcourse/eachcourse.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AddtocartComponent} from './../../addtocart/addtocart.component';
import { PagerService } from '../../paginator.service';
@Component({
  selector: 'app-eachcourse',
  templateUrl: './eachcourse.component.html',
  styleUrls: ['./eachcourse.component.scss']
})
export class EachcourseComponent implements OnInit {
  @ViewChild(AddtocartComponent)

  public Imageurl = Config.Imageurleach;
  result;
  pager;
  public courseId: any;
  public sub: Subscription;
  private productsSource;
  currentProducts;
  role;
  rate;
  view;
  comment;
  id;
  model: any = {};
  constructor(private pagerService: PagerService, private eachcourse: EachcourseService, private router: Router, private route: ActivatedRoute,  @Inject(PLATFORM_ID) private platformId: Object, public addtocart: AddtocartComponent) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    window.scroll(0,0);
    this.sub = this.route.params.subscribe(params => {
      this.courseId = +params['id'] || 0;
    });
    this.eachcourseshow();
    this.reviewsss(this.pager);
  }
  get(rating) {
    this.rate = rating;
  }
  nullvalue = null;
  cart(Book, Course, FlashCard, Notes) {
    if (this.check_login() == true) {
      this.addtocart.AddToCart(Book, Course, FlashCard, Notes);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
    }
  }

  eachcourseshow() {

    this.eachcourse.Eachcourse(this.courseId).subscribe(data => {
      this.result = data.Course;
    });
  }

  checkcate() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
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

  checkcourse() {
    if (this.check_login() == true) {
      this.role = localStorage.getItem('role');
      if (this.role == "U") {
        swal({
          title: 'CramFrenzy!',
          text: 'Only admin and teacher can upload courses!',
          type: 'error',
          showConfirmButton: false,
          confirmButtonColor: "#cc0000",
          timer: 2000,
          confirmButtonText: "OK",
        });
      }
      else if (this.role == "T" || this.role == "A") {
        this.router.navigate(['/upload']);
      }
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
    }
  }

  reviewsss(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }

    this.eachcourse.getreview(this.courseId).subscribe(data =>{
      this.view = data;
      console.log(this.courseId);
      this.pager = this.pagerService.getPager(this.view['totalItems'], page, 10);

    }
      ,error=>{
        if(error.status==400){
          this.view=0;
        }
      });
  }
  courses(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment/', id]);
      localStorage.setItem('course', id);
    } else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
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
    this.router.navigate(['/login']);
  }
book = null;
  flashcard= null ;
  notes = null;
  reviews(rate, comment,  result, book, flashcard, notes) {
    if (this.check_login()) {
      // this.id = result;
      this.eachcourse.review(this.rate, this.model.comment, this.result.id, book,  flashcard, notes).subscribe(data => {
        swal({
          type: 'success',
          title: 'Thanks for your Review.',
          showConfirmButton: false,
          width: '512px',
          timer: 4500
        });
      }, error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'You already posted review for this course',
            showConfirmButton: false,
            width: '512px',
            timer: 4500
          });
        } else if (error.status == 400) {
          swal({
            type: 'error',
            title: 'You have to buy before posting a review',
            showConfirmButton: false,
            width: '512px',
            timer: 4500
          });
        }
      });
    }
    else {
      swal({
        type: 'error',
        title: 'CramFrenzy!',
        text: 'Please Login First',
        showConfirmButton: false,
        width: '512px',
        timer: 4500
      });
      this.router.navigate(['/login']);
    }
  }
}
