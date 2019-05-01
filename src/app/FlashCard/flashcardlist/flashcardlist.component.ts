import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlashcardlistService } from './flashcardlist.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import swal from "sweetalert2";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {GlobalService} from '../../global.service';
import { MatDialog } from '@angular/material';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { mainpageservice } from 'app/MainPage/mainpage/mainpage.service';

@Component({
  selector: 'app-flashcardlist',
  templateUrl: './flashcardlist.component.html',
  styleUrls: ['./flashcardlist.component.scss']
})
export class FlashcardlistComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  result;
  model: any = {};
  bidflashcards;
  trendingflashcards;
  topratedflashcards;
  recentflashcards;
  watchflashcards;
  cardid;
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
  inner;
  public name;
  private productsSource;
  currentProducts;
  query;
  searchResult: any = [];

  constructor(private mainpage: mainpageservice, private newService: FlashcardlistService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, private global: GlobalService,public dialogRef: MatDialog) {

    this.bidflash();
    this.trendingflash();
    this.topratedflash();
    this.recentflash();
    this.Slider();
  }
  openDialog3(chapter_id): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          flashcard: chapter_id,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {

  }

  Slider() {
    this.global.InnerslideronMainPage().subscribe(Res => {
      this.inner = Res;
    });
  }


  bidflash() {
    this.newService.Bidonflashcards().subscribe(Res => {
      this.bidflashcards = Res;
    });
  }
  trendingflash() {
    this.newService.Trendingflashcards().subscribe(Res => {
      this.trendingflashcards = Res;
    });
  }
  topratedflash() {
    this.newService.Topratedflashcards().subscribe(Res => {
      this.topratedflashcards = Res;
    });
  }
  recentflash() {
      this.newService.Recentflashcards().subscribe(Res => {
          this.recentflashcards = Res;
          for (let item of this.recentflashcards) {
              console.log(item);
          }
      });
  }

  filter(query) {
    if (query != "") {

      this.newService.flashsearch(query).subscribe(Res => {
        this.searchResult = Res.Flashcard;
      })
    }
  }


  onsubmitsearch(query) {
    this.router.navigate(['/flashsearch/' + query]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', query);
    }
  }

id;
  flashcard(id) {

    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
      localStorage.setItem('flashcard', id);
    }
  }
  checkbuy(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.mainpage.bid(notes, course, book, flashcard).subscribe(data => {
       this.flashcard(this.id)
        },
        error => {
          if ( error.status === 406)
              swal({
                type: 'error',
                title: 'Flashcard Already Purchased',
                showConfirmButton: false,
                timer: 4500
              })  
          },
          ) 
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
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

getcardid(id){

    if (this.check_login() == true){
      this.cardid = id;
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
}

  sweetalertsignin() {
    swal({
      // text:"Error",
      text: "Please sign in to access this functionality",
      title: "Authentications Required",
      type: "error",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55", timer: 2000,
      confirmButtonText: "OK",
    });
  }
  bidc() {
    this.global.bidoncards( this.cardid, this.model.bidamount, )
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
  addwishlist(flashcard) {
    let course = null;
    let book = null;
    let notes = null;

    this.global.addwishlist(book, course, flashcard, notes).subscribe(Res => {

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
          title: 'This flashcard is already in your watchlist',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if(error.status==406){
        swal({
          type: 'error',
          title: 'Flashcard Already Purchased',
          showConfirmButton: false,
          timer: 1500
        })
      }
       
    });

  }
}
