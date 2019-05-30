import { Component, OnInit , Inject , PLATFORM_ID } from '@angular/core';
import { PendingoffersService } from './pendingoffers.service';
import { isPlatformBrowser } from '@angular/common';
import { Config } from '../../Config';
import swal from "sweetalert2";
@Component({
  selector: 'app-pendingoffers',
  templateUrl: './pendingoffers.component.html',
  styleUrls: ['./pendingoffers.component.scss']
})
export class PendingoffersComponent implements OnInit {
  offercount;
  public Imageurl = Config.Imageurlget;
  constructor(private offer:PendingoffersService,  @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    window.scroll(0,0);
    this.showofferItems();
  }
  showofferItems() {
    this.offer.userpendingoffer().subscribe(Data => {
      this.offercount = Data;
     
      console.log(this.offercount);
    })
  }
  approcourse(id) {
  alert(id);
    this.offer.approvecourse(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Accept offer',
        showConfirmButton: false,
        timer: 5500
      });
    
    });
    this.showofferItems();
  }
  rejectedcourse(id) {
    alert(id);
      this.offer.rejectcourse(id).subscribe(Res => {
        swal({
          type: 'success',
          title: 'Reject offer',
          showConfirmButton: false,
          timer: 5500
        });
      
      });
      this.showofferItems();
    }
}
