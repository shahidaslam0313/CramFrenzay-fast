import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BookcategoryService } from './bookcategory.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-bookcategory',
  templateUrl: './bookcategory.component.html',
  styleUrls: ['./bookcategory.component.scss']
})
export class BookcategoryComponent implements OnInit {
  public Imageurl = Config.Imageurleach;
  public Thumbnailurl = Config.Imageurlget;
  bookcate = [];
  public bookID: any;
  private sub: Subscription;
  private productsSource;
  currentProducts;
  bidbookid;
  model: any={};
  eachbook;
  catId;
  name;
  constructor(private detail: BookcategoryService, private router: Router, private route: ActivatedRoute, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
    this.name = localStorage.getItem('nestedname');
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.bookID = +params['id'] || 0;
      this.catId = +params['id'] || 0;
    });
    this.newbooks();
    this.bookcategory(this.catId)
  }


  sweetalertbooks() {
    swal({
      // text:"Error",
      text: ' Please sign in to access this functionality ',
      title: 'Authentications Required',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#DD6B55', timer: 2000,
      confirmButtonText: 'OK',
    });
  }

  newbooks() {
    this.detail.subbooks(this.bookID).subscribe(data => {
      this.bookcate = data;
    });
  }
  bookcategory(catId) {
    this.detail.bookSubcat(this.catId).subscribe(data => {
      this.eachbook = data.books;
    });

  }
  onsubmit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
      localStorage.setItem('nameID', 'books');
    }
  }

  books(id) {

    if (this.check_login() == true) {
      this.router.navigate(['/payment']);

      localStorage.setItem('books', id);
    }
    else if (this.check_login() == false) {
      this.sweetalertbooks();
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
  /////////////biding in books/////////
  booksid(id){
    this.bidbookid = id;
  }
  bidb(){
    this.detail.bidonbooks(this.model,null,null,null,this.bidbookid)
      .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Successful biding on Book',
            showConfirmButton: false,
            timer: 5500
          });
        },
        error => {
          swal({
            type: 'error',
            title: 'error',
            showConfirmButton: false,
            timer: 5500
          });
        }
      );

  }
}
