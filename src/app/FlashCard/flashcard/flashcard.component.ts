import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { flashcardservice } from './flashcard.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  result;
  public flashId: any;
  public name;
  items;
  public sub: Subscription;
  private productsSource;
  currentProducts;
  constructor(private newService: flashcardservice, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
    this.newflashcard();

  }
  onsubmit(nestedname,id) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('nestedname', nestedname);
      localStorage.setItem('nestedid', id);
      localStorage.setItem('nameID', 'flashcard');
    }
  }
  newflashcard() {
    this.newService.Flashcardlist().subscribe(data => {
      this.result = data;
    });
  }
}
