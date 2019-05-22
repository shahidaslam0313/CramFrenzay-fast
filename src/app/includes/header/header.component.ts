import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { Config } from '../../Config';
import { isPlatformBrowser } from '@angular/common';
import { headerservice } from './header.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { DataService } from '../../data.service';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WishlistService } from '../../wishlist/wishlist.service';
import {GlobalService} from '../../global.service';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  result: any;
  public username;
  public name;
  private sub: Subscription;
  private productsSource;
  currentProducts;
  currentUser;
  wishlistdelete;
  Wishlist = [];
  count;
  course: any = [];
  wishId = [];
  wishnotesId = [];
  wishbook = [];
  cardwish = [];
  notes: any[];
  allcourse: any[];
  flashcard: any[];
  book: any[];
  role;
  token;
  Courses = [];
  Notes = [];
  FlashCard = [];
  GlobalWishListCourses;
  Book = [];
  public query: any;
  val;
  data;
  current;
  notifications = [];
  message: string;
  getnotifi;
  id;
  wishlist;
  Logedin;
  wishlistCourses;
  emptyWishlist;
  totalprice: any;
  constructor( private route: ActivatedRoute, public router: Router,  public header: headerservice, private wish: WishlistService, private Data: DataService, public global: GlobalService , private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem("loged_in");
    }
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });

    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length===0){
          this.wishlistCourses = [];
        }else {
          this.wishlistCourses = data;
        }
      });
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
    this.global.emptyWishlistGlobal$.subscribe(
      data => {
        this.emptyWishlist = data;
      });
    this.token = localStorage.getItem('Authorization');
    if(this.token!=null){
      this.global.setGlobalToken(true);
    }else{
      this.global.setGlobalToken(false);
    }

    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length===0){
          this.GlobalWishListCourses = [];
        }else {
          this.GlobalWishListCourses = data;
        }
      });
  }

  itemscount;
  items;
  sum;

  removeitems(cartid) {
    this.header.removeFromCart(cartid).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Item deleted from cart',
        showConfirmButton: false,
        timer: 1500
      })
      this.clearCart();
      this.showCartItems();
    });

  }


  ngOnInit() {
    const mainSearch = $('.main-search');

    $('.open-search').click(function () {
      $(mainSearch).addClass('active');
      $('body').addClass('noScroll');

      setTimeout(function () {
        $('#input-searchbar').focus();
      }, 370);

    });

    $('#closeSearch').click(function () {
      $(mainSearch).removeClass('active');
      $('body').removeClass('noScroll');
    });
    this.global.currentMessage.subscribe(message => this.message = message);
    this.Data.getEmittedValue().subscribe(data => {
      this.showCartItems()
      this.count = data.count;
      for (let val in this.Data) {
        if (this.Data[val].course) {
          this.wishId.push(this.Data[val])
        } else if (this.Data[val].notes) {
          this.wishnotesId.push(this.Data[val])
        } else if (this.Data[val].book) {
          this.wishbook.push(this.Data[val])
        } else if (this.Data[val].flashcard) {
          this.cardwish.push(this.Data[val])
        }
      }
    });
    this.Data.getEmittValue().subscribe(data =>{
      this.showlist()
      this.itemscount = data.counts;
      console.log(this.itemscount,'Shameem')
      console.log(data,'ASDFGHJKL')
      
    })
    if (this.Logedin === '1') {
      this.header.showwishlist().subscribe(response => {
        if(response.hasOwnProperty("status")) {
          this.wishlistCourses = [];
          this.emptyWishlist = true;
        }
        else {
          this.wishlistCourses = response;
          this.global.getGolbalWishListCourses(this.wishlistCourses);
          this.emptyWishlist = false;
        }

      });
    }
    
    this.sub = this.route.params.subscribe(params => {
      this.name = +params['name'];
    });
    this.notification();
    this.showCartItems();
    this.showlist();
   

    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = localStorage.getItem('currentUser')
      $('.main-nav__btn').on('click', function () {
        $(this).toggleClass('open');
        if ($('.main-nav__list').hasClass('open')) {
          $('.main-nav__list').removeClass('open');

        } else {
          $('.main-nav__list').addClass('open');
        }
      });
    }
    this.showlist();
  }

  checkcourse() {
    if (this.check_login() == true) {
      this.role = localStorage.getItem('role');
      if (this.role == "U") {
        swal({
          title: 'CramFrenzy',
          text: 'Only admin and teacher can Add courses',
          type: 'error',
          showConfirmButton: false,
          confirmButtonColor: "#cc0000",
          timer: 2000,
          confirmButtonText: "OK",
        })
      }
      else if (this.role == "T" || this.role == "A") {
        this.router.navigate(['/upload']);
      }

    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
    }
  }

  checkNotes() {
    if (this.check_login() == true) {
      this.router.navigate(['/uploadcard']);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
    }
  }

  checkflashcard() {
    if (this.check_login() == true) {
      this.role = localStorage.getItem('role');
      if (this.role == "U") {
        swal({
          title: 'CramFrenzy',
          text: 'Only admin and teacher can Add Flash Card',
          type: 'error',
          showConfirmButton: false,
          confirmButtonColor: "#cc0000",
          timer: 2000,
          confirmButtonText: "OK",
        })
      }
      else if (this.role == "T" || this.role == "A") {
        this.router.navigate(['/uploadcard']);
      }
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
    }
  }

  checkbooks() {
    if (this.check_login() == true) {
      this.role = localStorage.getItem('role');
      if (this.role == "U") {
        swal({
          title: 'CramFrenzy',
          text: 'Only admin and teacher can Add Book',
          type: 'error',
          showConfirmButton: false,
          confirmButtonColor: "#cc0000",
          timer: 2000,
          confirmButtonText: "OK",
        })
      }
      else if (this.role == "T" || this.role == "A") {
        this.router.navigate(['/uploadbook'])
      }
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
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
  becometutor() {
    if (!this.check_login()) {
      this.sweetalertlogin();
    } else {
      this.router.navigate(['/tutorregistration']);
    }
  }
  tutor() {
    if (this.check_login() === true) {
      if (localStorage.getItem('role') === 'T') {
        return true;
      }
    }
  }
  institute() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('role') == "I") {
        return true;
      }
      else if (this.role == "A" || this.role == "U" || this.role == "T") {
        return false;
      }
    }
  }
  admin() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('role') == "A" || this.role == "T") {
        return true;

      }
      else if (this.role == "A" || this.role == "U") {
        return false;
      }
    }
  }

  sweetalertlogin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      confirmButtonColor: "#cc0000", timer: 2000,
    });
    this.router.navigate(['/login']);
  }
  selllogin() {
    if (this.check_login() === true) {
      this.router.navigate(['/uploadnotes']);
    }
    else if (this.check_login() === false){
      this.sweetalertlogin();
      this.router.navigate(['/login']);

    }
  }
  emptyCart;
  logout() {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.wishlistCourses = [];
    this.global.getGolbalWishListCourses(this.wishlistCourses);
    this.emptyWishlist = true;
    this.global.getemptyWishlistGlobal(this.emptyWishlist);
    this.emptyCart = true;
    if (this.Logedin === '1') {
      this.Logedin = '0';
      this.global.publishData(this.Logedin);
      this.global.checkUserRole(null);
      this.logoutsweetalert();
    }
    this.global.setGlobalToken(false);

  }
  logoutsweetalert() {

      swal({
        title: "CramFrenzy<br> Thanks for visting us",
        type: "success",
        showConfirmButton: false,
        timer: 2000,
      })

  }

  showlist() {
    this.header.showwishlist().subscribe(data => {
      this.count = data.count;
      this.Data = data.Wishlist;
      for (let val in this.Data) {
        if (this.Data[val].course) {
          this.wishId.push(this.Data[val])
        } else if (this.Data[val].notes) {
          this.wishnotesId.push(this.Data[val])
        } else if (this.Data[val].book) {
          this.wishbook.push(this.Data[val])
        } else if (this.Data[val].flashcard) {
          this.cardwish.push(this.Data[val])
        }
      }
    });
  }

  del(id) {
    this.wishlistdelete = id;
    this.header.delwishlist(id).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item deleted from watchlist',
        showConfirmButton: false,
        timer: 1500
      });
      this.clearWishList();
      this.showlist();
    });
  }

  filter(query) {
    if (query !== '') {
      this.header.search(this.query).subscribe(data => {
        this.notes = data['notes'];
        this.allcourse = data['courses'];
        this.flashcard = data['flashcard'];
        this.book = data['book'];
      });
    }

  }
onsubmits(query) {
    // this.router.navigate(['/generalsearch/' + query]);
    this.router.navigate(['/generalsearch/'], {queryParams: {query : query}});

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', query);
      this.filter(query);
    }
  }
  onsubmit(query) {

    $('.main-search').removeClass('active');
    $('body').removeClass('noScroll');
    $('.form-search').removeClass('flipInX');

    this.router.navigate(['/generalsearch/' + this.name]);
this.filter(query);
  }

  search(name) {
    this.header.search(name).subscribe(data => {
      this.notes = data['notes'];
      this.allcourse = data['courses'];
      this.flashcard = data['flashcard'];
      this.book = data['book'];
    });
  }
  getid;
 getnotifid(id){
    this.getid = id;
    this.putdelnotification(this.getid);
 }
  deleid;
deletenotification(id){
   this.deleid = id;
   this.delenoti(this.deleid);
}
  notification() {
    this.header.getnotification()
        .subscribe(data => {
      this.getnotifi = data;
      this.notifications = data.notifications;
      this.id = data.notifications.id;
    });
  }
  read;
  putdelnotification(id) {
    this.header.putnotification(this.getid).subscribe(data => {
      this.router.navigate(['/mylibrary']);
      this.notification();
    });
  }
  delenoti(id) {
    this.header.delnotification(this.deleid).subscribe(data => {
      swal({
        type: 'success',
        title: 'Notification deleted',
        showConfirmButton: false,
        timer: 1500
      });
      this.notification();
    });
  }

  clearCart() {
    // this.itemscount = null;
    this.sum = null;
    this.items = null;
    this.clearWishList();
  }

  clearWishList() {
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

  moveToWishlist(Book, Course, FlashCard, Notes, cartID) {
    this.header.removeFromCart(cartID).subscribe(Data => {
      this.header.addwishlist(Book, Course, FlashCard, Notes).subscribe(Data => {
        swal({
          type: 'success',
          title: 'Item added in watchlist',
          showConfirmButton: false,
          timer: 1500
        })
      },
        error => {
          swal(
            'CramFrenzy',
            'Item is already in your watchlist',
            'error'
          )
        });
      this.clearCart();
      this.showCartItems();
      this.showlist();
    },
      error => {
        if (error.status === 500) {
          swal(
            'CramFrenzy',
            'Server is under maintenance',
            'error'
          )
        }
        else {
          swal(
            'CramFrenzy',
            'Some thing went worrng',
            'error'
          )
        }
      })
  }

  moveToCart(Book, Course, FlashCard, Notes, cartID) {
    this.header.delwishlist(cartID).subscribe(Data => {
      this.header.addToCart(Book, Course, FlashCard, Notes).subscribe(Data => {
        swal({
          type: 'success',
          title: 'Item added in cart',
          showConfirmButton: false,
          timer: 1500
        })
      },
        error => {
          swal(
            'CramFrenzy',
            'Item is already in your cart',
            'error'
          )
        });
      this.clearWishList();
      this.showlist();
      this.showCartItems();
    },
      error => {
        if (error.status === 500) {
          swal(
            'CramFrenzy',
            'Server is under maintenance',
            'error'
          )
        }
        else {
          swal(
            'CramFrenzy',
            'Some thing went worrng',
            'error'
          )
        }
      })
  }
  public AddToCart(Book, Course, FlashCard, Notes) {
    this.header.addToCart(Book, Course, FlashCard, Notes).subscribe(data => {
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
  }
  removeFromCart(cartID) {
    this.header.removeFromCart(cartID).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Item deleted from cart',
        showConfirmButton: false,
        timer: 1500
      })
      this.showCartItems();
    });

  }

  showCartItems() {
    this.header.showCartItem().subscribe(Data => {
      this.itemscount = Data.counts;
      this.totalprice = Data.sum

      for (let vall in Data.Cart) {
        if (Data.Cart[vall].course) {
          this.Courses.push(Data.Cart[vall]);
        }
        else if (Data.Cart[vall].notes) {
          this.Notes.push(Data.Cart[vall]);
        }
        else if (Data.Cart[vall].book) {
          this.Book.push(Data.Cart[vall]);
        }
        else if (Data.Cart[vall].flashcard) {
          this.FlashCard.push(Data.Cart[vall]);
        }
      }
    })
  }
}
