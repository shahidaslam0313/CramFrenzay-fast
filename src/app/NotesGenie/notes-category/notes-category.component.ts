import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { notescategoryservice } from '../notes-category/notes-category.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GlobalService} from '../../global.service';

declare const $: any;
@Component({
  selector: 'app-notes-category',
  templateUrl: './notes-category.component.html',
  styleUrls: ['./notes-category.component.scss']
})
export class NotesCategoryComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  public result: any;
  private productsSource;
  currentProducts;
  constructor(private newService: notescategoryservice, private router: Router, private route: ActivatedRoute,   @Inject(PLATFORM_ID) private platformId: Object , private global: GlobalService) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }
  ngOnInit() {
    window.scrollTo(0,0);
    this.Showcategory();
  }
  onsubmit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
    }
  }
  Showcategory() {
    this.global.InnerslideronMainPage().subscribe(data => {
      this.result = data;
      setTimeout(function () {
        $('.slick-testimonial').slick({
          slidesToShow: 6,
          variableWidth: true,
          prevArrow: '<button class="slick-main-btn-left"><i class="fa fa-angle-left"></i></button>',
          nextArrow: '<button class="slick-main-btn-right"><i class="fa fa-angle-right"></i></button>',
          responsive: [
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      });
    });
  }

  sweetalertnotescategory() {
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
}
