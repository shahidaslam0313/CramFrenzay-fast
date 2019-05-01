
import { Component, OnInit, AfterContentInit, Inject, PLATFORM_ID } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { applyRedirects } from "@angular/router/src/apply_redirects";
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { FormBuilder, NgControl, RadioControlValueAccessor, FormGroup } from '@angular/forms';
import { FlashcardetailService } from './flashcardetail.service';
import swal from "sweetalert2";
// import swal.fire from "sweetalert2";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare const $: any;

@Component({
  selector: 'app-flashcarddetail',
  templateUrl: './flashcarddetail.component.html',
  styleUrls: ['./flashcarddetail.component.scss']
})
export class FlashcarddetailComponent implements OnInit, AfterContentInit {
  public Imageurl = Config.Imageurlget;
  model: any = {};
  public result;
  public flashcardDetail: any;
  public sub: Subscription;
  public flashId: any;
  public flashCardTermsDefinitionsData: any;
  public flipresult: any;
  public name;
  private productsSource;
  currentProducts;
  role;

  constructor(private newService: FlashcardetailService, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.flashId = +params['id'] || 0;
    })
    this.fcdetail();
    this.flipdetail();
    this.flashCardTermsDefinitions();
    if (isPlatformBrowser(this.platformId)) {
      this.name = localStorage.getItem('name');
    }
  }

  checkfcdetail() {
    if (this.check_login() == true) {
      this.role = localStorage.getItem('role');
      if (this.role == "U" || this.role == "A") {
        swal({
          text: "Sorry you do not have access!",
          title: "Authentications Required",
          type: "error",
          showConfirmButton: false,
          confirmButtonColor: "#cc0000", timer: 2000,
          confirmButtonText: "OK",
        });
      }
      else if (this.role == "T") {
        this.router.navigate(['/payment']);
      }
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
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

  sweetalertsignin() {
    swal({
      text: "Please sign in to access this functionality",
      title: "Authentications Required",
      type: "error",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55", timer: 2000,
      confirmButtonText: "OK",
    });
    this.router.navigate(['/login']);
  }

  ngAfterContentInit() {
    $('#flipFlash').click(function () {

      setTimeout(function () {
        $('.fc-slider').slick({
          slidesToShow: 1,
          infinite: false,
          prevArrow: "<button class='left-arrow-slider'><i class='fa fa-2x fa-arrow-left'></i></button>",
          nextArrow: "<button class='right-arrow-slider'><i class='fa fa-2x fa-arrow-right'></i></button>",
        });
      }, 250);
    });
  }
  uploaddata() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + 'flash/createflashcard/', this.model, { headers: headers })
      .subscribe(Res => { });
  }
  fcdetail() {
    this.newService.newfcdetail(this.flashId).subscribe(data => {
      this.flashcardDetail = data;
    });
  }
  flipdetail() {
    this.newService.flipdetail(this.flashId).subscribe(data => {
      this.flipresult = data;
    });
  }

  flashCardTermsDefinitions() {
    this.newService.flashCardTermsDefinitions(this.flashId).subscribe(data => {
      this.flashCardTermsDefinitionsData = data;
    });
  }
}
