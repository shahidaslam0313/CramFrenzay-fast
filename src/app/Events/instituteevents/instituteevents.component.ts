import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Config } from '../../Config';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { applyRedirects } from '@angular/router/src/apply_redirects';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { InstituteeventsService } from './instituteevents.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-instituteevents',
  templateUrl: './instituteevents.component.html',
  styleUrls: ['./instituteevents.component.scss']
})
export class InstituteeventsComponent implements OnInit {

  public sub: Subscription;
  public Imageurl = Config.Imageurlget;
  result;
  // public id: any;
  id;
  private productsSource;
  currentProducts;


  constructor(private newservice: InstituteeventsService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    window.scroll(0,0)
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.instituteevent(this.id);
  }
  instituteevent(id) {
    this.newservice.Institute(this.id).subscribe(data => {
      this.result = data;
    });

  }
}
