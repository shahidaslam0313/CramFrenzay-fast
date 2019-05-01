import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Response, Http } from '@angular/http'
import { ActivateAccountService } from '../activate-account/activate-account.service';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { isPlatformBrowser } from '@angular/common';

// declare var localStorage: any;
@Component({

  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  public sub: Subscription;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private activeservice: ActivateAccountService, private route: ActivatedRoute, private router: Router, private http: Http) {

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


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.authenticate(params['code']);
    });
  }
  authenticate(uid) {
    this.activeservice.activate(uid).subscribe(
      data => {
        swal({
          type: 'success',
          title: 'Your account is verifed!',
          showConfirmButton: false,
          timer: 1500
        })
        if (!this.check_login()) {
          this.router.navigate(['/login']);
        }
        else {
          this.router.navigate(['/']);
        }
      },
      error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'Your account is already verifed!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 400) {
          swal({
            type: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        if (!this.check_login()) {
          this.router.navigate(['/login']);
        }
        else {
          this.router.navigate(['/']);
        }

      });
  }
}