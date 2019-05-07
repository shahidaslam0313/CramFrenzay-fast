import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { mainpageservice } from "./mainpage.service";
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { DataService } from '../../data.service';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from '../../global.service';
import { NgForm } from '@angular/forms';
import { headerservice } from '../../includes/header/header.service';
import {WishlistService} from '../../wishlist/wishlist.service';
import {AcceptofferComponent} from '../../acceptoffer/acceptoffer.component';
import { MatDialog } from '@angular/material';
import {BidHistoryService} from "../../bid-history/bid-history.service";

declare const $: any;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})

export class MainpageComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  bidbooks;
  model: any = {};
  bidnotes;
  bidflashcards;
  current;
  count;
  inner;
  Wishlist;
  toprated;
  currentProducts;
  public name;
  cid;
  id;
  input;
  result4;
  bidonnotes;
  result;
  notes;
  bidamount: any;
  bid;
  wishlist;
  public slideConfig;
  data;
  username;
  currentUser;
  token;
  slideConfig2;
  price;
  cardid;
  chapter_id;
  message: string;
  cartitem: any;
  constructor( private bidings: BidHistoryService, private headServ: headerservice,  private mainpage: mainpageservice,  private see: WishlistService, private router: Router, private Data: DataService, public global: GlobalService ,  @Inject(PLATFORM_ID) private platformId: Object,  public dialogRef: MatDialog) {
    this.Innerslider();
    this.BidBuynotes();
  }

  ngOnInit() {
    this.global.currentMessage.subscribe(message => this.message = message);
    this.bidcourse();
    this.BidBuyflashcards();
    this.BidBuybooks();

    const mainSearch = $('.main-search');
    const formSearch = $('.form-search');

    $('.search-bg').click(function () {
      $(mainSearch).addClass('active');
      $('body').addClass('noScroll');
      $(formSearch).addClass('flipInX');


      setTimeout(function () {
        $('#input-searchbar').focus();
      }, 370);


    });

    $('#closeSearch').click(function () {
      $(mainSearch).removeClass('active');
      $('body').removeClass('noScroll');
      $(formSearch).removeClass('flipInX');
    });


  }
  deleteFWL(event) {
        this.see.delwishlist(event.wishlist).subscribe(data => {
          this.getwishlis();
          swal({
            type: 'success',
            title: 'Successfully deleted',
            showConfirmButton: false,
            timer: 1500
          });
          this.BidBuynotes();
        });
  }
  delTrendingCFwishList(event) {
        this.see.delwishlist(event.wishlist).subscribe(data => {
          swal({
            type: 'success',
            title: 'Successfully deleted',
            showConfirmButton: false,
            timer: 1500
          });

        });
  }
  openDialog2(course): void {
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
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  openDialog3(book): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          book: book,
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
  openDialog4(chapter_id): void {
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
  openDialog5(notes): void {
    // alert(this.chapter_id)
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          notes: notes,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
      
      // console.log(this.notes)
      // alert(chapter_id)
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  checkOffer(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      // alert(notes);
      this.mainpage.bid(notes, course, book, flashcard).subscribe(data => {
       this.openDialog5(notes)
        },
        error => {
          if ( error.status === 406)
              swal({
                type: 'error',
                title: 'Item Already Purchased',
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
  checkOffer2(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      // alert(notes);
      this.mainpage.bid(notes, course, book, flashcard).subscribe(data => {
       this.openDialog2(course)
        },
        error => {
          if ( error.status === 406)
              swal({
                type: 'error',
                title: 'Item Already Purchased',
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
  checkOffer3(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.mainpage.bid(notes, course, book, flashcard).subscribe(data => {
       this.openDialog2(book)
        },
        error => {
          if ( error.status === 406)
              swal({
                type: 'error',
                title: 'Item Already Purchased',
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


  Innerslider() {
    this.global.InnerslideronMainPage().subscribe(data => {
      this.inner = data;
      // console.log(this.inner);
      this.slideConfig2 = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: false,
        prevArrow: '<button class="leftRs" style="left: 30px;"><i class="fa fa-chevron-left"></i></button>',
        nextArrow: '<button class="rightRs" style="right: 30px;"><i class="fa fa-chevron-right"></i></button>',
        responsive: [
          {
            breakpoint: 1254,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true
            }
          },
          {
            breakpoint: 1117,
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
      }
    });
  }
  course;
  book;
  checkmainpage(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {notesid : id}});
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  courses(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {courseid : id}});
      // localStorage.setItem('course', id);
    } else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  flashcard(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {cardsid : id}});
      localStorage.setItem('flashcard', id);
    } else if (this.check_login() == false) {
      this.sweetalertsignin();
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
      this.bidcourse();
    });
  }
  delFlaskFwishList(event) {
    this.see.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 1500
      });
      this.BidBuyflashcards();
    });
  }
  delBookFwishList(event) {
    this.see.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 1500
      });
      this.BidBuybooks();
    });
  }
  delNotesFtrendingNow(event){
    this.mainpage.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item deleted from watchlist',
        showConfirmButton: false,
        timer: 1500
      })

    });
  }


  books(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {bookid : id}});
      localStorage.setItem('books', id);
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
  cart
  getwishlis(){
    this.mainpage.showwishlist().subscribe(data =>{
    })
  }
  getcartitems(){
    this.mainpage.showCartItem().subscribe(data =>{
    })
  }
  // getcart(){
  //   this.mainpage.showCartItem().subscribe(data=>{
  //     this.cart=data

  //   })
  // }

  sweetalertsignin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2500,
    });
  }
  bidcourse() {
    this.mainpage.BidCourseson().subscribe(data => {
      this.result4 = data;

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

  BidBuybooks() {
    this.mainpage.BidbuyBooksonnMainPage().subscribe(data => {
      this.bidbooks = data;
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

  BidBuynotes() {
    this.mainpage.BidbuyNotesonnMainPage().subscribe(data => {
      this.bidnotes = data;
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
    sliderClick(name){
    localStorage.setItem('slidername' , name);
    }
  BidBuyflashcards() {
    this.mainpage.BidbuyFlashCardsonnMainPage().subscribe(data => {
      this.bidflashcards = data;
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
  courseid(id) {
    this.bid = id;
  }
  wid;
  nullvalue = null;
  addwishlist( book, course, flashcard, notes) {
    if (this.check_login() == true) {
      this.mainpage.addwishlist(book, course, flashcard, notes).subscribe(data => {
        this.global = data;
        swal({
          type: 'success',
          title: 'Add to Watch List',
          showConfirmButton: false,
          timer: 2000
        });
        this.BidBuynotes();
        this.BidBuyflashcards();
        this.BidBuybooks();
        this.bidcourse();
        this.headServ.showwishlist().subscribe(wishList => {
          this.wishlist = wishList;
          this.Data.emittedData(this.wishlist);
        })

      }, error => {
        if (error.status == 404)
          swal({
            type: 'warning',
            title: 'This item is already exist in your watch list',
            showConfirmButton: false,
            timer: 2000
          })
          else if ( error.status === 406)
          swal({
            type: 'error',
            title: 'Item Already Purchased',
            showConfirmButton: false,
            timer: 2000
          })
      });
      this.getcartitems()
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  Check:boolean=false;
  check(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.mainpage.bid(notes, course, book, flashcard).subscribe(data => {

        },
        error => {
          if ( error.status === 406)
              swal({
                type: 'error',
                title: 'Item Already Purchased',
                showConfirmButton: false,
                timer: 4500
              })  
          },)       
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  bidnotesid(id){
    if (this.check_login() == true) {
      this.bidonnotes = id;
      this.getnotebidhistory(this.bidonnotes);

    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  bidingcourse;
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
  bidc(f: NgForm) {
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
f.reset();
  }
  biding(f: NgForm) {
    this.global.bidnotes(this.bidonnotes, this.model.bidamount)
      .subscribe(Res => {
        swal({
          type: 'success',
          title: 'Your bid is listed',
          showConfirmButton: false,
          timer: 5500
        });
      },
      error => {
        if (error.status === 403 || error.status === 500)
          swal({
            type: 'error',
            title: 'Bid higher amount',
            showConfirmButton: false,
            timer: 5500
          });
      },

    );
    f.resetForm();
  }
  getcardid(id) {

    if (this.check_login() == true) {
      this.cardid = id;
      this.getcardbidhistory(this.cardid);
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  bidcard(f: NgForm) {
    this.global.bidoncards(this.cardid, this.model.bidamount, )
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
    f.resetForm();
  }
  bidbookid;
  /////////////biding in books/////////
  booksid(id) {
    if (this.check_login() == true) {
      this.bidbookid = id;
      this.getbookbidhistory(this.bidbookid);
    } else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }


  bidingonbook(f: NgForm) {
    this.global.bidonbook(this.bidbookid, this.model.bidamount, )
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
    f.resetForm();
  }
  addcart( notes, course, book, flashcard){
    if (this.check_login() == true) {
      this.mainpage.addtocart(notes, course, book, flashcard).subscribe(data => {
        this.global = data;
        swal({
          type: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 2000
        });
        this.headServ.showCartItem().subscribe(cartitem => {
          this.cartitem = cartitem;
          this.Data.emittData(this.cartitem);
        })
      }, error => {
        if (error.status == 404)
          swal({
            type: 'warning',
            title: 'This item is already exist in your Cart',
            showConfirmButton: false,
            timer: 2000
          })
          else if ( error.status === 406)
          swal({
            type: 'error',
            title: 'Item Already Purchased',
            showConfirmButton: false,
            timer: 2000
          })
        });
  }
  else if (this.check_login() == false) {
    this.sweetalertsignin();
    this.router.navigate(['/login']);
  }
}
delfromcart(event) {
  this.global.delcart(event.cart).subscribe(data => {
    swal({
      type: 'success',
      title: 'Successfully deleted',
      showConfirmButton: false,
      timer: 1500
    });
    this.BidBuynotes();
  });
}
  notebid;
  coursebid;
////////////note biding history ///////////////
  getnotebidhistory(id) {
    this.bidings.notebidhistory(this.bidonnotes).subscribe(data => {
        this.notebid = data;
        this.notes = data['Highest Bid'];})}
  ////////////course  biding history////////
  getcoursebidhistory(id) {
    alert(this.bidingcourse);
    this.bidings.coursebidhistory(this.bidingcourse).subscribe(data => {
        this.coursebid = data;
        this.course = data['Highest Bid'];
      })
  }
  cardbid;
  /////////// card bid history/////////
  getcardbidhistory(id) {
    this.bidings.cardbidhistory(this.cardid).subscribe(data => {
        this.cardbid = data;
        this.flashcardsbid = data['Highest Bid'];
      })
  }
  flashcardsbid;
  ///////////book bid history//////
  getbook;
  getbooks;
  getbookbidhistory(id) {
    this.bidings.bookbidhistory(id).subscribe(data => {
        this.book = data;
        this.getbooks = data['Highest Bid'];

      })
  }
}
