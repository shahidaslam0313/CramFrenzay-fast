import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TutorsearchService } from "./tutorsearch.service";
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-tutorsearch',
  templateUrl: './tutorsearch.component.html',
  styleUrls: ['./tutorsearch.component.scss']
})
export class TutorsearchComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  public result: any;
  public tname;
  private productsSource;
  currentProducts;
  constructor(private tutorsearch: TutorsearchService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.Searchtutor(params['name'])
    });
    this.sub = this.route.params.subscribe(params => {
      this.tname = +params['name'];
    })
  }

  Searchtutor(tname) {
    this.tutorsearch.search(tname).subscribe(data => {
      this.result = data['events'];
    });
  }
}
