import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Config } from '../../Config';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isPlatformBrowser } from '@angular/common';
import { CoursesearchService } from './coursesearch.service';
import { CourseService } from "../course/course.service";
import { PagerService } from '../../paginator.service';
@Component({
  selector: 'app-coursesearch',
  templateUrl: './coursesearch.component.html',
  styleUrls: ['./coursesearch.component.scss']
})
export class CoursesearchComponent implements OnInit {
  public sub: Subscription;
  public name;
  public full;
  public result;
  public Imageurl = Config.Imageurlget;
  private productsSource;
  currentProducts;
  pager: any = {};
  Eid;
  query;
  searchResult: any = [];
  constructor(private course: CourseService, private pagerService: PagerService, private router: Router, private route: ActivatedRoute, private search: CoursesearchService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.name = localStorage.getItem('name');
      this.againcoursesearch(this.name);
    }

    this.route.params.subscribe(params => {
    });
    this.sub = this.route.params.subscribe(params => {
      this.Eid = +params['id'];
    });
    (this.Eid)


    this.againcoursesearch(this.full);
  }
  setPagecourse(page: number, total) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.search.coursesearch(this.full, page).subscribe(data => {
      this.result = data.Course;
      this.pager = this.pagerService.getPager(data.totalItems, page, 5);

    });
  };
  checkcourse() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertcourse();
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

  sweetalertcourse() {
    swal({
      // text:"Error",
      text: ' Please Login to access this functionality ',
      title: 'Authentications Required',
      type: 'error',
      showConfirmButton: false,
      confirmButtonColor: '#cc0000', timer: 2000,
      confirmButtonText: 'OK',
    });
  }


  againcoursesearch(query) {
    this.full = query;
    this.router.navigate(['/coursesearch/' + query])
    this.search.coursesearch(query, 1).subscribe(data => {
      this.result = data.Course;
      this.setPagecourse(1, data.totalItems)
    }
    );
  }
  filter(query) {
    if (query != "") {
      this.course.coursesearch(query).subscribe(data => {
        this.searchResult = data.Course;
      })
    }
  }

}
