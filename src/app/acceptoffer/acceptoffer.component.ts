import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GlobalService } from '../global.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-acceptoffer',
  templateUrl: './acceptoffer.component.html',
  styleUrls: ['./acceptoffer.component.scss']
})
export class AcceptofferComponent implements OnInit {
  book;
  flashcard;
  notes;
  model: any = {};
  status;
 
  constructor(public dialogRef: MatDialogRef<AcceptofferComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private global: GlobalService) { }

  ngOnInit() {
  }
  postoffer() {
    return this.global.acceptoffer(this.data.notes, this.data.course, this.data.books, this.data.flashcard, this.model.offer_price).subscribe(
    data => {
    if(data.Message=="Your offer is already accepted "){
      swal({
        type: 'warning',
        title: 'Your offer is already accepted',
        showConfirmButton: false,
        timer: 4500
      })  
    }
     else if(data.Message=="Your offer is posted"){
          swal({
            type: 'success',
            title: 'Your offer was accepted\n' +
            '\n',
            showConfirmButton: false,
            timer: 4500
          })  
        }
     else if(data.Message=="You already posted for 3 times"){
          swal({
           type: 'warning',
           title: 'You already posted for 3 times',
           showConfirmButton: true,
           width: '512px',
         
         });
        }
    },
    error=>{
      if(error.status===406){
        swal({
          type: 'error',
          title: 'Item Already Purchased',
          showConfirmButton: false,
          timer: 2500
        }) 
      }
    }
    )
  }
}
