import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { InstitutelibraryService } from "./institutelibrary.service";
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { Config } from "../../Config";
import { ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-institutelibrary',
  templateUrl: './institutelibrary.component.html',
  styleUrls: ['./institutelibrary.component.scss']
})
export class InstitutelibraryComponent implements OnInit {
  sp;
  events;
  scholarshipid;
  event;
  constructor(private serive:InstitutelibraryService , private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.getscholarship();
    this.getevents();
  }
  ///////////del scholarship
  getspid(id){

    this.scholarshipid = id;
    console.log(this.scholarshipid);
  }
  deletesp(scholarshipid){
    return this.serive.delscholarship(scholarshipid).subscribe(data=>{
      swal({
        type: 'success',
        title: 'Successfully deleted Scholarship',
        showConfirmButton: false,
        timer: 5500
      });
      this.getscholarship();
    })
  }
  /////////////del events
  delevents(id){
    this.event = id;
    console.log(this.event);
  }
  delevent(event){
    return this.serive.delevent(event).subscribe(data=>{
      swal({
        type: 'success',
        title: 'Successfully deleted Event',
        showConfirmButton: false,
        timer: 5500
      });
      this.getevents();
    })
  }
  ////////////////get scholarship
getscholarship(){
    return this.serive.scholarship().subscribe(data=>{
      this.sp = data;
    })
}
//////////// get events
getevents(){
    return this.serive.events().subscribe(data=>{
      this.events =data;
      console.log(this.events);
    })
}
}
