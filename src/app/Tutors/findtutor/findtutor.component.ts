import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { FindtutorService } from './findtutor.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// declare var localStorage: any;
@Component({
  selector: 'app-findtutor',
  templateUrl: './findtutor.component.html',
  styleUrls: ['./findtutor.component.scss']
})
export class FindtutorComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  public result3: any;
  public loaded: boolean = false;
  public tutorId: any;
  public sub: Subscription;
  private productsSource;
  currentProducts;
  constructor(private tutor: FindtutorService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  name;
  onSubmit(name) {
    this.router.navigate(['/teachers/' + name]);
  }

  ngOnInit() {
    this.Showtutor();
  }

  Showtutor() {
    this.tutor.maintutorlist().subscribe(data => {
      this.result3 = data;
      this.loaded = true;
    });
  }

}
