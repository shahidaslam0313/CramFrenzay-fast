import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { booksservice } from './books.service';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {GlobalService} from '../../global.service';

declare const $: any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  result;
  pager: any = {};
  public name;
  private productsSource;
  currentProducts;
  // role;
  constructor(private pagerservice: PagerService, private book: booksservice, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, private global: GlobalService) {

    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();

    }
  }

  ngOnInit() {

    $('.slick-books').slick({
      slidesToShow: 3
    });
    // this.newbooks();
    this.Showcategories();
  }

  onsubmit() {
    if (isPlatformBrowser(this.platformId)) {

      this.router.navigate(['/searchbooks/' + this.name]);
      localStorage.setItem('name', this.name);
    }

  }
  submit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
    }
  }
  sweetalertbooks() {
    swal({
      // text:"Error",
      text: ' Please sign in to access this functionality ',
      title: 'Authentications Required',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#cc0000', timer: 2000,
      confirmButtonText: 'OK',
    });
  }

  Showcategories() {
    this.global.InnerslideronMainPage().subscribe(data => {
      this.result = data;
    });
  }
}
