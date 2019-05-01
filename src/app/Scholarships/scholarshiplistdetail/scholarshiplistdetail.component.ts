import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ScholarshiplistdetailService } from './scholarshiplistdetail.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// declare var localStorage: any;
@Component({
  selector: 'app-scholarshiplistdetail',
  templateUrl: './scholarshiplistdetail.component.html',
  styleUrls: ['./scholarshiplistdetail.component.scss']
})
export class ScholarshiplistdetailComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  public scholarshiplistId: any;
  public result;
  private productsSource;
  currentProducts;
  id;

  constructor(private scholarshipdetail: ScholarshiplistdetailService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.scholarshiplistId = +params['id'];
    });
    this.Showscholarshiplistdetail(this.scholarshiplistId);
  }

  Showscholarshiplistdetail(scholarshiplistId) {
    this.scholarshipdetail.ourscholarlistdetail(scholarshiplistId).subscribe(scholarshiplistdetail => {
      this.result = scholarshiplistdetail;
    });
  }

}
