import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Config } from '../../Config';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import{ categorywisecourseservice } from './course-subcategory.service';

@Component({
  selector: 'app-course-subcategory',
  templateUrl: './course-subcategory.component.html',
  styleUrls: ['./course-subcategory.component.scss']
})
export class CourseSubcategoryComponent implements OnInit {
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
  constructor(public subcatservice: categorywisecourseservice, private router: Router, private route: ActivatedRoute,  @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
    }
    this.name = localStorage.getItem('nestedname');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.subcategory(params['id'])
    });
    this.sub = this.route.params.subscribe(params => {
      this.Cid = +params['id'];
      this.catId = +params['id'] || 0;
    });
    this.courseSubcat(this.catId);
  }
  onsubmit(nestedname) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
      localStorage.setItem('nameID', 'course');
    }
  }
  subcategory(Cid) {

    this.subcatservice.Catwisenotes(Cid).subscribe(data => {
      this.result = data;
    });

  }
  courseSubcat(catId) {
    this.subcatservice.courseSubcat(this.catId).subscribe(data => {
      this.eachnotes = data.notes;
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

