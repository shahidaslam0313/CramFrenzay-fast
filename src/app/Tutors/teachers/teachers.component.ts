import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TeachersService } from "./teachers.service";
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//declare const $: any;
// declare var localStorage: any;
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  public Imageurl = Config.Imageurlget;
  public teacherId: any;
  public sub: Subscription;
  public result1: any;
  private productsSource;
  currentProducts;

  constructor(private teachers: TeachersService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.teacherId = +params['id'] || 0;
    });
    this.Showteachers(this.teacherId);
  }
  Showteachers(teacherId) {
    this.teachers.ourteachers(teacherId)
      .subscribe(data => {
        this.result1 = data;
        console.log(this.result1);
      });
  }
}

