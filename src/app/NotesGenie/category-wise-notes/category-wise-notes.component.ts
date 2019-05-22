import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Config } from '../../Config';
import { NotesService } from '../notes/notes.service';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { ActivatedRoute } from "@angular/router";
import { categorywisenotesservice } from "./category-wise-notes.service";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'app-category-wise-notes',
  templateUrl: './category-wise-notes.component.html',
  styleUrls: ['./category-wise-notes.component.scss']
})
export class CategoryWiseNotesComponent implements OnInit {
  public Imageurl = Config.Imageurleach;
  public result= [];
  public Eid: any;
  public Cid: any;
  public sub: Subscription;
  private username;
  currentuser;
  eachnotes;
  catId;
  name;


  constructor(public subcatservice: categorywisenotesservice, private router: Router, private route: ActivatedRoute,  @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
    }
    this.name = localStorage.getItem('nestedname');
  }
  ngOnInit() {
    window.scroll(0,0);
    this.route.params.subscribe(params => {
      this.subcategory(params['id'])
    });
    this.sub = this.route.params.subscribe(params => {
      this.Cid = +params['id'];
      this.catId = +params['id'] || 0;
    });
    this.notecategory(this.catId);
  }
  onsubmit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
      localStorage.setItem('nameID', 'notes');
    }
  }
  subcategory(Cid) {

    this.subcatservice.Catwisenotes(Cid).subscribe(data => {
      this.result = data;
    });

  }
  notecategory(catId) {
    this.subcatservice.notesSubcat(this.catId).subscribe(data => {
      this.eachnotes = data.notes;
      console.log(data.notes,'NOTES')
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
