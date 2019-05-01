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
    Validators.pattern(NAME_REGEX)
  ]);

  EmailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex)
  ]);

  CompanyFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NAME_REGEX)
  ]);
  // Validators.pattern('[a-zA-Z]+?')

  messageFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NAME_REGEX)
  ]);

  onSubmit() {
    this.newService.registration(this.model.name, this.model.Email, this.model.Company)
      .subscribe(Res => {
        swal({
          type: 'success',
          title: 'Message send ',
          showConfirmButton: false,
          timer: 4500
        });
      }, error => {
        if (error.status == 404)
          swal({
            type: 'warning',
            title: 'This item already purchase',
            showConfirmButton: false,
            timer: 1500
          });
      });
  }
}
