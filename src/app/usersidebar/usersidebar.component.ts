import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { UsersidebarService } from '../usersidebar/usersidebar.service';


@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.scss']
})
export class UsersidebarComponent implements OnInit {
  username;
  currentuser;
  profile;
  current;
  id;
  constructor(private fb: FormBuilder, public router: Router, @Inject(PLATFORM_ID) private platformId: Object, private userprofile: UsersidebarService, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('currentUser');
      this.username = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentuser = this.username.asObservable();
    }
  }
  ngOnInit() {
    this.userdatainfo(this.id);
  }
  userdatainfo(id) {
    this.userprofile.getuser(id).subscribe(data => {
      this.profile = data;
    });
  }
}
