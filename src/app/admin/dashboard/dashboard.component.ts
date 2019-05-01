import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import swal from "sweetalert2";
import { DashboardService} from './dashboard.service';
import {Config} from '../../Config';
import { PagerService } from '../../paginator.service';
import {HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appcourse ;
  courses = [];
  pager : any = {};
  notes = [];
  flashcards = [];
  getingnotes;
  getingcards;
  getingbook;
  books = [];
  id;
  acptcards;
acptcourses;
  rejcourses;
  acpnote;
  book;
  rejectn;
  rbook;
  rejectcards;
  status : boolean = true;
  public Imageurl = Config.Imageurlget;
  constructor( @Inject(PLATFORM_ID) private platformId: Object, private newService: DashboardService, private PagerService: PagerService) { }

  ngOnInit() {
    this.setPage(1);
    this.setpagenote(1);
    this.setpagecard(1);
    this.setpagebook(1);
    this.acpectnote(1);
    this.acptcourse(1);
    this.acptcard(1);
    this.accpectbook(1);
    this.rejnote(1);
    this.rejcourse(1);
    this.rejcard(1);
    this.rejectbook(1);
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


  // allcourses() {

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.getcourse(page).subscribe(response => {
      this.appcourse = response.json();
      this.appcourse = this.appcourse.courses;
      this.pager = this.PagerService.getPager(response.json()['totalItems'], page);
      console.log(this.appcourse);
    });
  }
  setpagenote(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.getnotes(page).subscribe(response => {
      this.getingnotes = response.json();
      this.getingnotes = this.getingnotes.notes;
      this.pager = this.PagerService.getPager(response.json()['totalItem'], page);
    });
  }
  setpagecard(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.getcards(page).subscribe(response => {
      this.getingcards = response.json();
      this.getingcards = this.getingcards.flashcards;
      console.log(this.getingcards);
      this.pager = this.PagerService.getPager(response.json()['totalItem'], page);
    });
  }
  setpagebook(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.getbook(page).subscribe(response => {
      this.getingbook = response.json();
      this.getingbook = this.getingbook.books;
      console.log(this.getingbook);
      this.pager = this.PagerService.getPager(response.json()['totalItem'], page);
    });
  }
  appronote(id) {
    let headers = new HttpHeaders();
    this.newService.approvenote(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Approved note',
        showConfirmButton: false,
        timer: 5500
      });
      this.setpagenote(1);
    });
  }
  approcourse(id) {
    let headers = new HttpHeaders();
    this.newService.approvecourse(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Approved Course',
        showConfirmButton: false,
        timer: 5500
      });
      this.setPage(1);
    });
  }
  approcard(id) {
    let headers = new HttpHeaders();
    this.newService.approvecard(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Approved Flash Card',
        showConfirmButton: false,
        timer: 5500
      });
      this.setpagecard(1);
    });
  }
  approbook(id) {
    let headers = new HttpHeaders();
    this.newService.approvebook(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Approved Book',
        showConfirmButton: false,
        timer: 5500
      });
      this.setpagebook(1);
    });
  }
  rejectednote(id) {
    let headers = new HttpHeaders();
    this.newService.rejectnote(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Rejected Note',
        showConfirmButton: false,
        timer: 5500
      });
      this.setpagenote(1);
    });
  }
  rejectecourse(id) {
    let headers = new HttpHeaders();
    this.newService.rejectcourse(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Rejected Course',
        showConfirmButton: false,
        timer: 5500
      });
      this.setPage(1);
    });
  }
  rejectecard(id) {
    let headers = new HttpHeaders();
    this.newService.rejectcard(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Rejected Flash Card',
        showConfirmButton: false,
        timer: 5500
      });
      this.setpagecard(1);
    });
  }
  rejectedbook(id) {
    let headers = new HttpHeaders();
    this.newService.rejectbook(id).subscribe(Res => {
      swal({
        type: 'success',
        title: 'Rejected Book',
        showConfirmButton: false,
        timer: 5500
      });
      this.setpagebook(1);
    });
  }
  acpectnote(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.accpectnotes(page).subscribe(response => {
      this.acpnote = response.json();
      this.acpnote = this.acpnote.notes;
      this.pager = this.PagerService.getPager(response.json()['totalItem'], page);
    });
  }
  acptcourse(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.accpectcourse(page).subscribe(response => {
      this.acptcourses = response.json();
      this.acptcourses = this.acptcourses.courses;
      this.pager = this.PagerService.getPager(response.json()['totalItems'], page);
      // console.log(this.appcourse);
    });
  }
  acptcard(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.accpectcards(page).subscribe(response => {
      this.acptcards = response.json();
      this.acptcards = this.acptcards.flashcards;
      this.pager = this.PagerService.getPager(response.json()['totalItems'], page);
      // console.log(this.appcourse);
    });
  }
  accpectbook(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.accpectbook(page).subscribe(response => {
      this.book = response.json();
      this.book = this.book.books;
      // console.log(this.getingbook);
      this.pager = this.PagerService.getPager(response.json()['totalItem'], page);
    });
  }
  rejnote(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.rejectednote(page).subscribe(response => {
      this.rejectn = response.json();
      this.rejectn = this.rejectn.notes;
      // console.log(this.getingbook);
      this.pager = this.PagerService.getPager(response.json()['totalItem'], page);
    });
  }
  rejcourse(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.rejectedcourse(page).subscribe(response => {
      this.rejcourses = response.json();
      this.rejcourses = this.rejcourses.courses;
      this.pager = this.PagerService.getPager(response.json()['totalItems'], page);
      // console.log(this.appcourse);
    });
  }
  rejcard(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.rejectedcard(page).subscribe(response => {
      this.rejectcards = response.json();
      this.rejectcards = this.rejectcards.flashcards;
      this.pager = this.PagerService.getPager(response.json()['totalItems'], page);
      // console.log(this.appcourse);
    });
  }
  rejectbook(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.newService.rejectedbook(page).subscribe(response => {
      this.rbook = response.json();
      this.rbook = this.rbook.books;
      // console.log(this.getingbook);
      this.pager = this.PagerService.getPager(response.json()['totalItem'], page);
    });
  }
}
