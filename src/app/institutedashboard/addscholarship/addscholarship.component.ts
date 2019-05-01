import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AddscholarshipService } from "./addscholarship.service";
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-addscholarship',
  templateUrl: './addscholarship.component.html',
  styleUrls: ['./addscholarship.component.scss']
})
export class AddscholarshipComponent implements OnInit {
  model: any ={};
  scholarship :FormGroup;
  status: boolean = false;
  constructor(private Service: AddscholarshipService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.scholarship = this.fb.group({
      'name' : [''],
      'grade' : [''],
      'deadline' : [''],
      'about' : [''],
      'purpose' : [''],
      'eligibility' : [''],
      'url' : [''],
      'sc_amount' :[''],
      'status' : [''],


    })
  }
addscholarship(form : NgForm){
    return this.Service.scholarship(this.model).subscribe( Res=>{

        swal({
          type: 'success',
          title: 'Scholarship Added Successfully! <br> Request is sent to admin you will be notified after approval.',
          width: '512px'
        })

    }
    );

}
}
