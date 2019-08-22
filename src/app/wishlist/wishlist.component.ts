///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Config } from "./../Config";
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from "./wishlist.service";
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  private productsSource;
  currentProducts;
  addwish: any = [];
  public Imageurl = Config.Imageurlget;
  result: any;
  public username;
  wish;
  count;
  currentUser;
  wishlistdelete;
  Wishlist = [];
  wishId = [];
  wishnotesId = [];
  cardwish = [];
  wishbook = [];
  constructor(private http2: Http, private route: ActivatedRoute, public router: Router, private sg: SimpleGlobal, private see: WishlistService, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
      this.username = localStorage.getItem('currentUser')
    }
  }

  ngOnInit() {
    window.scroll(0,0)
    this.showlist();
  }
  watchlist
  showlist() {
    this.see.showwishlist().subscribe(data => {
      this.count = data.count
      this.watchlist=data
      console.log(data,'Get Watch List')
      for (let val in data.Wishlist) {
        if (data.Wishlist[val].course) {
          this.wishId.push(data.Wishlist[val])
        }
        else if (data.Wishlist[val].notes) {
          this.wishnotesId.push(data.Wishlist[val])
        }
        else if (data.Wishlist[val].book) {
          this.wishbook.push(data.Wishlist[val])
        }
        else if (data.Wishlist[val].flashcard) {
          this.cardwish.push(data.Wishlist[val])
        }
      }
    });
  }

  clear() {
    while (this.wishId.length > 0) {
      this.wishId.pop();
    }
    while (this.wishnotesId.length > 0) {
      this.wishnotesId.pop();
    }
    while (this.cardwish.length > 0) {
      this.cardwish.pop();
    }
    while (this.wishbook.length > 0) {
      this.wishbook.pop();
    }
  }

  del(id) {
    // swal({
    //   title: 'Offers',
    //   text: "Buyers will not be able to send you offers on different amount per item",
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes'
    // }).then((result) => {
      this.see.delwishlist(id).subscribe(data => {
        swal({
          type: 'success',
          title: 'Successfully deleted',
          showConfirmButton: false,
          timer: 1500
        })
        this.showlist();
      });

    // })
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
      this.router.navigate(['/payment'])
    }
    else if (this.check_login() == false) {
      this.sweetalertcourse();
      this.router.navigate(['/login']);
    }
  }

  sweetalertcourse() {
    swal({
      text: "Please Login First",
      title: "Sorry",
      type: "error",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55", timer: 2000,
      confirmButtonText: "OK",
    });
  }

  wishList(Book, Course, FlashCard, Notes, ID) {
    this.see.addwishlist(Book, Course, FlashCard, Notes).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Item added in watchlist!',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      if (error.status == 404)
        swal({
          type: 'warning',
          title: 'This item is already in your wishlist',
          showConfirmButton: false,
          timer: 1500
        })
    });
  }

  addtocart(Book, Course, FlashCard, Notes, ID) {
    this.see.delwishlist(ID).subscribe(data => {
      this.see.addToCart(Book, Course, FlashCard, Notes).subscribe(data => {
        swal({
          type: 'success',
          title: 'Item added in cart',
          showConfirmButton: false,
          timer: 1500
        })
      }, error => {
        if (error.status == 404)
          swal({
            type: 'warning',
            title: 'This item is already in your cart',
            showConfirmButton: false,
            timer: 1500
          })
      });
      this.clear();
      this.showlist();
    });
  }
}