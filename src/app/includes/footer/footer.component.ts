import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FooterService } from './footer.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import swal from "sweetalert2";
import {  HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  private productsSource;
  currentProducts;
  result;
  Email;
  model: any = {};

  constructor(  private footer: FooterService,  @Inject(PLATFORM_ID) private platformId: Object) {
    this.courses();
  }

  ngOnInit() {

  }

  courses() {
    this.footer.Coursesonfooter().subscribe(data => {
      this.result = data;
    });
  }

  onSubmit(f: NgForm) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.footer.sub(this.model)
      .subscribe(Res => {
        swal({
          text: 'Subcribe Email successfully!',
          title: "CramFrenzy",
          type: "success",
          showConfirmButton: false,
          confirmButtonColor: "#DD6B55",
          timer: 4500,
          confirmButtonText: "OK",

        });
      },
        error => {
        if(error.status===400){
            swal({
                text: 'Invalid Email!',
                title: "CramFrenzy",
                type: "error",
                showConfirmButton: false,
                timer: 1500,
            });}
            else if(error.status===403) {
            swal({
                text: 'You are Already Subscribed',
                title: "CramFrenzy",
                type: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        }
      )
      ;
    f.resetForm();
  }

}
