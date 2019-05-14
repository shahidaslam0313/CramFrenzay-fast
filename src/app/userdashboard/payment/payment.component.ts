import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { paymentservice } from "./payment.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Config } from '../../Config';
import * as moment from 'moment';
import { noSpaceValidator } from '../../login/noSpaceValidator.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  model: any = {};
  private productsSource;
  currentProducts;
  firstname;
  lastname;
  profilePhoto;
  notesid;
  isright;
  cid;
  course;
  default: boolean = false;
  cards;
  book;
  noteprice;
  notepic;
  creditno;
  creditno4;
  ccv4;
  ccv;
  cardtype;
  exp;
  res;
  card;
  name;
  id;
  Eid;
  date;
  data;
  result;
  eachcardid;
  cardmask;
  card_opeation = [
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Master', viewValue: 'Master' },
    { value: 'Divcover', viewValue: 'Divcover' },
    { value: 'American Express', viewValue: 'American Express' }
  ];
  private sub: Subscription;
  public Imageurl = Config.Imageurlget;
  flipclass = 'credit-card-box';
  card_type;
  coursepay;
  form = new FormGroup({
    cardHolderName: new FormControl('',{

    }),
    cardnickname: new FormControl('',{

    }),
    card_type: new FormControl('', [
      // Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    creditno: new FormControl('', [
      // Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    creditno4: new FormControl('', [
      // Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
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
      Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
    ]),
    zipcode: new FormControl('',{

    }),
    city: new FormControl('',{

    }),
    state: new FormControl('',{

    }),
    street : new FormControl('',{

    }),
    country: new FormControl('',{

    }),
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
  constructor(private newService: paymentservice, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
      this.creditno = true;
      this.creditno4 = false;
      this.ccv = true;
      this.ccv4 = false;
      if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUse'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }
  itemid;
  bookpay;
  cardspay;
  ngOnInit() {
    window.scroll(0,0);
    this.getCards();
    this.getcardid(this.id);
    this.form.controls['check'].setValue(false);
    this.route.queryParams.subscribe(params => {
      this.itemid = params['notesid'];
      this.coursepay = params['courseid'];
      this.cardspay = params['cardsid'];
      this.bookpay = params['bookid'];
    });
  }

  nullvalue = null;
  check($event) { }
  buywithcard() {
    if (this.cardtype == "American Express") {
      if ( this.form.controls.ccv4.valid &&  this.form.controls.creditno4.valid &&
         this.form.controls.exp.valid) {
        this.date = this.form.value['exp'];
        this.newService.payment(this.itemid, this.coursepay, this.cardspay, this.bookpay,    this.form.value['creditno4'].split('-').join(''), this.form.value['ccv4'],this.form.value['cardHolderName'],  this.date.split('/').join(''),this.form.value['cardnickname'], this.cardtype).subscribe(data => {
          swal({
            type: 'success',
            title: 'Payment Done',
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
          title: 'Please enter correct details',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    else {

      if (this.form.controls.ccv.valid &&this.form.controls.creditno.valid && this.form.controls.exp.valid) {
        this.date = this.form.value['exp'];
        this.newService.payment(this.itemid, this.coursepay, this.cardspay, this.bookpay,    this.form.value['creditno'].split('-').join(''), this.form.value['ccv'], this.form.value['cardHolderName'],this.date.split('/').join(''),this.form.value['cardnickname'], this.cardtype).subscribe(data => {
          swal({
            type: 'success',
            title: 'Payment Done',
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
          title: 'Please enter correct details',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    this.add();
  }
 private add(){
    if (this.cardtype == "American Express") {
      if (this.form.controls.ccv4.valid && this.form.controls.creditno4.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.exp.valid &&
        this.form.controls.cardHolderName.valid && this.form.controls.zipCode.valid &&
        this.form.controls.street.valid && this.form.controls.city.valid &&
        this.form.controls.state.valid && this.form.controls.country.valid) {
        this.newService.addCard(this.form.value['creditno4'].split('-').join(''), this.form.value['ccv4'], this.form.value['exp'].split('/').join(''), this.form.value['cardnickname'], this.cardtype, this.form.value['cardHolderName'],this.form.value['zipcode'],
        this.form.value['street'],this.form.value['city'],this.form.value['state'],this.form.value['country'],this.form.value['check']).subscribe(Data => {
          swal({
            type: 'success',
            title: 'Payment method is listed',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();
        },
          error => {
           if (error.status == 400) {
              swal({
                type: 'error',
                title: 'Please enter correct details',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else if (error.status == 500) {
              swal(
                'Sorry',
                'Server is under maintenance',
                'error',
              )
            }
            else {
              swal(
                'Sorry',
                'Some thing went worrng',
                'error'
              )
            }
          })
      }
      else {
        swal({
          type: 'error',
          title: 'Please enter correct details',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    else {
      if (this.form.controls.ccv.valid && this.form.controls.creditno.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.exp.valid) {
        this.newService.addCard(this.form.value['creditno'].split('-').join(''), this.form.value['ccv'], this.form.value['exp'].split('/').join(''),this.form.value['cardHolderName'], this.form.value['cardnickname'],this.cardtype,  this.form.value['zipcode'],
        this.form.value['street'],this.form.value['city'],this.form.value['state'],this.form.value['country'],this.form.value['check']).subscribe(Data => {
          swal({
            type: 'success',
            title: 'Payment method is listed',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();
        },
          error => {
            if (error.status == 302) {
              swal(
                'Sorry',
                'Crad Number Already Exist',
                'error'
              )
            }
            else if (error.status == 404) {
              swal({
                type: 'error',
                title: 'This card already exist',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else if (error.status == 400) {
              swal({
                type: 'error',
                title: 'Please enter correct details',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else if (error.status == 500) {
              swal(
                'Sorry',
                'Server is under maintenance',
                'error'
              )
            }
            else {
              swal(
                'Sorry',
                'Some thing went worrng',
                'error'
              )
            }
          })
      }
      else {
        swal({
          type: 'error',
          title: 'Please enter correct details',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
  }
  buy() {
    this.newService.payments(this.itemid, this.coursepay, this.cardspay,  this.bookpay,   this.eachcardid).subscribe(data => {
      swal({
        type: 'success',
        title: 'Payment Done ',
        showConfirmButton: false,
        timer: 4500
      })
    }, error => {
      if (error.status == 404){
        swal({
          type: 'warning',
          title: 'This item already purchase',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if(error.status==400){
        swal({
          type: 'error',
          title: 'Card Details are incorrect',
          showConfirmButton: false,
          timer: 1500
        })
      }
        
    });
  }

  singlenotes(Eid) {
    this.newService.Eachnotes(Eid).subscribe(data => {
      this.result = data;
    });
  }
  getcardid(id) {
    this.eachcardid = id;
  }
  status;
  getCards() {
    this.newService.showCards().subscribe(Data => {
      this.res = Data;
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

  CardNo;
  CCV;
  EXP;
  Status = false;
  defaultCheck;
  changeDefault(card,id,name) {
    if(card == true){
      this.defaultCheck = true;
    }
    else {
      this.defaultCheck = false;
    }
this.newService.updateCard(id, this.defaultCheck,  name).subscribe(res=>{
  this.getCards();
});

  }

}
