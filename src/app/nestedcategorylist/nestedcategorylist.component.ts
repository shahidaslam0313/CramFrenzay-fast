import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Config } from "../Config";
import { ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { NestedcategorylistService } from './nestedcategorylist.service';

@Component({
  selector: 'app-nestedcategorylist',
  templateUrl: './nestedcategorylist.component.html',
  styleUrls: ['./nestedcategorylist.component.scss']
})
export class NestedcategorylistComponent implements OnInit {
  course;
  public Imageurl = Config.Imageurleach;

  id;
  sub;
  note;
  card;
  books;
  nameID;
  catname;
  constructor(private list: NestedcategorylistService, private router: Router, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object, ) {
    this.catname = localStorage.getItem('nestedcatgoeyname');
    this.nameID = localStorage.getItem('nameID');
  }

  ngOnInit() {
    window.scroll(0,0)
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'] || 0;
    });

    this.courses(this.id);
    this.notes(this.id);
    this.cards(this.id);
    this.book(this.id);
  }
  courses(id) {
    this.list.coursenestedlist(this.id).subscribe(data => {
      this.course = data.courses;
      console.log(this.course,'COURSE');
    })
  }
  notes(id) {
    this.list.notesenestedlist(this.id).subscribe(data => {
      this.note = data.notes;
      console.log(this.note,'NOTE');
    })
  }
  cards(id) {
    this.list.cardsnestedlist(this.id).subscribe(data => {
      this.card = data.flashcards;
      console.log(this.card,'CARD');
    })
  }
  book(id) {
    this.list.booknestedlist(this.id).subscribe(data => {
      this.books = data.books;
      console.log(this.books,'BOOK');
    })
  }
}
