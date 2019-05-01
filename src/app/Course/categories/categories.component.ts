import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { Router } from '@angular/router';
import { categoriesservice } from './categories.service';
import { PagerService } from '../../paginator.service';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {GlobalService} from '../../global.service';

declare const $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  result;
  pager: any = {};
  public name;
  private productsSource;
  currentProducts;

  constructor(private pagerService: PagerService, private categories: categoriesservice, private router: Router,  @Inject(PLATFORM_ID) private platformId: Object , private global: GlobalService) {

    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.Showcategories();
  }
  onsubmit() {
    if (isPlatformBrowser(this.platformId)) {

      this.router.navigate(['/coursesearch/' + this.name]);
      localStorage.setItem('name', this.name);
    }
  }
  submit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
      localStorage.setItem('nameID', 'notes');
    }
  }
  Showcategories() {
      this.global.InnerslideronMainPage().subscribe(data => {
      this.result = data;
    });
  }

  sweetalertnotes() {
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
