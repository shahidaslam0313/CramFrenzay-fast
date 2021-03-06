import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeemorempService } from "./seemoremp.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from '../../global.service';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import { mainpageservice } from '../mainpage/mainpage.service';
import { WishlistService } from 'app/wishlist/wishlist.service';
import { BidHistoryService } from "../../bid-history/bid-history.service";


@Component({
  selector: 'app-seemoremp',
  templateUrl: './seemoremp.component.html',
  styleUrls: ['./seemoremp.component.scss']
})
export class SeemorempComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  bidnotes;
  bidcourse;
  bidflash;
  bidbooks;
  toprated;
  mostpopular;
  recommended;
  pager: any = {};
  model: any = {};
  nullvalue = null;
  id;
  cartitem;
  wishlist;
  bidform = new FormGroup({
    bidamount: new FormControl('', [
      Validators.required
    ])
  })
  private sub: Subscription;
  constructor(private bidings: BidHistoryService, private headServ: headerservice, private Data: DataService, private see: WishlistService, private mainpage: mainpageservice, private pagerService: PagerService, private seemore: SeemorempService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, private global: GlobalService, public dialogRef: MatDialog) {
    this.route.params.subscribe(params => { });
    this.sub = this.route.params.subscribe(params => {
      this.name = +params['name'];
      if (params['name'] == "Bid&BuyNotes") {
        this.setPagenotes(1);
      }
      else if (params['name'] == "Bid&BuyCourses") {
        this.setPagecourse(1);
      }
      else if (params['name'] == "Bid&BuyFlashCards") {
        this.setPagflash(1);
      }
      else if (params['name'] == "Bid&BuyBooks") {
        this.setPagebooks(1);
      }


    });
  }
  name;
  ngOnInit() {
    window.scroll(0, 0)

  }
  courses(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { courseid: id } });
    } else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  flashcard(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { cardsid: id } });
      localStorage.setItem('flashcard', id);
    } else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  Books(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { bookid: id } });
    } else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  check_login() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        let local = localStorage.getItem('currentUser');
        return true;
      }
      else {
        return false;
      }
    }
  }
  sweetalertnotes() {
    swal({
      text: ' Please Login to access this functionality ',
      title: 'Authentications Required',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#cc0000', timer: 2000,
      confirmButtonText: 'OK',
    });
  }
  openDialog(notes): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          notes: notes,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });

    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
    this.showhistory(notes, this.course, this.flashcard, this.book)
  }
  showhistory(notes, course, flashcard, book) {
    return this.global.offerhistory(notes, course, flashcard, book)
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
    this.showhistory(this.notes, course, this.flashcard, this.book)
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
    this.showhistory(this.notes, this.course, this.flashcard, book)
  }
  openDialog4(flashcard): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          flashcard: flashcard,
        }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
    this.showhistory(this.notes, this.course, flashcard, this.book)
  }
  checkmainpage(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], { queryParams: { notesid: id } });
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  setPagenotes(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.BidbuyNotesonnMainPage(page).subscribe(data => {
      this.bidnotes = data;
      this.pager = this.pagerService.getPager(this.bidnotes['totalItems'], page, 10);
    });
  }
  setPagecourse(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.BidbuyCourseonnMainPage(page).subscribe(data => {
      this.bidcourse = data;
      this.pager = this.pagerService.getPager(this.bidcourse['totalItems'], page, 10);
    });
  }
  setPagflash(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.BidbuyFlashonnMainPage(page).subscribe(data => {
      this.bidflash = data;
      this.pager = this.pagerService.getPager(this.bidflash['totalItems'], page, 10);
    });
  }
  setPagebooks(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.seemore.BidbuyBooksonnMainPage(page).subscribe(data => {
      this.bidbooks = data;
      this.pager = this.pagerService.getPager(this.bidbooks['totalItems'], page, 10);
    });
  }

  addwishlist(course, book, flashcard, notes) {

    this.global.addwishlist(book, course, flashcard, notes).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully added to watch list',
        showConfirmButton: false,
        timer: 2000
      });
      if (notes) {
        this.setPagenotes(1);
      }
      else if (course) {
        this.setPagecourse(1);
      }
      else if (flashcard) {
        this.setPagflash(1);
      }
      else if (book) {
        this.setPagebooks(1);
      }
      this.headServ.showwishlist().subscribe(wishList => {
        this.wishlist = wishList;
        this.Data.emittedData(this.wishlist);
      })
    }, error => {
      if (error.status == 404) {
        swal({
          type: 'warning',
          title: 'This item is already exist in your watch list',
          showConfirmButton: false,
          timer: 2000
        })
      }
      else if (error.status == 406) {
        swal({
          type: 'error',
          title: 'Item Already Purchased',
          showConfirmButton: false,
          timer: 2000
        })
      }

    });

  }
  bidbookid
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
  sweetalertsignin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy!",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  bidingonbook(f: NgForm) {
    if (this.bidform.controls.bidamount.valid) {
      this.global.bidonbook(this.bidbookid, this.bidform.value['bidamount'])
        .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Your bid is listed',
            showConfirmButton: false,
            timer: 5500
          });
        },
          error => {
            if (error.status === 403)
              swal({
                type: 'error',
                title: 'Bid higher amount',
                showConfirmButton: false,
                timer: 5500
              });
          });

    }
    else
      swal({
        type: 'error',
        title: 'Bid amount is required',
        showConfirmButton: false,
        timer: 1500
      });
    f.resetForm()
  }
  bidonnotes;
  bidnotesid(id) {
    if (this.check_login() == true) {
      this.bidonnotes = id;
      this.getnotebidhistory(this.bidonnotes);
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  biding(f: NgForm) {
    if (this.bidform.controls.bidamount.valid) {
      this.global.bidnotes(this.bidonnotes, this.bidform.value['bidamount'])
        .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Your bid is listed',
            showConfirmButton: false,
            timer: 5500
          });
        },
          error => {
            if (error.status == 403)
              swal({
                type: 'error',
                title: 'Bid higher amount',
                showConfirmButton: false,
                timer: 2000
              });
          },
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
    if (this.bidform.controls.bidamount.valid) {
      this.global.bidoncourses(this.bidingcourse, this.bidform.value['bidamount'])
        .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Your bid is listed',
            showConfirmButton: false,
            timer: 5500
          });
        },
          error => {
            if (error.status === 403)
              swal({
                type: 'error',
                title: 'Bid higher amount',
                showConfirmButton: false,
                timer: 5500
              });
          });

    }
    else
      swal({
        type: 'error',
        title: 'Bid amount is required',
        showConfirmButton: false,
        timer: 1500
      });
    f.resetForm()
  }
  cardid;
  getcardid(id) {

    if (this.check_login() == true) {
      this.cardid = id;
      this.getcardbidhistory(this.cardbid);
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  bidcard(f: NgForm) {
    if (this.bidform.controls.bidamount.valid) {
      this.global.bidoncards(this.cardid, this.bidform.value['bidamount'])
        .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Your bid is listed',
            showConfirmButton: false,
            timer: 5500
          });
        },
          error => {
            if (error.status === 403)
              swal({
                type: 'error',
                title: 'Bid higher amount',
                showConfirmButton: false,
                timer: 5500
              });
          });
    }
    else
      swal({
        type: 'error',
        title: 'Bid amount is required',
        showConfirmButton: false,
        timer: 1500
      });
    f.resetForm()
  }
  addcart(notes, course, book, flashcard) {
    if (this.check_login() == true) {
      this.global.addtocart(notes, course, book, flashcard).subscribe(data => {
        swal({
          type: 'success',
          title: 'Item successfully added to cart',
          showConfirmButton: false,
          timer: 4500
        });
        if (notes) {
          this.setPagenotes(1);
        }
        else if (course) {
          this.setPagecourse(1);
        }
        else if (flashcard) {
          this.setPagflash(1);
        }
        else if (book) {
          this.setPagebooks(1);
        }
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
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  delflashfromcart(event) {
    this.global.delcart(event.cart).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from cart',
        showConfirmButton: false,
        timer: 1500
      });
      this.setPagflash(1);
    });
  }
  delBookfromcart(event) {
    this.global.delcart(event.cart).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from cart',
        showConfirmButton: false,
        timer: 1500
      });
      this.setPagebooks(1);
    });
  }
  delCoursefromcart(event) {
    this.global.delcart(event.cart).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from cart',
        showConfirmButton: false,
        timer: 1500
      });
      this.setPagecourse(1);
    });
  }
  delNotesfromcart(event) {
    this.global.delcart(event.cart).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from cart',
        showConfirmButton: false,
        timer: 1500
      });
      this.setPagenotes(1);
    });
  }
  getcartitems() {
    this.mainpage.showCartItem().subscribe(data => {
    })
  }
  delCourseFwishList(event) {
    this.see.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from watch list',
        showConfirmButton: false,
        timer: 1500
      });
      this.setPagecourse(1);
    });
  }
  delFlaskFwishList(event) {
    this.see.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from watch list',
        showConfirmButton: false,
        timer: 1500
      });
      this.setPagflash(1);
    });
  }
  delBookFwishList(event) {
    this.see.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from watch list',
        showConfirmButton: false,
        timer: 1500
      });
      this.setPagebooks(1);
    });
  }
  delNotesFtrendingNow(event) {
    this.mainpage.delwishlist(event.wishlist).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from watch list',
        showConfirmButton: false,
        timer: 1500
      });
      this.setPagenotes(1);
    });
  }

  notebid;
  coursebid;
  notes;
  ////////////note biding history ///////////////
  getnotebidhistory(id) {
    this.bidings.notebidhistory(this.bidonnotes).subscribe(data => {
      this.notebid = data;
      this.notes = data['Highest Bid'];
    })
  }
  ////////////course  biding history////////
  getcoursebidhistory(id) {
    this.bidings.coursebidhistory(this.bidingcourse).subscribe(data => {
      this.coursebid = data;
      this.course = data['Highest Bid'];
    })
  }
  course;
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
  book;
  getbookbidhistory(id) {
    this.bidings.bookbidhistory(id).subscribe(data => {
      this.book = data;
      this.getbooks = data['Highest Bid'];

    })
  }
}
