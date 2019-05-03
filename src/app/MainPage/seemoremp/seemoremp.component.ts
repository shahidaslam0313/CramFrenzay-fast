import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeemorempService } from "./seemoremp.service";
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import {GlobalService} from '../../global.service';
import { AcceptofferComponent } from 'app/acceptoffer/acceptoffer.component';
import { MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';
import { mainpageservice } from '../mainpage/mainpage.service';


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
  private sub: Subscription;
  constructor(private headServ: headerservice, private Data: DataService,private mainpage: mainpageservice, private pagerService: PagerService, private seemore: SeemorempService, private router: Router, private route: ActivatedRoute,  @Inject(PLATFORM_ID) private platformId: Object , private global: GlobalService, public dialogRef: MatDialog) {
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
      window.scroll(0,0)

  }
  courses(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {courseid : id}});
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
  Books(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {bookid : id}});
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

    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
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
  openDialog3(books): void {
    if (this.check_login() == true) {
      const dialogRef = this.dialogRef.open(AcceptofferComponent, {
        width: '500px',
        data: {
          books: books,
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
  checkmainpage(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {notesid : id}});
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
        title: 'Added to Watch List',
        showConfirmButton: false,
        timer: 4500
      })
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
          timer: 4500
        })
    });

  }
  bidbookid
  /////////////biding in books/////////
  booksid(id) {
    this.bidbookid = id;
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

  bidingonbook() {
    this.global.bidonbook( this.bidbookid, this.model.bidamount, )
      .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Your bid is listed',
            showConfirmButton: false,
            timer: 5500
          });
        },
        error => {
          if(error.status===403){
            swal({
              type: 'error',
              title: 'Bid higher amount',
              showConfirmButton: false,
              timer: 5500
            });
          }
        }
      );
  }
  bidonnotes;
  bidnotesid(id) {
    if (this.check_login() == true) {
      this.bidonnotes = id;
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  biding() {
    this.global.bidnotes( this.bidonnotes, this.model.bidamount)
      .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Your bid is listed',
            showConfirmButton: false,
            timer: 5500
          });
        },
        error => {
          if(error.status === 403)
            swal({
              type: 'error',
              title: 'Bid higher amount',
              showConfirmButton: false,
              timer: 5500
            });
        },

      );
  }
  bidingcourse;
  ////////////////biding on courses///////////
  bidcourseid(id) {
    if (this.check_login() == true) {
      this.bidingcourse = id;
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
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
          if(error.status===403){
            swal({
              type: 'error',
              title: 'Bid higher amount',
              showConfirmButton: false,
              timer: 5500
            });
          }
        }
      );

  }
  // form= new FormGroup({
  //   notebid: new FormControl('',[
  //     Validators.required,
  //     Validators.pattern('^[0-9]*$'),
  //   ]),
  //   // cardbid: new FormControl('',[
  //   //   Validators.pattern('^[0-9]*$'),
  //   // ])
  // })
  
  cardid;
  getcardid(id){

    if (this.check_login() == true){
      this.cardid = id;
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  bidcard() {
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
          if(error.status===403){
            swal({
              type: 'error',
              title: 'Bid higher amount',
              showConfirmButton: false,
              timer: 5500
            });
          }
           else if(error.status===404){
              swal({
                type: 'error',
                title: 'Place higher bid',
                showConfirmButton: false,
                timer: 5500
              });
            }

        }
      );
  }
  addcart( notes, course, book, flashcard){
    if (this.check_login() == true) {
      this.global.addtocart(notes, course, book, flashcard).subscribe(data => {
        swal({
          type: 'success',
          title: 'Added to Cart',
          showConfirmButton: false,
          timer: 4500
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
            timer: 4500
          })
          else if ( error.status === 406)
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
delfromcart(event) {
  this.global.delcart(event.cart).subscribe(data => {
    swal({
      type: 'success',
      title: 'Successfully deleted',
      showConfirmButton: false,
      timer: 1500
    });
  });
}
getcartitems(){
  this.mainpage.showCartItem().subscribe(data =>{
  })
}
}
