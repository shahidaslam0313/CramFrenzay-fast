import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../Config';
import { ActivatedRoute } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup, NgForm} from '@angular/forms';
import { TutorregistrationService } from './tutorregistration.service';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-tutorregistration',
  templateUrl: './tutorregistration.component.html',
  styleUrls: ['./tutorregistration.component.scss']
})

export class TutorregistrationComponent implements OnInit {
  modal: any = {};
  sub_category_name: any[];
  public categories: any;
  result: any = [];
  input;
  firstname;
  role;
  lastname;
  public profile_picture: string;
  url: any = 'JPG,GIF,PNG';
  updataform: FormGroup
  check($event) { }
  onchange($event) {

  }

  constructor(private newService: TutorregistrationService, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder) { }


  ngOnInit() {
    this.updataform = this.fb.group({

      'school_attended': ['', Validators.compose([Validators.required])],
      'graduation_year': ['', Validators.required],
      'major': ['', Validators.compose([Validators.required])],
      'subject' : [''],
      'state_of_residence': ['', Validators.compose([Validators.required])],
      'Experience': ['', Validators.compose([Validators.required])],
      'interview': ['', Validators.compose([Validators.required])],
      'description': ['', Validators.compose([Validators.required])],

    });
    this.tutorsubjects();
    this.coursesub();
    this.firstname = localStorage.getItem('fname');
    this.lastname = localStorage.getItem('lname');
  }



  onSubmit(f : NgForm) {


    this.http.post(
      Config.uploadfile,
      this.input, { responseType: 'text' }).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
        }
        else {
          this.modal.profile_picture = data;
          this.ifImageUpload();

        }
      });
  }
  private ifImageUpload() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.newService.registration( this.modal.school_attended, this.modal.graduation_year, this.modal.major, this.modal.subject, this.modal.state_of_residence, this.modal.Experience, this.modal.interview, this.modal.description, this.modal.profile_picture)
      .subscribe(Res => {
          localStorage.setItem('role', this.role);
        this.CourseSuccess();

      },
        error => {
          this.CourseFailure();
        }
      );
  }

  tutorsubjects() {
    this.newService.ourprofessional().subscribe(data => {
      this.result = data;
    });
  }

  coursesub() {
    this.newService.coursesub()
      .subscribe(response => {
        this.sub_category_name = response;
      });
  }

  CourseSuccess() {
    swal({
      type: 'success',
      title: 'Register! <br> You are now instructor.',
      width: '512px'
    })
  }

  CourseFailure() {
    swal({
      type: 'error',
      title: 'Oops! <br>Failed to register. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }

}
