import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MylibraryService } from "./mylibrary.service";
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { uploadnotesservice } from '../uploadnotes/uploadnotes.service';

import { PagerService } from 'app/paginator.service';
import { GlobalService } from '../../global.service';

declare const $: any;
@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.scss']
})
export class MylibraryComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  public ImageUrl = Config.Imageurlupload;
  public username;
  name;

  result: [] = [];
  card: [] = [];
  bidnotes: [] = [];

  input;
  bid_status;
  id;
  notpost;
  notespage: boolean = true;
  coursepage: boolean = false;
  bookpage: boolean = false;
  fcardpage: boolean = false;
  modal: any = {};
  c_name;
  bookID;
  bidbookid;
  notesid;
  sub_category_name;
  model: any = {};
  register: FormGroup;
  private sub: Subscription;
  private productsSource;
  currentProducts;
  book_id;
  pager: any = {};
  Showcoursespager: any = {};

  item = 20;
  image;
  bidonnotes;
  author_name;
  book_detail;
  book_edition;
  ISBN;
  subcategories;
  book_rent;
  image222;
  cardsid;
  price;
  profile: any = {};
  falshcardid;
  courseid;
  noteid;
  bidingcourse;
  bookid;
  nullvalue = null;
  cardedit: any = {};
  editcourse: any = {};
  // editcourse: any = {};
  editnotes;
  fcid;
  role;
  valid;
  Cid;
  ImgSrc;
  notesget: any = {};
  course: FormGroup;
  isreserved: boolean = false;
  changeImage: boolean = false;
  flashcard: FormGroup;
  note: FormGroup;
  course_thumbnail;
  responseType;
  filetoup: FileList;
  fileName;
  ranges = [

    { value: '10', viewValue: '10' },
    { value: '15', viewValue: '15' },
    { value: '21', viewValue: '21' },
    { value: '30', viewValue: '30' },
    { value: '60', viewValue: '60' }
  ];
  range = [
    { value: '3', viewValue: '3' },
    { value: '5', viewValue: '5' },
    { value: '7', viewValue: '7' },
    { value: '15', viewValue: '15' },
  ];

  url: string | ArrayBuffer;
  accept_offer: any;
  constructor(private globalimage: GlobalService, private newService: uploadnotesservice, private pagerService: PagerService, public newcoures: MylibraryService, private http: HttpClient, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }


  ngOnInit() {
    window.scroll(0, 0)
    this.sub = this.route.params.subscribe(params => {
      this.falshcardid = +params['id'] || 0;
    });
    this.register = this.fb.group({
      'name': [''],
      'author_name': [''],
      'book_detail': [''],
      'book_edition': [''],
      'ISBN': [''],
      'subcategories': [''],
      'book_rent': [''],
      'price': [''],
      'sell_status': [''],
      'bid_status': [''],
      'sell_days': [''],
      'book_image': [''],
      'initial_amount': [''],
      'end_time': [''],
      'isreserved': [''],
      'reservedprice': [''],
      'start_time': [''],


    });
    this.course = this.fb.group({
      'name': [''],
      'detail': [''],
      'price': [''],
      'discount': [''],
      // 'detail': [''],
      'data': [''],
      'subcategories': [''],
      'sell_status': [''],
      'bid_status': [''],
      'sell_days': [''],
      'course_thumbnail': [''],
      'initial_amount': [''],
      'end_time': [''],
      'isreserved': [''],
      'reservedprice': [''],
      'start_time': [''],
    });
    this.flashcard = this.fb.group({
      'name': [''],
      'no_of_terms': [''],
      'subcategory': [''],
      'sell_days': [''],
      'price': [''],
      'bid_status': [''],
      'flashcard_image': [''],
      'initial_amount': [''],
      'end_time': [''],
      'isreserved': [''],
      'reservedprice': [''],
      'start_time': [''],

    });
    // this.Showcourses(1);
    // this.Showbooks(1);
    this.Shownotes(1);
    // this.Showcards(1);
    // this.courses();
    // this.clickcardsedit(this.id);
    // this.singlenotes(this.id);
    // this.notesss(this.id);


    $('#showhide').click(function () {
      $('#showdiv').toggle();
    });

    $('#showhide2').click(function () {
      $('#showdiv2').toggle();
    });

    $('#showhide3').click(function () {
      $('#showdiv3').toggle();
    });

    $('#showhide4').click(function () {
      $('#showdiv4').toggle();
    });
    $('#showhide6').click(function () {
      $('#showdiv6').toggle();
    });
  }
  files;
  file;
  base64textString;
  onChange2(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }
  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    // console.log(this.base64textString);
  }

  showCourses: [] = [];
  Showcourses(page: number) {
    if (page < 1 || page > this.pager.totalPages)
      return;
    this.newcoures.mycourses(page)
      .subscribe(courses => {
        this.showCourses = courses;

        this.pager = this.pagerService.getPager(this.showCourses['totalItems'], page, 8);
      });
  }

  Showbook: [] = [];
  Showbooks(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newcoures.mybooks(page).subscribe(data => {
      this.Showbook = data
      this.pager = this.pagerService.getPager(this.Showbook['totalItems'], page, 8);
    });
  }

  Shownote: [] = [];
  Shownotes(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newcoures.mynotes(page).subscribe(notes => {
      this.Shownote = notes
      this.pager = this.pagerService.getPager(this.Shownote['totalItems'], page, 8);
    });
  }

  notesss(id) {
    this.newcoures.getnotesid(id).subscribe(notes => {
      this.bidnotes = notes;

    });
  }
  publish(notes, course, flashcard, book) {
    this.notesid = notes;
    this.courseid = course;
    this.cardsid = flashcard;
    this.bookid = book;
    this.newcoures.publishitems(notes, course, flashcard, book).subscribe(data => {
      swal({
        type: 'success',
        title: 'Published',
        showConfirmButton: false,
        timer: 1500
      })
    })
    this.Showcards(1);
    this.Showbooks(1);
  }
  check($event) {
    alert($event)
  }

  ///////////// flash cards //////////
  Showcard;
  Showcards(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newcoures.mycards(page).subscribe(card => {
      this.card = card;
      this.Showcard = card;
      // this.fcardpage = true;
      this.pager = this.pagerService.getPager(this.card['totalItems'], page, 8)
    });


    // Shownote;
    // Shownotes(page: number) {
    //   this.newcoures.mynotes(page).subscribe(notes => {
    //     this.notes = notes;
    //     this.Shownote = notes['courses']
    //     console.log(this.Shownote['courses'])
    //     this.pager = this.pagerService.getPager(notes['totalItems'], page, 10);

    //   });
    // }
  }
  bidflashcard: any = {};
  varr_final_get_date
  ///////////get each flash card for update//////
  clickcardsedit(id) {
    this.newcoures.mycardsedit(id).subscribe(card => {
      this.cardedit = card;
      if (typeof card.bidflashcard === 'undefined') {
        this.bidflashcard = null;
      }
      else {
        this.bidflashcard = card.bidflashcard;
      }
      this.bidflashcard = card.bidflashcard;
      this.subcategorys();
      this.nestedcategorys();

    });
  }
  ///////////update flashcards///////
  // updatecard(id) {
  //
  //   this.http.post(
  //     Config.Imageurlupload, this.input, { responseType: 'text' }).subscribe(data => {
  //       if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.,.") {
  //         // this.sweetalertupload();
  //       }
  //       else {
  //         this.cardedit.flashcard_image = data;
  //         this.ifCardImageUpload();
  //       }
  //     });
  // }
  // let headers = new HttpHeaders();
  ifCardImageUpload() {
    if (this.bidflashcard != null) {
      this.newcoures.uploadcard(this.cardedit.id, this.bidflashcard.id, this.cardedit.name, this.cardedit.no_of_terms, this.cardedit.category, this.cardedit.subcategory, this.cardedit.nestedcategory, this.cardedit.min_amount, this.cardedit.max_amount, this.cardedit.bid_status, this.cardedit.price, this.fileName.image,
        this.bidbooks.initial_amount, this.bidbooks.end_time, this.bidflashcard.isreserved, this.bidflashcard.reservedprice, this.bidflashcard.start_time).subscribe(Res => {
          swal({
            type: 'success',
            title: 'Flash Card updated Successfully',
            showConfirmButton: false,
            timer: 2500
          });
          this.Shownotes(1);
        });
    }
    else {
      this.newcoures.uploadcard1(this.cardedit.id, this.cardedit.name, this.cardedit.no_of_terms, this.cardedit.category, this.cardedit.subcategory, this.cardedit.nestedcategory, this.cardedit.min_amount, this.cardedit.max_amount, this.cardedit.bid_status, this.cardedit.price, this.fileName.image).subscribe(Res => {
        swal({
          type: 'success',
          title: 'Flash Card updated Successfully',
          showConfirmButton: false,
          timer: 2500
        });
        this.Shownotes(1);
      });
    }
  }
  bidnote: any = {};
  var_final_get_date;
  // check(event){}
  // current_date=new Date();
  singlenotes(id) {
    // alert(id)
    this.newcoures.Eachnotes(id).subscribe(data => {
      this.editnotes = data;
      // alert(this.Imageurl+data.notes_thumbnail)
      if (typeof data.bidnotes === 'undefined') {
        this.bidnote = null;
      }
      else {
        this.bidnote = data.bidnotes;
      }
      this.bidnote = data.bidnotes;

      this.accept_offer = this.editnotes.accept_offer
      // alert(this.accept_offer)
      // var var_get_start_date:any=this.bidnote.created_time.toString().slice(8, 10);
      // alert(var_get_start_date)
      //  var var_get_end_date=this.editnotes.end_time.toString().slice(8, 10);
      //  alert(var_get_end_date)
      // this.var_final_get_date=var_get_end_date - var_get_start_date;
      // alert(this.var_final_get_date)
      this.subcategorys();
      this.nestedcategorys();
    });
  }
  getid(id) {
    this.notesget = id;
  }
  courses() {
    this.newService.Coursesonnotes().subscribe(response => {
      this.c_name = response;

    });
  }
  subcategorys() {
    if (this.profile.categories) {
      this.newService.Catwisenotes(this.profile.categories).subscribe(data => {
        this.result = data;
      });
    }
    else if (this.editnotes.categories) {
      this.newService.Catwisenotes(this.editnotes.categories).subscribe(data => {
        this.result = data;
      });
    }
    else if (this.editcourse.categories) {
      // alert(this.editcourse.categories)
      this.newService.Catwisenotes(this.editcourse.categories).subscribe(data => {
        this.result = data;
      });
    }
    else if (this.cardedit.category) {
      this.newService.Catwisenotes(this.cardedit.category).subscribe(data => {
        this.result = data;
      });
    }
  }
  nestedresult;
  nestedcategorys() {
    if (this.profile.subcategories) {
      this.newService.nestedwisenotes(this.profile.subcategories).subscribe(data => {
        this.nestedresult = data;
      });
    }
    else if (this.editcourse.subcategories) {
      this.newService.nestedwisenotes(this.editcourse.subcategories).subscribe(data => {
        this.nestedresult = data;
      });
    }
    else if (this.cardedit.subcategory) {
      this.newService.nestedwisenotes(this.cardedit.subcategory).subscribe(data => {
        this.nestedresult = data;
      });
    }
    else if (this.editnotes.subcategory) {
      this.newService.nestedwisenotes(this.editnotes.subcategory).subscribe(data => {
        this.nestedresult = data;
      });
    }
  }
  bidcourses;
  udpateeditcourse;
  coursesupdate(id) {
    this.newcoures.courseedit(id).subscribe(data => {
      this.udpateeditcourse = data;

      this.editcourse = this.udpateeditcourse;
      // alert(this.udpateeditcourse.course_thumbnail)
      if (typeof data.bidcourse === 'undefined') {
        this.bidcourses = null;
      }
      else {
        this.bidcourses = data.bidcourse;
      }
      // console.log(this.bidcourses,'BIDCOURSES')
      // alert(this.bidcourses)
      // var var_get_start_date:any=this.current_date.toString().slice(8, 10);
      //  var var_get_end_date=this.editcourse.sell_days.toString().slice(8, 10);
      // this.var_final_get_date=var_get_end_date - var_get_start_date;
      this.subcategorys();
      this.nestedcategorys();
    },
      // error => {
      //   swal({
      //     type: 'success',
      //     title: 'not update',
      //     showConfirmButton: false,
      //     timer: 2500
      //   });
      // },
    );

  }
  /////delete course///
  btndelcourse(id) {
    this.courseid = id;
  }

  deletecourese(courseid) {
    this.newcoures.delcourse(courseid).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 2500
      });
      this.Showcourses(1);
    }, error => {
    });
  }
  ///////////delete book///////
  btndelbook(id) {

    this.bookid = id;

  }
  bookdelete(bookid) {
    this.newcoures.delbook(bookid).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 2500
      });
      this.Showbooks(1);
    }, error => {

    });
  }
  //////////del flashcard///////
  btndelcards(id) {
    this.cardsid = id;
  }
  flashcardsdelete(cardsid) {
    this.newcoures.mycardsdelete(cardsid).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 2500
      });
      this.Showcards(1);
    }, error => {

    });
  }
  /////////del notes/////
  btndelnotes(id) {
    this.notesid = id;

  }

  deletenotes(notesid) {
    this.newcoures.delnotes(notesid).subscribe(data => {
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 2500
      });
      this.Shownotes(1);
    });
  }
  //////update book////////////
  // onSubmit(id) {
  //   this.http.post(
  //     Config.Imageurlupload, this.input, { responseType: 'text' }).subscribe(data => {
  //       if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.,.") {
  //         // this.sweetalertupload();
  //       }
  //       else {
  //         this.profile.book_image = data;
  //         // this.ifbookImageUpload();
  //       }
  //     });
  // }


  ifbookImageUpload(id) {
    if (this.bidbooks != null)
      this.newcoures.uploading(this.profile.id, this.bidbooks.id, this.profile.name, this.profile.author_name, this.profile.categories, this.profile.subcategories, this.profile.nestedcategory, this.profile.book_detail, this.profile.book_edition, this.profile.ISBN, this.profile.min_amount, this.profile.max_amount, this.profile.sell_status, this.profile.price, this.profile.sell_days, this.profile.bid_status, this.fileName.image, this.profile.datafile,
        this.initial_amount, this.bidbooks.end_time, this.bidbooks.isreserved, this.reservedprice, this.bidbooks.start_time)
        .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Book Updated Successfully ',
            showConfirmButton: false,
            timer: 2500
          });
          this.Showbooks(1)
        },
          error => {
            swal({
              type: 'error',
              title: 'error',
              showConfirmButton: false,
              timer: 2500
            });
          });
    else {
      this.newcoures.uploading1(this.profile.id, this.profile.name, this.profile.author_name, this.profile.categories, this.profile.subcategories, this.profile.nestedcategory, this.profile.book_detail, this.profile.book_edition, this.profile.ISBN, this.profile.min_amount, this.profile.max_amount, this.profile.sell_status, this.profile.price, this.profile.sell_days, this.profile.bid_status, this.fileName.image, this.profile.datafile)
        .subscribe(Res => {
          swal({
            type: 'success',
            title: 'Book Updated Successfully ',
            showConfirmButton: false,
            timer: 2500
          });
          this.Showbooks(1)
        },
          error => {
            swal({
              type: 'error',
              title: 'error',
              showConfirmButton: false,
              timer: 2500
            });
          });
    }
  }
  // update(id) {
  //   this.http.post(
  //     Config.Imageurlupload, this.input, { responseType: 'text' }).subscribe(data => {
  //       if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.,.") {
  //         // this.sweetalertupload();
  //       }
  //       else {
  //         this.editcourse.course_thumbnail = data;
  //         // this.ifCourseImageUpload();
  //       }
  //     });
  // }


  ifCourseImageUpload() {
    if (this.bidcourses != null) {
      this.newcoures.updatecourse(this.editcourse.id, this.bidcourses.id, this.editcourse.name, this.editcourse.description, this.editcourse.categories, this.editcourse.subcategories, this.editcourse.nestedcategory, this.editcourse.min_amount, this.editcourse.max_amount, this.editcourse.sell_status, this.editcourse.price, this.editcourse.sell_days, this.editcourse.datafile, this.fileName.image,
        this.bidcourses.initial_amount, this.bidcourses.end_time, this.bidcourses.isreserved, this.bidcourses.reservedprice, this.bidcourses.start_time, this.bidcourses.bid_status, this.model.skill).subscribe(Res => {
          swal({
            type: 'success',
            title: 'course Updated Successfully ',
            showConfirmButton: false,
            timer: 2500
          });
        },
          error => {
            swal({
              type: 'error',
              title: 'not update',
              showConfirmButton: false,
              timer: 2500
            });
          });
      this.Showcourses(1)
    }
    else {
      this.newcoures.updatecourse1(this.editcourse.id, this.editcourse.name, this.editcourse.description, this.editcourse.categories, this.editcourse.subcategories, this.editcourse.nestedcategory, this.editcourse.min_amount, this.editcourse.max_amount, this.editcourse.sell_status, this.editcourse.price, this.editcourse.sell_days, this.editcourse.datafile, this.fileName.image, this.model.skill).subscribe(Res => {
        swal({
          type: 'success',
          title: 'course Updated Successfully ',
          showConfirmButton: false,
          timer: 2500
        });
      },
        error => {
          swal({
            type: 'error',
            title: 'not update',
            showConfirmButton: false,
            timer: 2500
          });
        });
      this.Showcourses(1)
    }

  }

  value: any = {};
  ///////////update notes//
  // updatenotes(id) {
  //   this.http.post(
  //     Config.Imageurlupload, this.input, { responseType: 'text' }).subscribe(data => {
  //       if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.,.") {
  //         // this.sweetalertupload();
  //       }
  //       else {
  //         this.editnotes.notes_thumbnail = data;
  //         this.ifImageUpload();
  //       }
  //     });
  // }
  ifImageUpload() {
    if (this.bidnote != null) {
      this.newcoures.updatenote(this.editnotes.id, this.bidnote.id, this.bidnote.initial_amount, this.bidnote.end_time, this.isreserved, this.bidnote.reservedprice, this.bidnote.start_time,
        this.editnotes.name, this.editnotes.detail, this.editnotes.categories, this.editnotes.subcategory, this.editnotes.nestedcategory, this.editnotes.min_amount, this.editnotes.max_amount, this.editnotes.sell_status, this.editnotes.price, this.editnotes.sell_days, this.fileName, this.editnotes.datafile, this.editnotes.bid_status).subscribe(Res => {
          swal({
            type: 'success',
            title: 'Note Updated Successfully ',
            showConfirmButton: false,
            timer: 2500
          });
          this.Shownotes(1)
        },
          error => {
            swal({
              type: 'error',
              title: 'error',
              showConfirmButton: false,
              timer: 2500
            });
          });
    }
    else {
      this.newcoures.updatenote1(this.editnotes.id, this.editnotes.name, this.editnotes.detail, this.editnotes.categories, this.editnotes.subcategory, this.editnotes.nestedcategory, this.editnotes.min_amount, this.editnotes.max_amount, this.editnotes.sell_status, this.editnotes.price, this.editnotes.sell_days, this.fileName.image, this.editnotes.datafile, this.editnotes.bid_status).subscribe(Res => {
        swal({
          type: 'success',
          title: 'Note Updated Successfully ',
          showConfirmButton: false,
          timer: 2500
        });
        this.Shownotes(1)
      },
        error => {
          swal({
            type: 'error',
            title: 'error',
            showConfirmButton: false,
            timer: 2500
          });
        });
    }

  }
  onsubmit(id, name) {
    this.router.navigate(['/flashcarddetail/' + id]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('name', name);
    }
  }
  bidnotesid(id) {

    this.bidonnotes = id;
  }
  ///////////////bid on books///////////
  bidbooks: any = [];
  biding;
  initial_amount;
  reservedprice;
  end_time;
  created_time
  editbooks(id) {
    this.id = id;
    this.newcoures.booksdetail(id).subscribe(data => {
      this.profile = data;
      if (typeof data.bidbooks === 'undefined') {
        this.bidbooks = null;
      }
      else {
        this.bidbooks = data.bidbooks;
      }
      this.bidbooks = data.bidbooks;
      this.end_time = data.bidbooks.end_time.toString().slice(8, 10);
      // alert(this.profile.sell_days)
      this.created_time = data.bidbooks.created_time.toString().slice(8, 10);
      // alert(this.created_time )
      this.var_final_get_date = this.end_time - this.created_time;
      // alert(this.var_final_get_date)
      this.subcategorys();
      this.nestedcategorys();
    });
  }
  booksid(id) {
    this.bidbookid = id;
  }

  //////////// bid in flashcard//////////
  flahscard(id) {
    this.fcid = id;
  }

  ////////////////biding on courses///////////
  bidcourseid(id) {
    this.bidingcourse = id;
  }

  check_login() {

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  checkrole() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('role') == "T" || localStorage.getItem('role') == "A") {
        return true;
      } else if (this.role == "U" || this.role == "I") {
        return false;
      }
    }
  }
  handleFileInput(files: FileList, image222) {
    // alert(files);
    this.filetoup = files;
    // alert(this.filetoup[0].name)
    this.fileName = this.filetoup[0].name;
    this.globalimage.PostImage(this.filetoup, image222).subscribe(
      data => {
        // alert(data)
        this.fileName = data;
        // alert('han vaeeee'+ this.fileName.image)

      },
      error => {
        if (error.status == '500')
          this.notpost = error.status;
        {
          swal({
            type: 'error',
            title: 'Book Image is required',
            width: '512px'
          })
        }
      });
    // this.uploadItemsToActivity();

  }
}
