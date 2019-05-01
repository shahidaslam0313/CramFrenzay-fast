import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ScholarshipdetailService } from "./scholarshipdetail.service";
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// declare var localStorage: any;
@Component({
  selector: 'app-scholarshipdetail',
  templateUrl: './scholarshipdetail.component.html',
  styleUrls: ['./scholarshipdetail.component.scss']
})
export class ScholarshipdetailComponent implements OnInit {

  public Imageurl = Config.Imageurlget;

  public sub: Subscription;
  public scholarshipId: any;
  public result: any;

  private productsSource;
  currentProducts;

  constructor(private scholarshipdetail: ScholarshipdetailService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.scholarshipId = +params['id'] || 0;
    });
    this.Showscholarshipdetail(this.scholarshipId);
  }
  Showscholarshipdetail(scholarshipId) {
    this.scholarshipdetail.ourscholardetail(scholarshipId).subscribe(scholarshipdetail => {
      this.result = scholarshipdetail;
    });
  }


}
