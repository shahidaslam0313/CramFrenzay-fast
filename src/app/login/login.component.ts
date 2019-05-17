import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { FormBuilder, Validators, FormControl, FormGroup , NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { noSpaceValidator } from './noSpaceValidator.component';
import { Config } from '../Config';
import { AuthService } from 'angular5-social-login';
import { GlobalService } from '../global.service';
import { headerservice } from '../includes/header/header.service';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { RecapchaService } from '../recapcha/recapcha.service';
import { JwtHelper } from 'angular2-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormsModule],
})
export class LoginComponent {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;

  // ----------------------------------------------- Objects ----------------------------------------------------------

  jwtHelper: JwtHelper = new JwtHelper();


  hide = true;
  captcharesponse;
  checkbox;
  private productsSource;
  currentProducts;
  user: any = {};
  public LoggedIn: number = 0;
  emailonly = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  error = '';
  role;
  public wishlist;
  localusername;
  message: string;
  localpassword;
  getwatch;
  isChecked: boolean = true;
  loggedIn;
  // ----------------------------------------------- Form Group ----------------------------------------------------------

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      noSpaceValidator.cannotContainSpace
    ]),
    password: new FormControl('', [
      Validators.required,
      noSpaceValidator.cannotContainSpace
    ])
  });

  forgotpasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ])
  });
  name: string;

  // ----------------------------------------------- Methods ----------------------------------------------------------

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.forgotpasswordForm.get('email');
  }
  current;
  token;
  logedin;
  pic;
  emptyWishlist;
  public wishlistCourses: any;
  constructor(private recha: RecapchaService, private obj: LoginService, public router: Router, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal, @Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService, private global: GlobalService, private getwishlist: headerservice) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentProducts = this.productsSource.asObservable();
      this.current = localStorage.getItem('currentUser');
      this.token = this.current && this.current.token;
    }
    window.scroll(0,0);
  }
  signOut(): void {
    this.authService.signOut();
  }
  ngOnInit() {
    // this.global.currentMessage.subscribe(message => this.message = message);
    if (isPlatformBrowser(this.platformId)) {
      this.logedin = localStorage.getItem('loged_in');
      // alert(this.logedin)
    }
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length === 0) {
          this.wishlistCourses = data;
        } else {
          this.wishlistCourses = [];
        }
      });
    if (this.logedin === 1) {

      this.router.navigate(['/']);
    }
    this.global.currentMessage.subscribe(
      data => {
        if (data.length === 0) {
          this.wishlist = data;
        } else {
          this.wishlist = [];
        }
      });

    this.localusername = localStorage.getItem('Username');

    if (this.localusername != null && this.localpassword != null) {
      this.username.setValue(this.localusername);
    }
  }

  public resolved(captchaResponse: string) {
    this.captcharesponse = captchaResponse;
  }

  doCheck($event) {
    this.isChecked = !this.isChecked;
  }
  JWT;
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
            this.showSuccess();
          }
        }
      );
    }
  }
  facebooklogin(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(this.socialCallBack).catch(user => console.log(user));

  }
  googlelogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(this.socialCallBack).catch(message => console.log(message));
  }
  id;
  Login() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }

    if (this.loginForm.valid) {
      if (this.recha.check()) {

        this.obj.login_authentication(this.username.value, this.password.value).subscribe(Data => {
          this.role = Data.Role;
          localStorage.setItem('role', this.role);
          this.obj.login_token_decode(this.username.value, this.password.value).subscribe(Res => {

            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem("loged_in", '1');
              localStorage.setItem('Username', this.username.value);
              this.global.publishData("1");
            }

            // if (this.isChecked == true) {

            if (Res == false) {
              this.LoggedIn = 1;
            }
            else {
              this.error = 'Username or password is incorrect';
              this.LoggedIn = 0;
            }
            this.global.setGlobalToken(true);

            if (this.role === "T") {
              this.router.navigate(['/userprofile/' + this.username.value]);

              this.getwishlist.showwishlist().subscribe(response => {
                if (response.hasOwnProperty("status")) {
                  this.emptyWishlist = true;
                  this.global.getemptyWishlistGlobal(this.emptyWishlist);
                }
                else {
                  this.wishlistCourses = response;
                  console.log(this.wishlistCourses);
                  this.global.getGolbalWishListCourses(this.wishlistCourses);
                  this.emptyWishlist = false;
                  console.log(this.emptyWishlist);
                  this.global.getemptyWishlistGlobal(this.emptyWishlist);
                }
              });
              this.showSuccess();
            }
            else if (this.role === "U") {
              this.router.navigate(['/userprofile/' + this.username.value]);
              this.showSuccess();
            }
            // if (this.role == "A" || this.role == "U" || this.role == "T") {
            else if (this.role === "A") {
              this.router.navigate(['/dashboard/' + this.username.value]);
            }
            else if (this.role === "I") {
              this.router.navigate(['/institutedashboard/' + this.username.value]);
            }

          });
        },
          error => {
            if (error.status == 400) {
              swal({
                type: 'error',
                title: 'Accout Activation',
                text: 'Please activate your account first!',
                showConfirmButton: false,
                width: '512px',
                timer: 2000
              })
            }
            else if (error.status == 404) {
              swal({
                type: 'error',
                title: 'Wrong Credantials',
                text: 'Please check your username or password!',
                showConfirmButton: false,
                width: '512px',
                timer: 2000
              });
            }
            else if (error.status == 401) {
              swal({
                type: 'error',
                title: 'Wrong Username',
                text: 'Please check your username or password!',
                showConfirmButton: false,
                width: '512px',
                timer: 2000
              });
            }
          });
      }
      else {
        this.recha.resetImg();
        swal({
          type: 'error',
          title: 'Recaptcha Confirmation',
          text: 'Please confirm you are not a robot',
          showConfirmButton: false,
          width: '512px',
          timer: 2000
        });
      }
    }
    else {
      swal({
        type: 'error',
        title: 'Wrong Credantials',
        text: 'Please check your username or password!',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    }
  }

  onSubmit(f: NgForm) {
    if (this.forgotpasswordForm.valid) {
      this.obj.forgotpaassword(this.email.value).subscribe(Res => {
        swal({
          text: 'Password reset link has been sent to your email',
          title: "CramFrenzy!",
          type: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      },
        error => {
          if (error.status == 500) {
            swal({
              text: 'Server is under maintenance',
              title: "Sorry!",
              type: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          else if (error.status == 404) {
            swal({
              text: 'Please register first',
              title: "CramFrenzy!",
              type: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          else {
            swal({
              text: 'Some thing went wrong',
              title: "Sorry!",
              type: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
    }
    else {
      swal({
        title: 'Please enter correct details',
        type: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    f.resetForm;
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

