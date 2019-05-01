import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isPlatformBrowser} from '@angular/common';
// declare var localStorage: any;
@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  private productsSource;
  currentProducts;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();

    }
  }

  ngOnInit() {
  }

}
