import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef , MatFormFieldControl} from '@angular/material';
import { GlobalService } from '../global.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
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
  value: string;
  viewValue: string;
  end_time;

  constructor(public dialogRef: MatDialogRef<AcceptofferComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private global: GlobalService) { }

  ngOnInit() {
  }
  postoffer() {
    var currentdate = moment(new Date,' YYYY-MM-DD ');
    var new_date = moment(currentdate).add(this.end_time,'days');
    console.log(this.data.notes, this.data.course, this.data.book, this.data.flashcard, this.model.offer_price, new_date);
    return this.global.acceptoffer(this.data.notes, this.data.course, this.data.book, this.data.flashcard, this.model.offer_price, new_date).subscribe(
 
    data => {
    if(data.Message=="Your Offer is Aready Accepted "){
      swal({
        type: 'warning',
        title: 'Your Offer is Already Accepted',
        showConfirmButton: false,
        timer: 3000
      })  
    }
     else if(data.Message=="Your Offer is Posted"){
          swal({
            type: 'success',
            title: 'Your offer is accepted\n' +
            '\n',
            showConfirmButton: false,
            timer: 3000
          })  
        }
     else if(data.Message=="You already posted for 5 times"){
          swal({
           type: 'warning',
           title: 'You already posted for 5 times',
           showConfirmButton: true,
           width: '512px',
         
         });
        }
        else if(data.Message=="Your offer is accepted"){
          swal({
           type: 'success',
           title: 'Your offer is accepted',
           showConfirmButton: true,
           width: '512px',
         
         });
        }
        else if(data.Message=="Your offer is not accepted"){
          swal({
           type: 'error',
           title: 'Your offer is not accepted',
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
      if(error.status===410){
        swal({
          type: 'success',
          title: 'Your offer is sent to Owner',
          showConfirmButton: false,
          timer: 2500
        }) 
      }
      if(error.status===400){
        swal({
          type: 'error',
          title: 'Your offer is not accepted',
          showConfirmButton: false,
          timer: 2500
        }) 
      }
    }
    )
  }
}
