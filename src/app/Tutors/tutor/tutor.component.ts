import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { tutorservice } from "./tutor.service";
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { PagerService } from '../../paginator.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {
  public Imageurl = Config.Imageurleach;

  public result3;
  public loaded: boolean = false;
  public tutorId: any;
  public sub: Subscription;
  pager: any = {};
  private productsSource;
  currentProducts;

  constructor(private pagerservice: PagerService, private tutor: tutorservice, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  name;
  onSubmit(name) {
    this.router.navigate(['/tutorsearch/' + name]);
  }

  ngOnInit() {
    window.scroll(0,0);
    this.Showtutor();
    this.setPage(1);
  }
  onsubmit(id) {
    this.router.navigate(['/teachers/' + id]);
  }
 
  Showtutor() {
    this.tutor.maintutorlist().subscribe(data => {
      this.loaded = true;
    });
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.tutor.alltutor(page).subscribe(data => {
      this.result3 = data.json()['Tutors'];
      this.pager = this.pagerservice.getPager(data.json()['totalItems'], page);

    });
  }
}
