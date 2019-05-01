import {Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object , private _nav: Router) {}

  scrollTop(){
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
  }

  ngOnInit() {
    window.onbeforeunload = function () {
      $(this).scrollTop(0);
    };
    if (window['callPhantom'] || window['_phantom']) {
      window.location.href = "https://www.google.com/";
      let url = 'page-not-found';
      this._nav.navigate([url]);
    }
    if (navigator.webdriver === true) {
      let url = 'page-not-found';
      this._nav.navigate([url]);

    }
    if (window.document.documentElement.getAttribute("webdriver")) {

      let url = 'page-not-found';
      this._nav.navigate([url]);
    }
  }
}
