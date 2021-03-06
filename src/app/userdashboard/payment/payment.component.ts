import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { paymentservice } from "./payment.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Config } from '../../Config';
import * as moment from 'moment';
import { noSpaceValidator } from '../../login/noSpaceValidator.component';
import { PaymentmethodsService } from '../paymentmethods/paymentmethods.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public Imageurl = Config.Imageurlget;
  model: any = {};
  private productsSource;
  currentProducts;
  firstname;
  lastname;
  profilePhoto;
  notesid;
  isright;
  cid;
  default: boolean = false;
  butDisabled: boolean = true;
  cards;
  book;
  noteprice;
  notepic;
  creditno;
  creditno4;
  cvv4;
  cvv;
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
    { value: 'Discover', viewValue: 'Discover' },
    { value: 'American Express', viewValue: 'American Express' }
  ];
  private sub: Subscription;
  flipclass = 'credit-card-box';
  card_type;
  coursepay;
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
    cvv: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    cvv4: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    exp: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
    ]),
    zipcode: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]*$'),
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
      this.cvv = false;
      this.form.controls.cvv.reset();
      this.cvv4 = true;
    }
    else if (card_type == "Visa") {
      this.cardmask=[/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.creditno4 = false;
      this.form.controls.creditno4.reset();
      this.creditno = true;
      this.cvv4 = false;
      this.form.controls.cvv4.reset();
      this.cvv = true;
    }else if (card_type == "Master") {
      this.cardmask=[/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.creditno4 = false;
      this.form.controls.creditno4.reset();
      this.creditno = true;
      this.cvv4 = false;
      this.form.controls.cvv4.reset();
      this.cvv = true;
    } else{
      this.cardmask=[/[6]/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,'-',  /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.creditno4 = false;
      this.form.controls.creditno4.reset();
      this.creditno = true;
      this.cvv4 = false;
      this.form.controls.cvv4.reset();
      this.cvv = true;
    }
  }
  constructor(private newService: paymentservice, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
      this.creditno = true;
      this.creditno4 = false;
      this.cvv = true;
      this.cvv4 = false;
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
    this.geteachnotes()
    this.geteachcourse()
    this.geteachcard()
    this.geteachbook()
  }
  cardselect(){
    this.butDisabled = false
  }
  nullvalue = null;
  check($event) { }
  buywithcard(f:NgForm) {
    if (this.cardtype == "American Express") {
      if ( this.form.controls.cvv4.valid &&  this.form.controls.creditno4.valid &&
         this.form.controls.exp.valid) {
        this.date = this.form.value['exp'];
        this.newService.payment(this.itemid, this.coursepay, this.cardspay, this.bookpay,    this.form.value['creditno4'].split('-').join(''), this.form.value['cvv4'],this.form.value['cardHolderName'],  this.date.split('/').join(''),this.form.value['cardnickname'], this.cardtype).subscribe(data => {
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

      if (this.form.controls.cvv.valid &&this.form.controls.creditno.valid && this.form.controls.exp.valid) {
        this.date = this.form.value['exp'];
        this.newService.payment(this.itemid, this.coursepay, this.cardspay, this.bookpay,    this.form.value['creditno'].split('-').join(''), this.form.value['cvv'], this.form.value['cardHolderName'],this.date.split('/').join(''),this.form.value['cardnickname'], this.cardtype).subscribe(data => {
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
    f.resetForm();
  }
 private add(){
    if (this.cardtype == "American Express") {
      if (this.form.controls.cvv4.valid && this.form.controls.creditno4.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.exp.valid &&
        this.form.controls.cardHolderName.valid && this.form.controls.zipcode.valid &&
        this.form.controls.street.valid && this.form.controls.city.valid &&
        this.form.controls.state.valid && this.form.controls.country.valid) {
        this.newService.addCard(this.form.value['creditno4'].split('-').join(''), this.form.value['cvv4'], this.form.value['exp'].split('/').join(''), this.form.value['cardnickname'], this.cardtype, this.form.value['cardHolderName'],this.form.value['zipcode'],
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
      if (this.form.controls.cvv.valid && this.form.controls.creditno.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.exp.valid &&
        this.form.controls.cardHolderName.valid && this.form.controls.zipcode.valid &&
        this.form.controls.street.valid && this.form.controls.city.valid &&
        this.form.controls.state.valid && this.form.controls.country.valid) {
        this.newService.addCard(this.form.value['creditno'].split('-').join(''), this.form.value['cvv'], this.form.value['exp'].split('/').join(''),this.form.value['cardHolderName'], this.form.value['cardnickname'],this.cardtype,  this.form.value['zipcode'],
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
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
    this.newService.zipcode(zipcode1).subscribe(
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
    this.newService.payments(this.itemid, this.coursepay, this.cardspay,  this.bookpay,   this.eachcardid).subscribe(data => {
      swal({
        type: 'success',
        title: 'Payment Done ',
        showConfirmButton: false,
        timer: 4500
      })
      if(this.cardspay){
        this.router.navigate(['/fcdetail/'+ this.cardspay]);
      }  
      else if(this.itemid){
        this.router.navigate(['/notes/'+ this.itemid]);
      }
      else if(this.coursepay){
        this.router.navigate(['/eachcourse/'+ this.coursepay]);
      }
      else if(this.bookpay){
        this.router.navigate(['/detail/'+ this.bookpay]);
      }
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
      console.log(this.res);
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
  note
  geteachnotes(){
    this.newService.eachnotes(this.itemid).subscribe(data =>{
      this.note =data
      console.log(this.note,'eachnotes')
    })
  }
  course
  geteachcourse(){
    this.newService.eachcourse(this.coursepay).subscribe(data =>{
      this.course=data.Course
      console.log(this.course,'eachcourse')
    })
  }
  geteachcard(){
    this.newService.eachcard(this.cardspay).subscribe(data =>{
      this.card=data
      console.log(this.card,'eachcard')
    })
  }
  geteachbook(){
    this.newService.eachbook(this.bookpay).subscribe(data =>{
      this.book=data
      console.log(this.book,'eachbook')
    })
  }
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
