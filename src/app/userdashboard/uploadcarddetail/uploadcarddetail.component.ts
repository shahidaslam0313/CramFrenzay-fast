import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CarddetailService } from '../../service/carddetail.service';
import { Config } from "../../Config";
import { HttpClient, } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-uploadcarddetail',
  templateUrl: './uploadcarddetail.component.html',
  styleUrls: ['./uploadcarddetail.component.scss']
})
export class UploadcarddetailComponent implements OnInit {
  card;
  name;
  input;
  id;
  check($event) { }
  fcdetail: FormGroup;
  image;
  modal: any = [];
  url: any = 'JPG,GIF,PNG';
  public firstname;
  public lastname;
  profilePhoto;
  constructor(private flashcard: CarddetailService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object,

    private http: HttpClient,

  ) { }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  ngOnInit() {
    this.fcdetail = this.fb.group({
      'title': [''],
      'definition': [''],
      'image': [''],
      'flashcard': ['']
    });
    this.Showcards();
  }
  onSubmit() {

    this.firstname = localStorage.getItem('fname');
    this.lastname = localStorage.getItem('lname');
    this.profilePhoto = localStorage.getItem('pic');
    this.http.post(
      Config.Imageurlupload,
      this.input, { responseType: 'text' }).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {

          this.CourseFailure();
        }
        else {

          this.CourseSuccess();
        }
        this.image = data;
        this.ifImageUpload();

      }
      );
  }
  private ifImageUpload() {
    this.flashcard.uploading(this.fcdetail.value, )
      .subscribe(Res => { });
  }
  CourseSuccess() {
    swal({
      type: 'success',
      title: 'FlashCard Detail Added Successfully! <br> Request is sent to admin you will be notified after approval.',
      width: '512px'
    })
  }

  CourseFailure() {
    swal({
      type: 'error',
      title: 'Oops! <br>Failed to add FlashCard Detail. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  Showcards() {
    this.flashcard.mycards().subscribe(data => {
      this.name = data;
    });
  }
  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }
}
