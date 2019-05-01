import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ScholarshiplistService } from "./scholarshiplist.service";
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-scholarshiplist',
  templateUrl: './scholarshiplist.component.html',
  styleUrls: ['./scholarshiplist.component.scss']
})
export class ScholarshiplistComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  public result: any;
  private productsSource;
  currentProducts;

  constructor(private scholarshiplist: ScholarshiplistService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
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
    this.Showscholarshiplist();
  }

  Showscholarshiplist() {
    this.scholarshiplist.ourscholarlist().subscribe(scholarshiplist => {
      this.result = scholarshiplist;
    });
  }
}
