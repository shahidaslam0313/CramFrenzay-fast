import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PaymentmethodsService } from './paymentmethods.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { noSpaceValidator } from '../../login/noSpaceValidator.component';
// import { observable } from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.component.html',
  styleUrls: ['./paymentmethods.component.scss']
})
export class PaymentmethodsComponent implements OnInit {
city;state;country;
  cardnickname2;
  card_opeation = [
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Master', viewValue: 'Master' },
    { value: 'Divcover', viewValue: 'Discover' },
    { value: 'American Express', viewValue: 'American Express' }
  ];
  form = new FormGroup({
    cardnumber: new FormControl('', [
      //Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    cardnumber4: new FormControl('', [
      // Validators.minLength(15),
      // Validators.maxLength(15),
      Validators.required,
      // Validators.pattern('^[0-9]*$')
    ]),
    card_type: new FormControl('', [
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
    expirydate: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
    ]),
    cardnickname: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required,
    ]),
    cardHolderName: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    zipCode: new FormControl('',[
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
    country: new FormControl('',[
      Validators.required,
      Validators.pattern("[a-zA-Z ]+")
    ]),
    check: new FormControl(),
  });
  updateForm = new FormGroup({
    cardnumber2: new FormControl('', [
      Validators.minLength(15),
      Validators.maxLength(16),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    card_type: new FormControl('', [
      // Validators.minLength(15),
      // Validators.maxLength(16),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    cvv2: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    expirydate2: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')
    ]),
    cardnickname2: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required,
      noSpaceValidator.cannotContainSpace
    ]),
    check2: new FormControl(),
  });
  card_type = new FormControl();
  private productsSource;
  currentProducts;
  cardtype;
  expirydate;
  cvv4;
  Message;
  public cardmask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private sub: Subscription;
  chek(val) {
    this.expirydate = val.toString().slice(3, 5);
    console.log(this.expirydate, 'jj')
  }
  public masks = function (rawValue) {

    // add logic to generate your mask array  
    if (rawValue && rawValue.length > 0) {
      if (rawValue[0] == '0' || rawValue[5] == '1') {
        return [/[01]/, /[1-9]/, '/', /[0-9]/, /[0123456789]/];
      } else {
        return [/[01]/, /[0-2]/, '/', /[0-9]/, /[0123456789]/];
      }
    }
    return [/[01]/, /[0-9]/, '/', /[0-9]/, /[0123456789]/];

  }
  flipclass = 'credit-card-box';
  constructor(private serv: PaymentmethodsService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.cardnumber = true;
    this.cardnumber4 = false;
    this.cvv = true;
    this.cvv4 = false;
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUse'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }
  ngOnInit() {
    window.scroll(0,0)
    this.form.controls['check'].setValue(false);
    this.getCards();
  }
  id;
  cardid = "";
  card;
  status;
  cardnumber;
  cardnumber4;
  exp;
  cvv;
  type; cardnum; nickname;
  Eachcard (id){
    this.serv.singleCard(id).subscribe(data=> {
      this.card = data
    })
  }
  ShowButton(card_type) {
    this.cardtype = card_type;
    if (card_type == "American Express") {
      this.cardtype = card_type;
      this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.cardnumber = false;
      this.form.controls.cardnumber.reset();
      this.cardnumber4 = true;
      this.cvv = false;
      this.form.controls.cvv.reset();
      this.cvv4 = true;
    }
    else if (card_type == "Visa") {
      this.cardmask = [/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.cardnumber4 = false;
      this.form.controls.cardnumber4.reset();
      this.cardnumber = true;
      this.cvv4 = false;
      this.form.controls.cvv4.reset();
      this.cvv = true;
    } else if (card_type == "Master") {
      this.cardmask = [/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.cardnumber4 = false;
      this.form.controls.cardnumber4.reset();
      this.cardnumber = true;
      this.cvv4 = false;
      this.form.controls.cvv4.reset();
      this.cvv = true;
    } else {
      this.cardmask = [/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.cardtype = card_type;
      this.cardnumber4 = false;
      this.form.controls.cardnumber4.reset();
      this.cardnumber = true;
      this.cvv4 = false;
      this.form.controls.cvv4.reset();
      this.cvv = true;
    }
  }
  model: any = {};
  updateSingleCard(id) {
    this.serv.updateCard(this.card.nickname, this.card.street_adrress, this.card.state, this.card.city, this.card.zip_code, this.card.country, this.card.default, id).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Credit card details are updated',
        showConfirmButton: false,
        timer: 1500
      });
      this.getCards();
    },
      error => {
        if (error.status == 400) {
          swal({
            type: 'error',
            title: 'Credit card details are not correct',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
    this.serv.zipcode(zipcode1).subscribe(
        res => {
          this.form.controls['city'].setValue(res['city']);
          this.form.controls['state'].setValue(res['state']);
          this.form.controls['country'].setValue(res['country']);
        },
        error => {
          swal({
            type: 'error',
            title: 'Invalid Zipcode',
            showConfirmButton: false,
            timer: 2000,width: '512px',
          })
         
        });
    }
  }
  deleteSingleCard(id) {
    this.serv.deleteCard(id).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Credit card is deleted',
        showConfirmButton: false,
        timer: 1500
      })
      this.getCards();
    },
      error => {
        if (error.status == 204) {
          swal({
            type: 'error',
            title: 'No credit card found',
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
            'Some thing went Wrong',
            'error'
          )
        }
      })
  }
  date;
  add(f: NgForm) {
    if (this.cardtype == "American Express") {
      if (this.form.controls.cvv4.valid && this.form.controls.cardnumber4.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.expirydate.valid &&
        this.form.controls.cardHolderName.valid && this.form.controls.zipCode.valid &&
        this.form.controls.street.valid && this.form.controls.city.valid &&
        this.form.controls.state.valid && this.form.controls.country.valid) {
        this.serv.addCard(this.form.value['cardnumber4'].split('-').join(''), this.form.value['cvv4'], this.form.value['expirydate'].split('/').join(''), this.form.value['cardnickname'], this.cardtype, this.form.value['cardHolderName'],this.form.value['zipCode'],
        this.form.value['street'],this.form.value['city'],this.form.value['state'],this.form.value['country'],this.form.value['check']).subscribe(
          data => {
          // if(data.Message == "Card Number already exist"){
          //   swal({
          //     type: 'error',
          //     title: 'Card Number already exist',
          //     showConfirmButton: false,
          //     timer: 1500
          //   })
          // }
          swal({
            type: 'success',
            title: 'Payment method is listed',
            showConfirmButton: false,
            timer: 1500
          })
         
          this.getCards();
        },
          error => {
             if (error.status == 404) {
              swal({
                type: 'error',
                title: 'Card Number already exist',
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
      if (this.form.controls.cvv.valid && this.form.controls.cardnumber.valid &&
        this.form.controls.cardnickname.valid && this.form.controls.expirydate.valid) {
        this.serv.addCard(this.form.value['cardnumber'].split('-').join(''), this.form.value['cvv'], this.form.value['expirydate'].split('/').join(''),this.form.value['cardHolderName'], this.form.value['cardnickname'],this.cardtype,  this.form.value['zipCode'],
        this.form.value['street'],this.form.value['city'],this.form.value['state'],this.form.value['country'],this.form.value['check']).subscribe(
          data => {
          // if(data.Message == "Card Number already exist"){
          //   swal({
          //     type: 'error',
          //     title: 'Card Number already exist',
          //     showConfirmButton: false,
          //     timer: 1500
          //   })
          // }
          
          swal({
            type: 'success',
            title: 'Payment method is listed',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();
        },
          error => {
            if (error.status == 404) {
              swal({
                type: 'error',
                title: 'Card Number already exist',
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
    f.resetForm()
  }
  res;
  getCards() {
    this.serv.showCards().subscribe(Data => {
      this.res = Data;
    },
      error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'Credit card not found',
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
      })
  }
}
