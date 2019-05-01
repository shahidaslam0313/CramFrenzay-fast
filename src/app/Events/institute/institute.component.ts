import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { InstituteService } from './institute.service';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { applyRedirects } from '@angular/router/src/apply_redirects';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// declare var localStorage: any;
@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  result;
  public sub: Subscription;
  private productsSource;
  currentProducts;

  constructor(private newService: InstituteService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.showinstitutelist();

  }
  showinstitutelist() {
    this.newService.Institute().subscribe(data => {
      this.result = data;
    });
  }
}
