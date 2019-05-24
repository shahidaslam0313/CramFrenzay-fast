import { Component, OnInit, AfterContentInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { fcdetailservice } from "./fcdetail.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { flashcardservice } from '../flashcard/flashcard.service';
import swal from "sweetalert2";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddtocartComponent } from './../../addtocart/addtocart.component';
import {PagerService} from '../../paginator.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';


declare const $: any;

@Component({
  selector: 'app-fcdetail',
  templateUrl: './fcdetail.component.html',
  styleUrls: ['./fcdetail.component.scss'],

})
export class FcdetailComponent implements OnInit, AfterContentInit {
  @ViewChild(AddtocartComponent)
  public Imageurl = Config.Imageurlget;
  model: any = {};
  public result;
  public flashcardDetail: any;
  public sub: Subscription;
  public flashId: any;
  public flashCardTermsDefinitionsData: any = [];
  public flipresult: any;
  public name;
  private productsSource;
  currentProducts;
  role;
  getid;
  view;
  pager;
  id;
  rate;
  comment;
  reviewform = new FormGroup({
    comment: new FormControl('', [
      Validators.required
      ])
  })
  constructor(private pagerService: PagerService, public addtocart: AddtocartComponent, private newService: fcdetailservice, private router: Router, private route: ActivatedRoute, private serv: flashcardservice,  private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  nullvalue = null;
  cart(Book, Course, FlashCard, Notes) {
    if (this.check_login() == true) {
      this.addtocart.AddToCart(Book, Course, FlashCard, Notes);
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
    }
  }

  ngOnInit() {
    window.scroll(0,0)
    this.sub = this.route.params.subscribe(params => {
      this.flashId = +params['id'] || 0;
    });
    this.reviewsss(this.pager);

    this.fcdetail();
    this.flipdetail();
    this.flashCardTermsDefinitions();
    if (isPlatformBrowser(this.platformId)) {
      this.name = localStorage.getItem('name');
    }
  }

  checkfcdetail(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {cardsid : id}});
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
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

  sweetalertsignin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    this.router.navigate(['/login']);
  }

  ngAfterContentInit() {
    $('#flipFlash').click(function () {
      setTimeout(function () {
        $('.fc-slider').slick({
          slidesToShow: 1,
          infinite: false,
          prevArrow: "<button class='left-arrow-slider'><i class='fa fa-2x fa-arrow-left'></i></button>",
          nextArrow: "<button class='right-arrow-slider'><i class='fa fa-2x fa-arrow-right'></i></button>",
        });
      }, 250);
    });
  }
  uploaddata() {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + 'flash/createflashcard/', this.model, { headers: headers })
      .subscribe(Res => {
      });
  }

  getfcid(id){
    this.getid = id;
  }
  fcdetail() {
    this.newService.newfcdetail(this.flashId).subscribe(data => {
      this.flashcardDetail = data;
      console.log(data,'FC DEATAIL')
    });
  }
  flipdetail() {
    this.newService.flipdetail(this.flashId).subscribe(data => {
      this.flipresult = data;
      console.log(data,'FLIP RESULT')
    });
  }

  flashCardTermsDefinitions() {
    this.newService.flashCardTermsDefinitions(this.flashId).subscribe(data => {
      this.flashCardTermsDefinitionsData = data;
      console.log(data,'FLASHCARD TERMS')
    });
  }

  get(rating) {
    this.rate = rating;
  }
  reviews(rate, comment, book, course, data, notes, f: NgForm) {
    if (this.check_login()) {
      // this.id = data;
      if (this.reviewform.controls.comment.valid) {
      this.newService. review(this.rate , this.model.comment, book, course, this.flashcardDetail.id, notes).subscribe(data => {

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
            title: 'You already posted review for this Flash card',
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
  reviewsss(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }

    this.newService.getreview(this.flashId).subscribe(data =>{
      this.view = data;
      this.pager = this.pagerService.getPager(this.view['totalItems'], page, 10);

    },
      error => {
      if (error.status== 400){
        this.view = 0;
      }
      });
  }
}
