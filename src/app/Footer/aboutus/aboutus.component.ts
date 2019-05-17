import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
declare var localStorage: any;
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  private productsSource;
  currentProducts;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public router: Router,) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
  }
  selllogin() {
    if (this.check_login() === true) {
      this.router.navigate(['']);
    }
    else if (this.check_login() === false){
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
}
