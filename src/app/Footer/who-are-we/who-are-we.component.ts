import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-who-are-we',
  templateUrl: './who-are-we.component.html',
  styleUrls: ['./who-are-we.component.scss']
})
export class WhoAreWeComponent implements OnInit {
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
