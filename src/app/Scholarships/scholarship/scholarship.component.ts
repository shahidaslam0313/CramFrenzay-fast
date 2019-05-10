import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ScholarshipService } from "./scholarship.service";
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PagerService } from '../../paginator.service';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// declare var localStorage: any;
@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.scss']
})
export class ScholarshipComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  public result2: any;
  public result;
  pager: any = {};

  private productsSource;
  currentProducts;
  constructor(private pagerservice: PagerService, private scholarships: ScholarshipService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }
  name;
  onSubmit(name) {
    this.router.navigate(['/searchscholarship/' + name]);
  }

  ngOnInit() {
    window.scroll(0,0)
    this.Showscholarship();
    this.setPage(1);

  }
  Showscholarship() {
    this.scholarships.ourscholars().subscribe(scholarship => {
      this.result2 = scholarship;
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.scholarships.scholarship(page).subscribe(data => {
      this.result = data;
      this.pager = this.pagerservice.getPager(this.result['totalItems'], page, 10);

    });
  }

}
