import { Component, Inject, OnInit, PLATFORM_ID, ViewChild,Input } from '@angular/core';
import { NotesService } from "./notes.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';
import swal from "sweetalert2";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddtocartComponent } from './../../addtocart/addtocart.component';
import { PagerService } from '../../paginator.service';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  @ViewChild(AddtocartComponent)
  public Imageurl = Config.Imageurlget;
  public pdfview = Config.pdf;
  result;
  public Eid: any;
  private sub: Subscription;
  length;
  private productsSource;
  currentProducts;
  model: any = {};
  role;
  rate;
  pager: any = {};
  review;
  id;
  view: any = [];
  comment;
  reviewform = new FormGroup({
    comment: new FormControl('', [
      Validators.required
      ])
  })
  @Input() url = 'https://www.cramfrenzy.com/';
  constructor(private pagerService: PagerService, public addtocart: AddtocartComponent, private each: NotesService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
    window.scroll(0,0);
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
    } else if (this.check_login() == false) {
      this.sweetalertnotes();
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.Eid = +params['id'];
    });
    this.singlenotes();
    this.reviewsss(this.pager);
    window['FB'] && window['FB'].XFBML.parse();
  }
  checkmainpage(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { notesid: id } });
      // localStorage.setItem('notesid',id );
      // localStorage.setItem('price' , price)
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  sweetalertsignin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  reviewsss(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.each.getreview(this.Eid).subscribe(data => {

      this.view = data;
      this.pager = this.pagerService.getPager(this.view['totalItems'], page, 10);
    },
      error => {
        if (error.status == 400) {
          this.view = 0;
        }
      });
  }
  singlenotes() {
    this.each.Eachnotes(this.Eid).subscribe(data => {
      this.result = data;
    });
  }
  checkcate() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    } else if (this.check_login() == false) {
      this.sweetalertnotes();
    }
  }

  check_login() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        return true;
      } else {
        return false;
      }
    }
  }

  sweetalertnotes() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    this.router.navigate(['/login']);
  }

  get(rating) {
    this.rate = rating;
  }

  reviews(rate, comment, result, book, course, flashcard,f: NgForm) {
    if (this.check_login()) {
      if (this.reviewform.controls.comment.valid) {
      this.each.review(this.rate, this.model.comment, this.result.id, book, course, flashcard).subscribe(data => {
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
            title: 'You already posted review for this note',
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
        title: 'CramFrenzy',
        text: 'Please Login First',
        showConfirmButton: false,
        width: '512px',
        timer: 4500
      });
      this.router.navigate(['/login']);
    }
    f.resetForm()
  }
  
}
