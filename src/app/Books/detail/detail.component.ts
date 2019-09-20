import { AddtocartComponent } from './../../addtocart/addtocart.component';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild, Input } from '@angular/core';
import { detailservice } from './detail.service';
import { Subscription } from 'rxjs/Subscription';
import { Config } from '../../Config';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PagerService } from '../../paginator.service';
import { headerservice } from 'app/includes/header/header.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @ViewChild(AddtocartComponent)
  public item;
  public Imageurl = Config.Imageurlget;
  result: any;
  public bookID: any;
  private sub: Subscription;
  private productsSource;
  currentProducts;
  param;
  role;
  rate;
  view;
  pager;
  model: any = {}
  reviewform = new FormGroup({
    comment: new FormControl('', [
      Validators.required
      ])
  })
  @Input() url = 'https://www.cramfrenzy.com/';
  constructor(private pagerService: PagerService, public addtocart: AddtocartComponent, private detail: detailservice, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, private headServ: headerservice, ) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
    if (!window['fbAsyncInit']) {
      window['fbAsyncInit'] = function () {
          window['FB'].init({
              appId: '2243800905848514',
              autoLogAppEvents: true,
              xfbml: true,
              version: 'v3.0'
          });
      };
  }

  // load facebook sdk if required
  const url = 'https://connect.facebook.net/en_US/sdk.js';
  if (!document.querySelector(`script[src='${url}']`)) {
      let script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
  }
  }

  nullvalue = null;
  cart(Book, Course, FlashCard, Notes) {
    if (this.check_login() == true) {
      this.addtocart.AddToCart(Book, Course, FlashCard, Notes);
    }
    else if (this.check_login() == false) {
      this.sweetalertbooks();
    }
  }

  ngOnInit() {
    window.scroll(0, 0)
    this.sub = this.route.params.subscribe(params => {
      this.bookID = +params['id'] || 0;
    });
    this.newbooks();
    this.reviewsss(this.pager);
    window['FB'] && window['FB'].XFBML.parse();
  }

  sweetalertbooks() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy!",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    this.router.navigate(['/login']);
  }
  newbooks() {
    this.detail.booksdetail(this.bookID).subscribe(data => {
      this.result = data;
      console.log(data,'Book Detail')
    });
  }

  checkbook(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { bookid: id } });
    }
    else if (this.check_login() == false) {
      this.sweetalertbooks();
    }
  }
  checkreview() {
    if (this.check_login() == true) {
    }
    else if (this.check_login() == false) {
      this.sweetalertbooks();
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
  get(rating) {
    this.rate = rating;
  }
  comment;
  id;
  reviews(rate, comment, result, course, flashcard, notes, f: NgForm) {
    if (this.check_login()) {
      this.id = result;
      if (this.reviewform.controls.comment.valid) {
        this.detail.review(this.rate, this.reviewform.controls.comment.value, this.id, course, flashcard, notes).subscribe(data => {
          swal({
            type: 'success',
            title: 'Thanks for your Review.',
            showConfirmButton: false,
            width: '512px',
            timer: 1500
          });
        }, error => {
          if (error.status == 404) {
            swal({
              type: 'error',
              title: 'You already posted review for this book',
              showConfirmButton: false,
              width: '512px',
              timer: 1500
            });
          } else if (error.status == 400) {
            swal({
              type: 'error',
              title: 'You have to buy before posting a review',
              showConfirmButton: false,
              width: '512px',
              timer: 1500
            });
          }
        });
      }
      else {
        swal({
          type: 'error',
          text: 'Leave a Review',
          width: '512px',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    else {
      swal({
        type: 'error',
        title: 'CramFrenzy!',
        text: 'Please Login First',
        showConfirmButton: false,
        width: '512px',
        timer: 1500
      });
      this.router.navigate(['/login']);
    }
    f.resetForm()
  }

  reviewsss(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }

    this.detail.getreview(this.bookID).subscribe(data => {
      this.view = data;
      this.pager = this.pagerService.getPager(this.view['totalItems'], page, 10);

    }, error => {
      this.item = error.status;

    }
    );
  }
}
