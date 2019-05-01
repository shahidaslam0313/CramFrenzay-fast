import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import swal from "sweetalert2";
import {isPlatformBrowser} from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
role;
  constructor( @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
  }
  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      swal({
        title: "CramFrenzy Log out!<br>",
        type: "success",
        showConfirmButton: false,
        timer: 2000,
      })
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
  admin(){
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('role') == "A") {
        return true;

      }
      else if (this.role == "I" || this.role == "U" || this.role == "T") {
        return false;
      }
    }
  }
}
