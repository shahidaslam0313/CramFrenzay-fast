import { cardsubcategoryeservice } from './flashcard-subcategory.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Config } from '../../Config';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-flashcard-subcategory',
  templateUrl: './flashcard-subcategory.component.html',
  styleUrls: ['./flashcard-subcategory.component.scss']
})

// export class FlashcardSubcategoryComponent implements OnInit {
//   result;
//   Cid;

//   constructor( private cardsubcatservice: cardsubcategoryeservice, @Inject(PLATFORM_ID) private platformId: Object) { }

//   ngOnInit() {
//     this.subcategory(this.Cid)
//   }
//   subcategory(Cid) {

//     this.cardsubcatservice.cardSubcat(Cid).subscribe(data => {
//       this.result = data;
//     }
//     );

//   }
// }
export class FlashcardSubcategoryComponent implements OnInit {
  public Imageurl = Config.Imageurleach;
  public result= [];
  public Eid: any;
  public Cid: any;
  public sub: Subscription;
  private username;
  currentuser;
  eachcard;
  catId;
  name;


  constructor(private subcatservice: cardsubcategoryeservice, private router: Router, private route: ActivatedRoute,  @Inject(PLATFORM_ID) private platformId: Object) {

    // if (isPlatformBrowser(this.platformId)) {
    //   this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    //   this.currentuser = this.username.asObservable();
    // }
    this.name = localStorage.getItem('nestedname');
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.subcategory(params['id'])
    });
    this.sub = this.route.params.subscribe(params => {
      this.Cid = +params['id'];
      this.catId = +params['id'] || 0;
      this.cardsubcategory(this.catId);
    });
  }
  onsubmit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
      localStorage.setItem('nameID', 'flashcard');
    }
  }
  subcategory(Cid) {

    this.subcatservice.Catwisecards(Cid).subscribe(data => {
      this.result = data;
    });

  }
  cardsubcategory(catId) {
    this.subcatservice.notesSubcat(this.catId).subscribe(data => {
      this.eachcard = data.flashcards;
    });

  }
  checkcate() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertnotes();
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
  sweetalertnotes() {
    swal({
      text: ' Please Login to access this functionality ',
      title: 'Authentications Required',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#cc0000', timer: 2000,
      confirmButtonText: 'OK',
    });
  }
}

