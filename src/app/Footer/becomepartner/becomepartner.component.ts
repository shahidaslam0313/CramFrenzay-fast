import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BecomepartnerService } from './becomepartner.service';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';

import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const NAME_REGEX = /^[a-zA-Z _.]+$/;
const PHONE_REGEX = /^[0-9]+$/;
// declare var localStorage: any;
@Component({
  selector: 'app-becomepartner',
  templateUrl: './becomepartner.component.html',
  styleUrls: ['./becomepartner.component.scss']
})
export class BecomepartnerComponent implements OnInit {
  modal: any = {};
  result;
  updataForm: FormGroup;
  private productsSource;
  currentProducts;
  constructor(private newService: BecomepartnerService, private router: Router, private route: ActivatedRoute,
    private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('username'));
      this.currentProducts = this.productsSource.asObservable();
    }
  }

  ngOnInit() {
  }

  username;
  password;
  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  public model: any = {};
  public Contacts: any;
  loaded = false;
  lat = 31.514538;
  lng = 74.34482;
  

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(64),
    Validators.minLength(2),
    Validators.pattern(NAME_REGEX),
  ]);

  EmailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex)
  ]);

  CompanyFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(3),
    Validators.pattern(NAME_REGEX)
  ]);
  // Validators.pattern('[a-zA-Z]+?')

  messageFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NAME_REGEX)
  ]);

  onSubmit(f : NgForm) {
    this.newService.registration(this.model.name, this.model.Email, this.model.Company)
      .subscribe(Res => {
        swal({
          type: 'success',
          title: 'Message send to Partner request has been posted successfully, you will be contacted shortly',
          showConfirmButton: false,
          timer: 3500
        });
      }, error => {
        if (error.status == 400)
          swal({
            type: 'warning',
            title: 'Fill all field',
            showConfirmButton: false,
            timer: 1500
          });
      });
      f.resetForm();
  }
}
