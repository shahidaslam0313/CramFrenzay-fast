import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @ViewChild(AddtocartComponent)
  public Imageurl = Config.Imageurleach;
  result;
  public Eid: any;
  private sub: Subscription;
  length;
  private productsSource;
  currentProducts;
  model: any ={};
  role;
  rate;
  pager: any = {};
  review;
  id;
  view : any = [];
  comment;
  constructor(private pagerService: PagerService, public addtocart: AddtocartComponent, private each: NotesService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
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

    this.sub = this.route.queryParams.subscribe(params => {
      this.Eid = +params['noteidget'];
    });
    // this.route.queryParams.subscribe(params => {
      this.singlenotes(this.Eid);
    // });
    // this.sub = this.route.params.subscribe(params => {
    //   this.Eid = +params['id'];
    // });


    this.reviewsss(this.pager);
  }
  singlenotes(Eid) {
    this.each.Eachnotes(this.Eid).subscribe(data => {
      this.result = data;
    });
    }


  checkmainpage(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {notesid : id}});
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
      title: "CramFrenzy!",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  reviewsss(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.each.getreview(this.Eid).subscribe(data =>{
      this.view = data;
      console.log(data);
      this.pager = this.pagerService.getPager(this.view['totalItems'], page, 10);
    },
      error => {
        if(error.status==400){
          this.view=0;
        }
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
      title: "CramFrenzy!",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    this.router.navigate(['/login']);
  }

  get(rating) {
    this.rate = rating;
  }

  reviews(rate, comment, result, book, course, flashcard ) {
    // alert(this.id);
    // this.id = result;
    if (this.check_login()) {
      console.log(this.result.id);
      this.each.review(this.rate , this.model.comment, this.result.id , book, course, flashcard, ).subscribe(data => {
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
