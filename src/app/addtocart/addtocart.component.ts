import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import { AddtocartService } from './addtocart.service';
import { Config } from '../Config';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FormControl, FormGroup, Validators, NgForm} from '@angular/forms';
import { headerservice } from 'app/includes/header/header.service';
import { DataService } from 'app/data.service';

declare const $: any;

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.scss']
})
export class AddtocartComponent implements OnInit {
  public itemscount;
  public items;
  username;
  currentUser;
  current;
  token;
  itemssum;
  currentuser;
  isright;
  model: any = {};
  flipclass = 'credit-card-box';
  res;
  CardNo;
  eachcardid;
  cartitems
  CCV;
  EXP;
  SUM;
  id;
  creditno;
  creditno4;
  ccv;
  ccv4;
  itemid;
  coursepay;
  cardspay;
  bookpay;
  cardtype;
  cardmask;
  card_opeation = [
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Master', viewValue: 'Master' },
    { value: 'Discover', viewValue: 'Discover' },
    { value: 'American Express', viewValue: 'American Express' }
  ];
  butDisabled: boolean = true
  form = new FormGroup({
    cardHolderName: new FormControl('',[
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
    cardnickname: new FormControl('',[
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required,
    ]),
    card_type: new FormControl('', [
      // Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    creditno: new FormControl('', [
      Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    creditno4: new FormControl('', [
      Validators.minLength(15),
      Validators.maxLength(16),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    ccv: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    ccv4: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    exp: new FormControl('', [
      Validators.required,
      // Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')
    ]),
    // card_type: new FormControl('', [
    
    //   Validators.required,
    //   noSpaceValidator.cannotContainSpace
    // ]),
    zipcode: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    city: new FormControl('',[
      Validators.required,
      Validators.maxLength(25),
      Validators.pattern("[a-zA-Z ]+")
    ]),
    state: new FormControl('',[
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
    street : new FormControl('',[
      Validators.required,
      Validators.maxLength(50),
    ]),
    country: new FormControl('',[
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
    check: new FormControl(),
  });
  public masks=function(rawValue) {
    if (rawValue && rawValue.length > 0) {
        if (rawValue[0] == '0' || rawValue[5] == '1') {
            return [/[01]/, /[1-9]/, '/',  /[0-9]/, /[0123456789]/];
        } else {
            return [/[01]/, /[0-2]/, '/',  /[0-9]/, /[0123456789]/];
        }
    }
    return [/[01]/, /[0-9]/, '/',   /[0-9]/, /[0123456789]/];
    
}
  ShowButton(card_type) {
    this.cardtype = card_type;
    if (card_type == "American Express") {
      this.cardtype = card_type;
      this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-',  /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.creditno = false;
      this.form.controls.creditno.reset();
      this.creditno4 = true;
      this.ccv = false;
      this.form.controls.ccv.reset();
      this.ccv4 = true;
    }
    else if (card_type == "Visa") {
      this.cardmask=[/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.creditno4 = false;
      this.form.controls.creditno4.reset();
      this.creditno = true;
      this.ccv4 = false;
      this.form.controls.ccv4.reset();
      this.ccv = true;
    }else if (card_type == "Master") {
      this.cardmask=[/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.creditno4 = false;
      this.form.controls.creditno4.reset();
      this.creditno = true;
      this.ccv4 = false;
      this.form.controls.ccv4.reset();
      this.ccv = true;
    } else{
      this.cardmask=[/[6]/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.creditno4 = false;
      this.form.controls.creditno4.reset();
      this.creditno = true;
      this.ccv4 = false;
      this.form.controls.ccv4.reset();
      this.ccv = true;
    }
  }
  notesid;
  constructor(private _serv: AddtocartService, @Inject(PLATFORM_ID) private platformId: Object, private headServ: headerservice, private Data:DataService  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
      this.current = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
    }
  }

  ngOnInit() {
    window.scroll(0,0)
    this.showCartItems();
    this.getCards();
    this.getcardid(this.id);
  }

  public Imageurl = Config.Imageurlget;

  public AddToCart(Book, Course, FlashCard, Notes) {
    this._serv.addToCart(Book, Course, FlashCard, Notes).subscribe(data => {
      swal({
        type: 'success',
        title: 'Item successfully added to Cart',
        showConfirmButton: false,
        timer: 1500
      })
      this.headServ.showCartItem().subscribe(cartitems => {
        this.cartitems = cartitems;
        this.Data.emittData(this.cartitems);
      })
    }, error => {
      if (error.status == 404)
        swal({
          type: 'warning',
          title: 'This item is already in your cart',
          showConfirmButton: false,
          timer: 1500
        })
    });
  }

  removeFromCart(cartID) {
    this._serv.removeFromCart(cartID).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Item successfully deleted from Cart',
        showConfirmButton: false,
        timer: 1500
      })
      this.showCartItems();
    });

  }

  getCards() {
    this._serv.showCards().subscribe(Data => {
        this.res = Data;
        // for (let i of this.res) {
        //   if(i.default == true){
        //     // this.CardNo = i.cardNumber;
        //     // this.CCV = i.ccv;
        //     // this.EXP = i.expiryDate;
        //     // this.id=i.id
        //     // this.Status = true;
        //   }
        //   else{
        //     this.CardNo = '';
        //     this.CCV = '';
        //     this.EXP = '';
        //   }
        // }
      },
      error => {
        if (error.status === 404) {
          swal({
            type: 'error',
            title: 'Credit card not found',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status === 500) {
          swal(
            'Sorry',
            'Server is under maintenance',
            'error'
          )
        }
      })
  }
  Courses = [];
  Notes = [];
  FlashCard = [];
  Book = [];

  clear() {
    while (this.Courses.length > 0) {
      this.Courses.pop();
    }
    while (this.Notes.length > 0) {
      this.Notes.pop();
    }
    while (this.FlashCard.length > 0) {
      this.FlashCard.pop();
    }
    while (this.Book.length > 0) {
      this.Book.pop();
    }
  }
  cartdata
  showCartItems() {
    this._serv.showCartItems().subscribe(Data => {
      this.itemscount = Data.counts;
      this.SUM = Data.sum;
      this.cartdata=Data
      for (let val in Data.Cart) {
        if (Data.Cart[val].course) {
          this.Courses.push(Data.Cart[val]);
        }
        else if (Data.Cart[val].notes) {
          this.Notes.push(Data.Cart[val]);
        }
        else if (Data.Cart[val].book) {
          this.Book.push(Data.Cart[val]);
        }
        else if (Data.Cart[val].flashcard) {
          this.FlashCard.push(Data.Cart[val]);
        }
      }
    })
  }

  wishList(Book, Course, FlashCard, Notes, cartID) {
    this._serv.removeFromCart(cartID).subscribe(Data => {
      this._serv.addwishlist(Book, Course, FlashCard, Notes).subscribe(Data => {
        swal({
          type: 'success',
          title: 'Item successfully added to watch list',
          showConfirmButton: false,
          timer: 1500
        })
      },
        error => {
          swal(
            'Sorry',
            'Item is already in your wishlist',
            'error'
          )
        });
      this.clear();
      this.showCartItems();
    },
      error => {
        if (error.status == 500) {
          swal(
            'Sorry',
            'Server is under maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some thing went worrng!',
            'error'
          )
        }
      })
  }
  defaultCheck;
  changeDefault(card,id,name) {
    if(card == true){
      this.defaultCheck = true;
    }
    else {
      this.defaultCheck = false;
    }
    // alert(id)
    // alert(this.defaultCheck)
    // if (event.checked) {
    // console.log(event.checked + " : " + CardNo + " : " + ccv + " : " + exp);
    this._serv.updateCard( this.defaultCheck, id, name).subscribe(res=>{
      this.getCards();
    });

    // }
    // else {
    //   this.Status = false;
    //   this.CardNo = '';
    //   this.CCV = '';
    //   this.EXP = '';
    // }
  }
  getcardid(id) {
    this.eachcardid = id;
  }
  card(){
    this.butDisabled = false
  }
  check($event) { }
  buywithcard( f: NgForm) {
    if (this.cardtype == "American Express") {
      if ( this.form.controls.ccv4.valid &&  this.form.controls.creditno4.valid &&
         this.form.controls.exp.valid && this.form.controls.cardHolderName.valid &&
         this.form.controls.cardnickname.valid) {
        this._serv.payment(this.itemid, this.coursepay, this.cardspay, this.bookpay,  this.form.value['cardHolderName'] , this.form.value['cardnickname'], this.form.value['creditno4'].split('-').join(''), this.form.value['ccv4'], this.form.value['exp'].split('/').join(''), this.cardtype).subscribe(data => {
          swal({
            type: 'success',
            title: 'Payment Done!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();
        }, error => {
          if (error.status == 404)
            swal({
              type: 'warning',
              title: 'This item already purchase',
              showConfirmButton: false,
              timer: 1500
            })
        })
      }
      else {
        swal({
          type: 'error',
          title: 'Please enter correct details!',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    else {

      if (this.form.controls.ccv.valid &&this.form.controls.creditno.valid && 
        this.form.controls.exp.valid && this.form.controls.cardHolderName.valid &&
        this.form.controls.cardnickname.valid) {
        this._serv.payment(this.itemid, this.coursepay, this.cardspay, this.bookpay, this.form.value['cardHolderName'], this.form.value['cardnickname'] , this.form.value['creditno'].split('-').join(''), this.form.value['ccv'], this.form.value['exp'].split('/').join(''), this.cardtype).subscribe(data => {
          swal({
            type: 'success',
            title: 'Payment Done!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();
        }, error => {
          if (error.status == 404)
            swal({
              type: 'warning',
              title: 'This item already purchase',
              showConfirmButton: false,
              timer: 1500
            })
        })
      }
      else {
        swal({
          type: 'error',
          title: 'Please enter correct details!',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    this.add();
    f.resetForm();
  }
  private add(){
    if (this.cardtype == "American Express") {
      if (this.form.controls.ccv4.valid && this.form.controls.creditno4.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.exp.valid &&
        this.form.controls.cardHolderName.valid && this.form.controls.zipcode.valid &&
        this.form.controls.street.valid && this.form.controls.city.valid &&
        this.form.controls.state.valid && this.form.controls.country.valid) {
        this._serv.addCard(this.form.value['creditno4'].split('-').join(''), this.form.value['ccv4'], this.form.value['exp'].split('/').join(''), this.form.value['cardnickname'], this.cardtype, this.form.value['cardHolderName'],this.form.value['zipcode'],
        this.form.value['street'],this.form.value['city'],this.form.value['state'],this.form.value['country'],this.form.value['check']).subscribe(Data => {
        })
    }
  }
    else {
      if (this.form.controls.ccv.valid && this.form.controls.creditno.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.exp.valid &&
        this.form.controls.cardHolderName.valid && this.form.controls.zipcode.valid &&
        this.form.controls.street.valid && this.form.controls.city.valid &&
        this.form.controls.state.valid && this.form.controls.country.valid) {
        this._serv.addCard(this.form.value['creditno'].split('-').join(''), this.form.value['ccv'], this.form.value['exp'].split('/').join(''),this.form.value['cardHolderName'], this.form.value['cardnickname'],this.cardtype,  this.form.value['zipcode'],
        this.form.value['street'],this.form.value['city'],this.form.value['state'],this.form.value['country'],this.form.value['check']).subscribe(Data => {
    })
  }}
  }
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
    this._serv.zipcode(zipcode1).subscribe(
        res => {
          this.form.controls['city'].setValue(res['city']);
          this.form.controls['state'].setValue(res['state']);
          this.form.controls['country'].setValue(res['country']);
        },
        error => {
          swal({
            type: 'error',
            title: 'Invalid Zipcode!',
            showConfirmButton: false,
            timer: 2000,width: '512px',
          })
         
        });
    }
  }
  buy() {
    // alert(this.id)
    this._serv.payments( this.itemid, this.coursepay, this.cardspay,  this.bookpay,   this.eachcardid).subscribe(data => {
      swal({
        type: 'success',
        title: 'Payment Done ',
        showConfirmButton: false,
        timer: 4500
      })
    }, error => {
      if (error.status == 404)
        swal({
          type: 'warning',
          title: 'This item already purchase',
          showConfirmButton: false,
          timer: 1500
        })
    });
  }
}
