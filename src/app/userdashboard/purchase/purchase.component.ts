import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SimpleGlobal } from "ng2-simple-global";
import { Config } from "../../Config";
import { PurchaseService } from "./purchase.service";
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { DataService } from '../../data.service';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  result;
  courses;
  notes;
  public Imageurl = Config.Imageurlget;
  constructor(private http2: Http, private route: ActivatedRoute, public router: Router, private sg: SimpleGlobal, private purchase: PurchaseService, private data: DataService, private http: Http, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.Showcourses();
  }
 
  bought;
  Showcourses() {
    this.purchase.purchasercourses().subscribe(Data => {
this.bought = Data;
console.log(this.bought);
      // for (let val in Data) {
      //   if (Data[val].course) {
      //     this.Courses.push(Data[val]);
      //   }
      //   else if (Data[val].notes) {
      //     this.Notes.push(Data[val]);
      //   }
      //   else if (Data[val].book) {
      //     this.Book.push(Data[val]);
      //   }
      //   else if (Data[val].flashcard) {
      //     this.FlashCard.push(Data[val]);
      //   }
      // }
    })
  }
}
