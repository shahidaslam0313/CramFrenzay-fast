import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { ActivatedRoute, RouterModule } from "@angular/router";;
import { Config } from '../../Config';
import { notesgenieservice } from '../notesgenie/notesgenie.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import swal from "sweetalert2";
import { NotessearchService } from './notessearch.service';
import { PagerService } from '../../paginator.service';

@Component({
  selector: 'app-notessearch',
  templateUrl: './notessearch.component.html',
  styleUrls: ['./notessearch.component.scss']
})
export class NotessearchComponent implements OnInit {
  public sub: Subscription;
  public name;
  public full;
  public result;
  public Imageurl = Config.Imageurlget;
  private username;
  pager: any = {};
  Eid;
  query;
  searchResult: any = [];
 public searchResultStatus = true ;


  currentuser;
  constructor(private pagerService: PagerService, private search: NotessearchService, private router: Router, private route: ActivatedRoute,  private newservice: notesgenieservice, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.Eid = params['name'];
    });


    this.mazeednotessearch(this.Eid);
  } setPagenotes(page: number, total) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.search.notessearch(this.full, page).subscribe(data => {
      this.result = data;
      this.pager = this.pagerService.getPager(data.totalItems, page, 5);
    });
  };
  checknotes() {
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

  mazeednotessearch(query) {
    this.full = query;
    this.search.notessearch(query, 1).subscribe(data => {
      this.result = data.notes;
  
      this.setPagenotes(1, data.totalItems)
      if (this.result.length <= 0) {
        this.searchResultStatus = null;
      }
    }
    );
  }
  filter(query) {
    if (query !== "") {
      this.newservice.notessearch(query).subscribe(Res => {
        this.searchResult = Res.notes;
        if (this.searchResult.length <= 0) {
          this.searchResultStatus = false;
        }
      })
    }
  }


  onsubmit() {
    // this.router.navigate(['/notessearch/' + this.name]);
    // if (isPlatformBrowser(this.platformId)) {
    //   localStorage.setItem('name', this.name);
    // }

  }
}
