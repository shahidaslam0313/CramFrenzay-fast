import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef , MatFormFieldControl} from '@angular/material';
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
  value: string;
  viewValue: string;
  range = [
    { value: '12', viewValue: '12' },
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
  ];
  constructor(public dialogRef: MatDialogRef<AcceptofferComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private global: GlobalService) { }

  ngOnInit() {
  }
  postoffer() {
    return this.global.acceptoffer(this.data.notes, this.data.course, this.data.book, this.data.flashcard, this.model.offer_price, this.model.end_time).subscribe(
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
            title: 'Your offer is accepted\n' +
            '\n',
            showConfirmButton: false,
            timer: 4500
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
           type: 'success',
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
          type: 'success',
          title: 'Your offer is not accepted',
          showConfirmButton: false,
          timer: 2500
        }) 
      }
    }
    )
  }
}
