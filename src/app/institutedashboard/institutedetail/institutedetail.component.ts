
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import swal from "sweetalert2";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { InstitutedetailService } from './institutedetail.service';
import { Config } from "../../Config";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {UserprofileService} from '../../userdashboard/userprofile/userprofile.service';

@Component({
  selector: 'app-institutedetail',
  templateUrl: './institutedetail.component.html',
  styleUrls: ['./institutedetail.component.scss']
})
export class InstitutedetailComponent implements OnInit {

  constructor(private fb: FormBuilder, public router: Router, @Inject(PLATFORM_ID) private platformId: Object, public institutes : InstitutedetailService, private http: HttpClient) { }
info: any =[];
  dismiss;
  id;
  forms:FormGroup;
  model : any =[];
  ngOnInit() {
    this.getdetail();
    this.forms = this.fb.group({
      'name' : [''],
      'location' : [''],
      'email' : [''],
      'contact' : [''],
      'address' : ['']

    })
  }
getdetail(){
    this.institutes.institute().subscribe(data=>{
      console.log(data.id);
      localStorage.setItem('institute_id', data.id);
      this.info = data;


    })
}
  onsubmit() {
      swal({
        title: 'Update Information',
        text: "Are You Sure you want to update Institute information",
        type: 'warning',

        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        this.institutes.userinfo(this.info).subscribe(Res => {
          swal({
            type: 'success',
            title: 'Successfully profile update',
            showConfirmButton: false,
            timer: 4500
          });
        });
      },function(dismiss) {});
    }
    // swal.fire({
    //   title: 'Are you sure?',
    //   text: 'Do You Want o Update information?!',
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes,Update!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //
    //     if (result.value) {
    //       swal.fire(
    //         'Update!',
    //         'Update successfully.',
    //         'success'
    //       )
    //       this.institutes.userinfo(this.info).subscribe(Res => {});
    //     } else if (result.dismiss === swal.fire.DismissReason.cancel) {
    //       swal.fire(
    //         'Cancelled',
    //         'Are You sure to cancle? :)',
    //         'error'
    //       )
    //     }
    //   }),
    //     function (isConfirm) {
    //       if (isConfirm) {
    //         swal.fire("Update!", "Update infromation.", "success");
    //       } else {
    //         swal.fire("Cancelled", " :)", "error");
    //       }
    //     }


}
  //   swal.fire({
  //     title: 'Update Information',
  //     text: "Are You Sure you want to update Institute information",
  //     type: 'warning',
  //
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes'
  //   }).then((result) => {
  //     this.institutes.userinfo(this.info).subscribe(Res => {
  //       swal.fire({
  //         type: 'success',
  //         title: 'Successfully profile update',
  //         showConfirmButton: false,
  //         timer: 4500
  //       });
  //     });
  //   },function(dismiss) {});
  // }

