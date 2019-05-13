import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Config} from '../../Config';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {subcategoryservice} from './subcategory.service';
import {isPlatformBrowser} from '@angular/common';
import swal from 'sweetalert2';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { CourseService } from "../course/course.service";

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  public Imageurl= Config.Imageurleach;
  result=[];
  public catId: any;
  public sub: Subscription;
  public  username;
  currentuser;
  public name;
  courseid;
    eachcourse;
    eachnotes;
    c_name;
    eachcards;
    eachbook;
  constructor(private course: CourseService, private newservice: subcategoryservice, private router: Router, private route: ActivatedRoute, private http: Http,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
    }
this.c_name = localStorage.getItem('slidername');
this.name = localStorage.getItem('nestedname');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.catId = +params['id'] || 0;
    })
    this.subcategory(this.catId);
    this.courscategory(this.catId);
    this.notecategory(this.catId);
    this.cradscategory(this.catId);
    this.bookcategory(this.catId);
  }
  subcategory(catId) {
    this.newservice.Subcat(this.catId).subscribe(data => {
      this.result = data;
    });

  }
  courscategory(catId) {
      this.newservice.courseSubcat(this.catId).subscribe(data => {
          this.eachcourse = data.courses;
      });
  }
  notecategory(catId) {
    this.newservice.notesSubcat(this.catId).subscribe(data => {
      this.eachnotes = data.notes;
    });

  }
  cradscategory(catId) {
    this.newservice.cardsSubcat(this.catId).subscribe(data => {
      this.eachcards = data.flashcards;
    });

  }
  bookcategory(catId) {
    this.newservice.bookSubcat(this.catId).subscribe(data => {
      this.eachbook = data.books;
    });

  }

    sliderClick(name){
        localStorage.setItem('nestedname' , name)
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

  courses(id){

    if (this.check_login()==true){
      this.router.navigate(['/payment']);

      localStorage.setItem('course', id);
    }
    else if (this.check_login()==false){
      this.sweetalertsignin();
      this.router.navigate(['/login']);
    }
  }
  sweetalertsignin()
  {
    swal({
      text: "Please sign in to access this functionality",
      title: "Authentications Required",
      type: "error",
      showConfirmButton: false,
      confirmButtonColor: "#DD6B55", timer: 2000,
      confirmButtonText: "OK",
    });
  }
  check_login() {
    if (isPlatformBrowser(this.platformId)){

      if (localStorage.getItem('currentUser')) {
        let local = localStorage.getItem('currentUser');
        return true;
      }
      else {
        return false;    }
    }
  }

}
