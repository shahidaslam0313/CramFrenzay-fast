import {Component, Inject, OnInit, PLATFORM_ID, ViewChild, Input} from '@angular/core';
import {Config} from '../../Config';
import swal from 'sweetalert2';
import {isPlatformBrowser} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {EachcourseService} from '../eachcourse/eachcourse.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AddtocartComponent} from './../../addtocart/addtocart.component';
import { PagerService } from '../../paginator.service';
import {VideoShowDialogComponent} from "../../userdashboard/coursevideo/video-show-dialog/video-show-dialog.component";
import {MatDialog} from "@angular/material";
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-eachcourse',
  templateUrl: './eachcourse.component.html',
  styleUrls: ['./eachcourse.component.scss']
})
export class EachcourseComponent implements OnInit {
  @ViewChild(AddtocartComponent)

  public Imageurl = Config.Imageurlget;
  public profileurl=Config.Imageurleach;
  result :any =[];
  getresult :any =[];
  pager;
  getlocalstorgae =JSON.parse(localStorage.getItem('currentUser'))
  public courseId: any;
  public tutorId: any;
  public sub: Subscription;
  private productsSource;
  currentProducts;
  role;
  rate;
  view;
  comment;
  id;
  chapter_name;
  videos;
  totalvideos;
  all_video;
  lectures;
  // "Lectures": 0,
  totalvid;
  // public tutor_id;

  model: any = {};
  reviewform = new FormGroup({
    comment: new FormControl('', [
      Validators.required
      ])
  })
  @Input() url = 'https://www.cramfrenzy.com/';
  constructor(private pagerService: PagerService, private eachcourse: EachcourseService, private router: Router, private route: ActivatedRoute,  @Inject(PLATFORM_ID) private platformId: Object,  public dialog: MatDialog ,public addtocart: AddtocartComponent) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
    if (!window['fbAsyncInit']) {
      window['fbAsyncInit'] = function () {
          window['FB'].init({
              appId: '2243800905848514',
              autoLogAppEvents: true,
              xfbml: true,
              version: 'v3.0'
          });
      };
      
  }

  // load facebook sdk if required
  const url = 'https://connect.facebook.net/en_US/sdk.js';
  if (!document.querySelector(`script[src='${url}']`)) {
      let script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
  }
  }

  ngOnInit() {
    window.scroll(0,0);
    this.sub = this.route.params.subscribe(params => {
      this.courseId = +params['id'] || 0;
    });
    // console.log(this.courseId);
    this.eachcourseshow();
    this.reviewsss(this.pager);
    this.getchaptername();
    
      // this.gettutorinfo();
      // alert(this.gettutorinfo)
  
  
     
  
    window['FB'] && window['FB'].XFBML.parse();
    
  }
  get(rating) {
    this.rate = rating;
  }
  nullvalue = null;
  cart(Book, Course, FlashCard, Notes) {
    if (this.check_login() == true) {
      this.addtocart.AddToCart(Book, Course, FlashCard, Notes);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
    }
  }

  subject;
  firstname;
  lastname;
  description;
  major;
  interest;
  rating;
  treviews;
  experience;
  username;
  // ttid;
  profile_picture;

gettutorinfo(tutor){

  this.eachcourse.gettutorinfo(tutor).subscribe(data => {
    // console.log('data:',data)
    // this.getresult = data.Course;
    // console.log('getresult',this.getresult)
    this.description = data.description;
    // console.log(this.description)
    this.major = data.major;
    this.profile_picture = this.profileurl+data.profile_picture;
    this.username = data.user.username;
    this.firstname = data.user.first_name;
    this.lastname = data.user.last_name;
    this.interest = data.Interests;
    this.treviews = data.TutorReviews;
    this.rating = data.rating;
    this.experience = data.Experience;
    this.subject = data.subject;
    // this.ttid=data.user.id;
    // console.log(this.ttid);




  })
}





  // this.tutorinfo.g
  introvideo;
  tutorreview;
  student;
  cdate;
  detail;
  creview;
  tcourses;
  starview : any =[];
  usman: any =[];
  eachcourseshow() {

    this.eachcourse.Eachcourse(this.courseId).subscribe(data => {

      this.result = data.Course;
      this.starview=this.result.rating;
      this.usman= this.starview.toString();
      // this.starview = this.usman.toString()
      // console.log(this.provider)
      // console.log(this.starview.toString())
      this.introvideo = data.introvideo;
      this.student = data.Student;
      this.cdate = data.Course.postdate;
      this.detail = data.Detail;
      this.creview = data.CourseReviews;
      this.tutorreview = data.TutorReviews;
      this.tcourses = data.TutorCourses;
      // this.tutorId=data.Course.userid.id;
      this.tutorId=data.Course.userid.id;
      this.gettutorinfo(this.tutorId)
     
      // console.log(this.tutorId);

      // this.ttid=data.userid.id;
      // console.log(this.ttid);
      // alert(this.result)
      // console.log(this.result,'EACH COURSE')
    });
  }

  checkcate() {
    if (this.check_login() == true) {
      this.router.navigate(['/payment']);
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
    }
  }

  check_login() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentUser')) {
        return true;
      }
      else {
        return false;
      }
    }

  }

  checkcourse() {
    if (this.check_login() == true) {
      this.role = localStorage.getItem('role');
      if (this.role == "U") {
        swal({
          title: 'CramFrenzy',
          text: 'Only admin and teacher can upload courses',
          type: 'error',
          showConfirmButton: false,
          confirmButtonColor: "#cc0000",
          timer: 2000,
          confirmButtonText: "OK",
        });
      }
      else if (this.role == "T" || this.role == "A") {
        this.router.navigate(['/upload']);
      }
    }
    else if (this.check_login() == false) {
      this.sweetalertlogin();
    }
  }



// subject;
// description;
// school;
// graduating;
// major;
// residence;
// interest;
// rating;
// experience;
// getresult:any;
// gettutorinfo(){
//   alert(this.result.user_id['id'])
//   this.eachcourse.gettutorinfo(this.result.user_id['id']).subscribe(data => {
//     // this.result = data.Course;
//     alert('usman')
// this.getresult = data;
//     // this.school= data.school_attended;
//     // alert(this.school)
//     // this.graduating= data.graduation_year;
//     // this.major= data.major;
//     // this.residence= data.state_of_residence;
//     // this.interest= data.Interests;
//     // this.experience = data.Experience;
//     // this.description = data.description;
//     // this.rating = data.rating;
//     // this.subject= data.subject;
    
// //     this.subject= data.subject;
// // this.description = data.description;
// // console.log(this.description,"subject")
//   })
// }


onsubmit(id) {
  this.router.navigate(['/teachers/' + id]);
}

  getchapter;
  chpt;
  time;
  getchaptername(){
    this.eachcourse.getchaptername(this.courseId).subscribe(data => {
      this.getchapter = data.data;
      this.videos = data.vedios;
      // this.videos = data.videos;
      this.chpt = data.chapters;
      this.time = data['Total Hours'];
      this.totalvideos = data.totalvideos;
      this.totalvid = data['Total Lectures'];

      
      // Abdullah
      // this.lectures = data['Lectures'];
      // this.lectures = data.Lectures;
    });
  }
  SetVideoURL(video_url, SetVideoURL){
    // alert(SetVideoURL)
    if (SetVideoURL == true){

    
    const dialogRef = this.dialog.open(VideoShowDialogComponent, {
      width: '800px',
      data: {
        video_url: video_url,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }else if (SetVideoURL == false){
    swal({
      type: 'error',
      title: 'Please bought this course first',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  }

  // SetVideoURL1(video_url) {
  //  alert(this.videos.id.allow_to_view)
  //   if(this.videos.allow_to_view== true){
  //     const dialogRef = this.dialog.open(VideoShowDialogComponent, {
  //       width: '1366px',
  //       data: {
  //         video_url: video_url,
  //       }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //     });
      
  //   }else if(this.videos.allow_to_view==false){
  //     swal({
  //       type: 'error',
  //       title: 'Oops <br> Please bought this course first',
  //       showConfirmButton: false,
  //       width: '512px',
  //       timer: 2500
  //     })
  //   } 

  // }

  reviewsss(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }

    this.eachcourse.getreview(this.courseId).subscribe(data =>{
      this.view = data;
      this.pager = this.pagerService.getPager(this.view['totalItems'], page, 10);

    }
      ,error=>{
        if(error.status==400){
          this.view=0;
       
        }
      });
  }
  courses(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {courseid : id}});
      // localStorage.setItem('course', id);
    } else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }

  sweetalertlogin() {
    swal({
      text: "Please Login First",
      title: "CramFrenzy",
      type: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    this.router.navigate(['/login']);
  }
book = null;
  flashcard= null ;
  notes = null;
  reviews(rate, comment,  result, book, flashcard, notes,f: NgForm) {
    if (this.check_login()) {
      // this.id = result;
      if (this.reviewform.controls.comment.valid) {
      this.eachcourse.review(this.rate, this.model.comment, this.result.id, book,  flashcard, notes).subscribe(data => {
        swal({
          type: 'success',
          title: 'Thanks for your Review.',
          showConfirmButton: false,
          width: '512px',
          timer: 4500
        });
      }, error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'You already posted review for this course',
            showConfirmButton: false,
            width: '512px',
            timer: 4500
          });
        // } else if (error.status == 400) {
        //   swal({
        //     type: 'error',
        //     title: 'You have to buy before posting a review',
        //     showConfirmButton: false,
        //     width: '512px',
        //     timer: 4500
        //   });
        }
        //abdullah
        else if (error.status == 400) {
          swal({
            type: 'error',
            title: 'No Reviews Found Yet',
            showConfirmButton:false,
            width: '512px',
            timer: 4500

          });

         }
      });
    }
    else {
      swal({
        type: 'error',
        text: 'Leave a Review',
        width: '512px',
        showConfirmButton: false,
        timer: 1500
      });
    }}
    else {
      swal({
        type: 'error',
        title: 'CramFrenzy',
        text: 'Please Login First',
        showConfirmButton: false,
        width: '512px',
        timer: 4500
      });
      this.router.navigate(['/login']);
    }
    f.resetForm()
  }
  coursess(id) {
    if (this.check_login() == true) {
      this.router.navigate(['/payment'], {queryParams: {courseid : id}});
      // localStorage.setItem('course', id);
    } else if (this.check_login() == false) {
      this.sweetalertlogin();
      this.router.navigate(['/login']);
    }
  }
}
