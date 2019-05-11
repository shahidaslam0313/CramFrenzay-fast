import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Config } from '../Config';
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GlobalService } from '../global.service';
import { subcategoryservice } from './../Course/subcategory/subcategory.service';

@Component({
    selector: 'app-nestedcateroy',
    templateUrl: './nestedcateroy.component.html',
    styleUrls: ['./nestedcateroy.component.scss']
})
export class NestedcateroyComponent implements OnInit {
    username;
    book;
    currentuser;
    public Imageurl = Config.Imageurleach;
    card;
    sub;
    catId;
    result;
    notes;
    name;
    course;
    id;
    notesid;
    notesname;
    nameID;
    constructor(private nestedcat: subcategoryservice, private newservice: GlobalService, private router: Router, private route: ActivatedRoute, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
            this.currentuser = this.username.asObservable();
        }
        
        this.name = localStorage.getItem('nestedname');
        this.nameID=localStorage.getItem('nameID');
    }

    ngOnInit() {
        window.scroll(0,0)
     this.sub = this.route.params.subscribe(params => {
            this.catId = +params['id'] || 0;
        })
        this.nestcategory(this.catId);
        this.notesnestcategory(this.catId);
        this.coursenestcategory(this.catId);
        this.cardnestcategory(this.catId);
        this.booksnestcategory(this.catId);
    }
    nestcategory(catId) {
        this.newservice.nestedcategory(this.catId).subscribe(data => {
            this.result = data;
        });

    }
    notesnestcategory(catId) {
        this.nestedcat.notesnestedcat(this.catId).subscribe(data => {
            this.notes = data.notes;
        });

    }
    coursenestcategory(catId) {
        this.nestedcat.coursenestedcat(this.catId).subscribe(data => {
            this.course = data.courses;
        });

    }
    cardnestcategory(catId) {
        this.nestedcat.cardsnestedcat(this.catId).subscribe(data => {
            this.card = data.flashcards;
            this.id=this.id
        });

    }
    booksnestcategory(catId) {
        this.nestedcat.booknestedcat(this.catId).subscribe(data => {
            this.book = data.books;
        });

    }
    nestedcatname(name) {
        // alert(name);
        localStorage.setItem('nestedcatgoeyname', name);
        // localStorage.setItem('nameID', 'notes');

    }
}
