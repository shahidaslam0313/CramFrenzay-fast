import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DataService } from '../../data.service';
import { SimpleGlobal } from 'ng2-simple-global';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { SearchscholarshipService } from './searchscholarship.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Config } from "../../Config";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-searchscholarship',
  templateUrl: './searchscholarship.component.html',
  styleUrls: ['./searchscholarship.component.scss']
})
export class SearchscholarshipComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  public sub: Subscription;
  public result: any;
  public sname;
  private productsSource;
  currentProducts;
  
  constructor(private scholarshipsearch: SearchscholarshipService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    window.scroll(0,0)
    this.route.params.subscribe(params => {
      this.Searchscholar(params['name'])
    });
    this.sub = this.route.params.subscribe(params => {
      this.sname = +params['name'];
    })
  }
  Searchscholar(sname) {
    this.scholarshipsearch.searchscholarship(sname).subscribe(data => {
      this.result = data['events'];
    });
  }

}
