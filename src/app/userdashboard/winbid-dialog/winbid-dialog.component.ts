import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { paymentservice } from '../payment/payment.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-winbid-dialog',
  templateUrl: './winbid-dialog.component.html',
  styleUrls: ['./winbid-dialog.component.scss']
})
export class WinbidDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WinbidDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public payment: paymentservice){ }
  CCV: FormGroup;
  card_option = [
    { value: 'Visa', viewValue: 'Visa' },
    { value: 'Master', viewValue: 'Master' },
    { value: 'Divcover', viewValue: 'Divcover' },
    { value: 'American Express', viewValue: 'American Express' }
  ]; 
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate= '([0-9]{2}[/]?){2}';

  ExpiryDateForm = new FormControl('', [
    Validators.required,
    Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$'),
  ]);

  CardNumberForm = new FormControl('', [
    Validators.required,

  ]);
  card_type= new FormControl('',[
    Validators.required,
  ])

  CardCodeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(4)
  ]);
  TotalAmountForm = new FormControl('', [
    Validators.required
  ]);
  notes_id;
  card_id;
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
  id;
  show_Card_info() {
return this.payment.showCards().subscribe(Response =>{
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
 return this.payment.updateCard(id, this.updefault, name).subscribe(Data => {
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


  buy() {
    if(this.id=this.data.notes_id){
      this.payment.bidpayments(this.nullvalue, this.nullvalue, this.nullvalue, this.data.notes_id, this.CardNumberForm.value ,this.CardCodeForm.value, this.ExpiryDateForm.value, this.card_type.value ,this.var_get_id ).subscribe(data => {
        swal({
          type: 'success',
          title: 'Payment Done ',
          showConfirmButton: false,
          timer: 4500
        });
      },);
    }
   else if(this.id=this.data.card_id){
      this.payment.bidpayments(this.nullvalue, this.nullvalue, this.data.card_id, this.nullvalue, this.CardNumberForm.value ,this.CardCodeForm.value, this.ExpiryDateForm.value, this.card_type.value ,this.var_get_id ).subscribe(data => {
        swal({
          type: 'success',
          title: 'Payment Done ',
          showConfirmButton: false,
          timer: 4500
        });
      },);
    }
   else if(this.id=this.data.course_id){
      this.payment.bidpayments(this.data.course_id, this.nullvalue, this.nullvalue, this.nullvalue, this.CardNumberForm.value ,this.CardCodeForm.value, this.ExpiryDateForm.value, this.card_type.value ,this.var_get_id ).subscribe(data => {
        swal({
          type: 'success',
          title: 'Payment Done ',
          showConfirmButton: false,
          timer: 4500
        });
      },);
    }
    else if(this.id=this.data.book_id){
      this.payment.bidpayments(this.nullvalue, this.data.book_id, this.nullvalue, this.nullvalue, this.CardNumberForm.value ,this.CardCodeForm.value, this.ExpiryDateForm.value, this.card_type.value ,this.var_get_id ).subscribe(data => {
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
