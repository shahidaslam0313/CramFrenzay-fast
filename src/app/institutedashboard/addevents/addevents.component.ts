import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AddeventsService } from "./addevents.service";
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
  selector: 'app-addevents',
  templateUrl: './addevents.component.html',
  styleUrls: ['./addevents.component.scss']
})
export class AddeventsComponent implements OnInit {
  model: any={};
  status: boolean = false;
  public instituteid;
  constructor(private Service: AddeventsService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    this.instituteid=localStorage.getItem('institute_id');
  }

  ngOnInit() {

  }
  addevents(){
    return this.Service.events(this.model).subscribe( Res=>{

        swal({
          type: 'success',
          title: 'Event Added Successfully! <br> Request is sent to admin you will be notified after approval.',
          width: '512px'
        })

      }
    );

  }
}
