import { Component, OnInit, Inject } from '@angular/core';
import { BidHistoryService } from './bid-history.service';
import { Config } from '../Config';
import { ActivatedRoute, Routes } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import swal from "sweetalert2";

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.scss']
})
export class BidHistoryComponent implements OnInit {
  id;
  notebid;
  coursebid;
  notes: any = [];
  course: any = [];
  cardbid;
  flashcard: any = [];
  book;
  getbook: any = [];
  gettingprice;
  private sub: Subscription;
  text: any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hours",
    Minutes: "Minutes",
    Seconds: "Seconds",
    MilliSeconds: "MilliSeconds"
  };
  name;
  constructor(private biddinghistory: BidHistoryService, private route: ActivatedRoute) {
    window.scroll(0,0);
  }

  ngOnInit() {
    this.route.params.subscribe(params => { });
    this.route.queryParams.subscribe(params => {

      this.name = params.cat;
      this.id = params.id;
      if (this.name === "notes") {
        this.getnotebidhistory(this.id);

      }
      else if (this.name === "course") {
        this.getcoursebidhistory(this.id);
      }
      else if (this.name === "flashcard") {
        this.getcardbidhistory(this.id);
      }
      else if (this.name === "book") {
        this.getbookbidhistory(this.id);
      }
    }
    );
  }

  getnotebidhistory(id) {
    this.biddinghistory.notebidhistory(id).subscribe(data => {
      this.notebid = data;
      this.notes = data.bidhistory;
      console.log(this.notebid);
      console.log(this.notes);
    },
      error => {
        if (error.status === 400) {
          swal({
            type: 'error',
            title: 'This note is not for bidding!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status === 404) {
          swal(
            'Sorry',
            'No bid history found for this bid!',
            'error'
          )
        }
      });
  }
  getcoursebidhistory(id) {
    this.biddinghistory.coursebidhistory(id).subscribe(data => {
      this.coursebid = data;
      this.course = data.bidhistory;
    },
      error => {
        if (error.status === 400) {
          swal({
            type: 'error',
            title: 'This course is not for bidding!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status === 404) {
          swal(
            'Sorry',
            'No bid history found for this bid!',
            'error'
          )
        }
      });
  }
  getcardbidhistory(id) {
    this.biddinghistory.cardbidhistory(id).subscribe(data => {
      this.cardbid = data;
      this.flashcard = data.bidhistory;
      console.log(this.cardbid);
      console.log(this.flashcard);
    },
      error => {
        if (error.status === 400) {
          swal({
            type: 'error',
            title: 'This Flash card is not for bidding!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status === 404) {
          swal(
            'Sorry',
            'No bid history found for this bid!',
            'error'
          )
        }
      });
  }
  getbookbidhistory(id) {
    this.biddinghistory.bookbidhistory(id).subscribe(data => {
      this.book = data;
      this.getbook = data.bidhistory;
      console.log(this.book);
      console.log(this.getbook);
    },
      error => {
        if (error.status === 400) {
          swal({
            type: 'error',
            title: 'This Book is not for bidding!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status === 404) {
          swal(
            'Sorry',
            'No bid history found for this bid!',
            'error'
          )
        }
      });
  }
}
