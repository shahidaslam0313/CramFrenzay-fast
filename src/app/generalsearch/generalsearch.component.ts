import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { Config } from '../Config';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import swal from 'sweetalert2';
import { GeneralsearchService } from './generalsearch.service';
// declare var localStorage: any;
@Component({
  selector: 'app-generalsearch',
  templateUrl: './generalsearch.component.html',
  styleUrls: ['./generalsearch.component.scss']
})
export class GeneralsearchComponent implements OnInit {
  public sub: Subscription;
  public name;
  public result;
  data;
  public Imageurl = Config.Imageurlget;
  notes: any[];
  courses: any[];
  flashcard: any[];
  book: any[];
  again;
  private productsSource;
  currentProducts;
  constructor(private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private newservice: GeneralsearchService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();

    }
  }

  ngOnInit() {
     this.route.queryParams.subscribe(params => {
      this.name = +params['query'];
    
      this.generalsearch(params['query']);
    })

  }

  checkmainpage() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }

  check_login() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        let local = localStorage.getItem('currentUser');
        return true;
      }
      else {
        return false;
      }
    }
  }

  sweetalertsignin() {
    swal({
      // text:"Error",
      text: "Please Sign in to access this functionality",
      title: "Authentications Required",
      type: "error",
      showConfirmButton: false,
      confirmButtonColor: "#cc0000", timer: 2000,
      confirmButtonText: "OK",
    });
  }

  generalsearch(name) {

    this.newservice.generalsearch(name).subscribe(data => {
      this.notes = data['notes'];
      this.courses = data['courses'];
      this.flashcard = data['flashcard'];
      this.book = data['book'];

    });
  }


  search(name) {
    this.newservice.generalsearch(name).subscribe(data => {
      this.notes = data['notes'];
      this.courses = data['courses'];
      this.flashcard = data['flashcard'];
      this.book = data['book'];

    });
  }
}
