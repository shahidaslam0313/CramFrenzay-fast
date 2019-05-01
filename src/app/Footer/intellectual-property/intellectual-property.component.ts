import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// declare var localStorage: any;
@Component({
  selector: 'app-intellectual-property',
  templateUrl: './intellectual-property.component.html',
  styleUrls: ['./intellectual-property.component.scss']
})
export class IntellectualPropertyComponent implements OnInit {
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
