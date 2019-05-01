import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TextbooksService } from './textbooks.service';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { applyRedirects } from '@angular/router/src/apply_redirects';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare const $: any;

@Component({
  selector: 'app-textbooks',
  templateUrl: './textbooks.component.html',
  styleUrls: ['./textbooks.component.scss']
})
export class TextbooksComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  books;
  result2;
  result3;
  flashcards;

  private productsSource;
  currentProducts;
  constructor(private book: TextbooksService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();

    }
  }


  ngOnInit() {
    this.recentlybooks();
    this.recentlycourses();
    this.recentlynotes();
    this.recentlyflashcard();
  }



  sweetalerttextbooks() {
    swal({
      // text:"Error",
      text: 'Please sign in to access this functionality',
      title: 'Authentications Required',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#DD6B55', timer: 2000,
      confirmButtonText: 'OK',
    });
  }

  recentlybooks() {
    this.book.booksdetail().subscribe(data => {
      this.books = data;
      setTimeout(function () {
        $('.slick-main').slick({
          slidesToShow: 4,
          infinite: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      }, 500);
    });
  }


  recentlycourses() {
    this.book.bookscourses().subscribe(data => {
      this.result2 = data;
    });
  }

  recentlynotes() {
    this.book.booksnotes().subscribe(data => {
      this.result3 = data;
    });
  }

  recentlyflashcard() {
    this.book.flashcard().subscribe(data => {
      this.flashcards = data;
    });
  }
  checkbook() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalerttextbooks();
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
}
