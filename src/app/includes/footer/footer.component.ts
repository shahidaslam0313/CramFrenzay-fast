import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FooterService } from './footer.service';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import swal from "sweetalert2";
import {  HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angular5-social-login';
import { JwtHelper } from 'angular2-jwt';
import { Config } from '../../Config';


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
  user: any = {};
  pic;
  username
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(  private footer: FooterService,private router: Router,private authService: AuthService,private http: HttpClient,  @Inject(PLATFORM_ID) private platformId: Object) {
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
          text: 'Subscribed successfully',
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
  sliderClick(name){
    // this.router.navigate(['/subcategory/'], {queryParams: {cat_id : id}})
    localStorage.setItem('slidername' , name);
    }
    facebooklogin(): void {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(this.socialCallBack).catch(user => console.log(user));
  
    }
    socialCallBack = (user) => {
      this.user = user;
      console.log(this.user);
      const headers = { 'Content-Type': 'application/json' };
      if (user) {
        const createUser = this.http.post(Config.api + 'user/social_login_web/', JSON.stringify(
          {
            user
          }), { headers: headers });
  
        createUser.subscribe(data => {
            let user = { 
             user_id: this.jwtHelper.decodeToken(data['token']).user_id,
             username: this.jwtHelper.decodeToken(data['token']).username, 
             token: data['token'] };
            if (user && user.token) {
              localStorage.setItem('loged_in', '1');
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('profilePhoto' , this.pic);
              this.router.navigate(['/userprofile/' + this.username]);
              // this.showSuccess();
            }
          }
        );
      }
    }
    showSuccess() {
      swal({
        type: 'success',
        title: 'You have successfully logged in to CramFrenzy.\n' +
        '\n',
        showConfirmButton: false,
        width: '512px',
        timer: 4000
      });
    }
}
