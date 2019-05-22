import { Component, OnInit,Inject,PLATFORM_ID  } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { OfferactivityService } from "./offeractivity.service";
import { Config } from "../../Config";
import { SimpleGlobal } from "ng2-simple-global";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import swal from 'sweetalert2';
import {PagerService} from '../../paginator.service';
@Component({
  selector: 'app-offeractivity',
  templateUrl: './offeractivity.component.html',
  styleUrls: ['./offeractivity.component.scss']
})
export class OfferactivityComponent implements OnInit {
  getoffer: [];
  notes:[];
  Imageurl = Config.Imageurlget;
  course:[];
    pager: any = {};

  constructor(private pagerService: PagerService, private http: Http , private route:ActivatedRoute, public router: Router, private sg: SimpleGlobal, private offer: OfferactivityService, @Inject(PLATFORM_ID) private platformId: Object, public dialog: MatDialog) { }

  ngOnInit() {
    this.ShowAcceptOffers(1);
  }

  ShowAcceptOffers(page :number){
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }
    this.offer.acceptoffers().subscribe(Data => {
      this.getoffer = Data;
      console.log(this.getoffer);
     
        // this.pager = this.pagerService.getPager(this.getoffer['totalItems'], page, 10);

    })
  }
  openDialog3(id): void {


    const dialogRef = this.dialog.open(OfferactivityPaymentComponent, {
      width: '500px',
      data: {
        notes: id,
      }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
  }
  openDialog4(id): void {
    const dialogRef = this.dialog.open(OfferactivityPaymentComponent, {
      width: '500px',
      data: {
        course: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openDialog5(id): void {


    const dialogRef = this.dialog.open(OfferactivityPaymentComponent, {
      width: '500px',
      data: {
        flashcard: id,
      }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
  }
  openDialog6(id): void {


    const dialogRef = this.dialog.open(OfferactivityPaymentComponent, {
      width: '500px',
      data: {
        book: id,
      }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
  }
}
@Component({
  selector: 'app-offeractivity-payment--dialog',
  templateUrl: 'offeractivity-payment-dialog.html',
  styleUrls: ['./offeractivity.component.scss']

})
export class OfferactivityPaymentComponent {
  constructor(public dialogRef: MatDialogRef<OfferactivityPaymentComponent>, @Inject(MAT_DIALOG_DATA) public data: any,public offer:OfferactivityService){}
  card_option = [
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Master', viewValue: 'Master' },
    { value: 'Divcover', viewValue: 'Divcover' },
    { value: 'American Express', viewValue: 'American Express' }
  ]; 
  CCV: FormGroup;
    CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
    ExpiryDate= '([0-9]{2}[/]?){2}';
  
    ExpiryDateForm = new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$'),
    ]);
  
    CardNumberForm = new FormControl('', [
      Validators.required,
  
    ]);
  
    CardCodeForm = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(4)
    ]);
    card_type= new FormControl('',[
      Validators.required,
    ])
    TotalAmountForm = new FormControl('', [
      Validators.required
    ]);
    id;
    course;
    book;
    flashcard;
    ngOnInit() {
      this.show_Card_info();
    }
  
    res;
    status;
    public model: any = {};
    var_get_status;
    var_get_id;
    show_Card_info() {
  return this.offer.showCards().subscribe(Response =>{
      this.res = Response;
      for(let i of this.res)
      { if (i.default) {
              this.status = i;
            }
      }
      if (this.status) {
            this.model.cardNumber  = this.status.cardNumber;
            this.model.expirationdate = this.status.expiryDate;
            this.model.cardcod = this.status.ccv;
            this.model.card_type=this.status.card_type;
            this.var_get_status = this.status.default;
            this.var_get_id = this.status.id;
          }
    })
  }
  updefault;
  nullvalue = null;
  setcard(name,status,id) {
    if (status == true) {
      this.updefault = false;
    }
    else if(status == false)
    this.updefault = true;
     {
  
    }
   return this.offer.updateCard(id, this.updefault, name).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Credit Card Details Are Updated!',
        showConfirmButton: false,
        timer: 2500
      });
      this.show_Card_info();
    },
      error => {
        if (error.status == 400) {
          swal({
            type: 'error',
            title: 'Credit Card Details Are Not Correct!',
            showConfirmButton: false,
            timer: 2500
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some Thing Went Worrng!',
            'error'
          )
        }
      })
  }
    expirationdate;
    cardcod;
    card_id;
  
    buy() {
      if(this.id=this.data.notes){
        this.offer.offerpayment(this.nullvalue, this.nullvalue, this.nullvalue, this.data.notes, this.CardNumberForm.value ,this.CardCodeForm.value, this.ExpiryDateForm.value, this.card_type.value ,this.var_get_id ).subscribe(data => {
          swal({
            type: 'success',
            title: 'Payment Done ',
            showConfirmButton: false,
            timer: 4500
          });
        },);
      }
     else if(this.id=this.data.flashcard){
        this.offer.offerpayment(this.nullvalue, this.nullvalue, this.data.flashcard, this.nullvalue, this.CardNumberForm.value ,this.CardCodeForm.value, this.ExpiryDateForm.value, this.card_type.value ,this.var_get_id ).subscribe(data => {
          swal({
            type: 'success',
            title: 'Payment Done ',
            showConfirmButton: false,
            timer: 4500
          });
        },);
      }
     else if(this.id=this.data.course){
        this.offer.offerpayment(this.data.course, this.nullvalue, this.nullvalue, this.nullvalue, this.CardNumberForm.value ,this.CardCodeForm.value, this.ExpiryDateForm.value, this.card_type.value ,this.var_get_id ).subscribe(data => {
          swal({
            type: 'success',
            title: 'Payment Done ',
            showConfirmButton: false,
            timer: 4500
          });
        },);
      }
      else if(this.id=this.data.book){
        this.offer.offerpayment(this.nullvalue, this.data.book, this.nullvalue, this.nullvalue, this.CardNumberForm.value ,this.CardCodeForm.value, this.ExpiryDateForm.value, this.card_type.value ,this.var_get_id ).subscribe(data => {
          swal({
            type: 'success',
            title: 'Payment Done ',
            showConfirmButton: false,
            timer: 4500
          });
        },);
      }
     
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
  

