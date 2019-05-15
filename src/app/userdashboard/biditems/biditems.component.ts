import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from "ng2-simple-global";
import { Config } from "../../Config";
import { BiditemsService } from "./biditems.service";
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { DataService } from '../../data.service';

@Component({
  selector: 'app-biditems',
  templateUrl: './biditems.component.html',
  styleUrls: ['./biditems.component.scss']
})
export class BiditemsComponent implements OnInit {
  allbiding;
  public Imageurl = Config.Imageurlget;
  constructor(private http2: Http, private route: ActivatedRoute, public router: Router, private sg: SimpleGlobal, private biding: BiditemsService) {
    this.bid();
  }

  ngOnInit() {

  }

  Courses = [];
  Notes = [];
  FlashCard = [];
  Book = [];
  biditems;
  bid() {
    this.biding.bidingitems().subscribe(Data => {
      this.biditems = Data;
      console.log(this.biditems);
      // for (let val of Data) {
      //   if (val.bid.course != null) {
      //     this.Courses.push(val.bid.course);
      //   }
      //   else if (val.bid.notes != null) {
      //     this.Notes.push(val.bid.notes);
      //   }
      //   else if (val.bid.book != null) {
      //     this.Book.push(val.bid.book);
      //   }
      //   else if (val.bid.flashcard != null) {
      //     this.FlashCard.push(val.bid.flashcard);
      //   }
      // }
    })
  }
}
